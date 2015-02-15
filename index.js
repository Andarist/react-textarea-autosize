'use strict';

var React = require('react');
var objectAssign = require('object-assign');

var TextareaAutosize = React.createClass({
    displayName: 'TextareaAutosize',

    propTypes: {
        minHeight: React.PropTypes.number,
        maxHeight: React.PropTypes.number
    },

    /**
     * This component can work with the ValueLink shortcut provided by React.
     * When ValueLink is passed, it tries to take over the onChange event in the underlying element
     * However, we need onChange to calculate the height of the box ourselves
     * So we store ValueLink locally, remove it from the underlying <textarea>, but proxy all onChange calls to it
     */
    valueLink: undefined,

    /**
     * A cached copy of properties that will be passed to the underlying <textarea>
     * Essentially passes all own properties, but sanitizes them to remove ValueLink and add the necessary style settings
     */
    textareaProps: {},

    getInitialState: function () {
        return {
            height:   'auto',
            overflow: 'hidden'
        }
    },

    render: function () {
        this.textareaProps.style = objectAssign({}, this.textareaProps.style, {
            height:   this.state.height,
            overflow: this.state.overflow
        });

        return React.DOM.textarea(this.textareaProps);
    },

    componentWillMount: function () {
        this.textareaProps = this.sanitizeProps(this.props);
    },


    /**
     * Do the initial calcluation of the height
     * And set an event listener to update the textarea height when the window is resized
     */
    componentDidMount: function () {
        //do a short timeout so let the browser sort out its paddings etc
        //otherwise sometimes the browser doesn't not text should be wrapped and missed some cases
        setTimeout(this.recalculateSize);
        window.addEventListener('resize', this.recalculateSize);
    },

    /**
     * Update textrarea props in case this component is updated from the outside
     */
    componentWillReceiveProps: function (nextProps) {
        this.textareaProps = this.sanitizeProps(nextProps);
    },

    componentWillUnmount: function () {
        window.removeEventListener('resize', this.recalculateSize);
    },


    /**
     * Removes ValueLink references
     * Adds the necessary CSS to set the height of the <textarea>
     */
    sanitizeProps: function (baselineProps) {
        var props = objectAssign({}, baselineProps, {
            onChange: this.onChange
        });

        delete props.minHeight;
        delete props.maxHeight;

        //Reset the local cache of valueLink because it may have been present before, but not now (.e.g after newprops are set)
        this.valueLink = undefined;
        if (typeof props.valueLink == 'object' && props.valueLink.hasOwnProperty('requestChange')) {
            props.defaultValue = props.valueLink.value;
            this.valueLink = props.valueLink;

            delete props.valueLink;
        }

        return props;
    },


    onChange: function (e) {
        if (typeof this.props.onChange == 'function') {
            this.props.onChange(e);
        }

        if (this.valueLink) {
            this.valueLink.requestChange(e.target.value);
        }

        this.recalculateSize();
    },

    recalculateSize: function () {
        var verticalPaddings = 0, node = this.getDOMNode();

        if (window.getComputedStyle) {
            var styles = window.getComputedStyle(node);

            // If the textarea is set to border-box, it's not necessary to
            // subtract the padding.
            if (styles.getPropertyValue('box-sizing') !== "border-box" &&
                styles.getPropertyValue('-moz-box-sizing') !== "border-box" &&
                styles.getPropertyValue('-webkit-box-sizing') !== "border-box") {
                verticalPaddings = (
                parseInt(styles.getPropertyValue('padding-bottom') || 0, 10) +
                parseInt(styles.getPropertyValue('padding-top') || 0, 10)
                );
            }
        }

        //first reset height to AUTO to make the browser re-calculate the new scroll height
        node.style.height = 'auto';

        //now find out what the height should be
        var newHeight = (node.scrollHeight - verticalPaddings),
            newOverflow = 'hidden';

        if (typeof this.props.minHeight == 'number' && this.props.minHeight > newHeight) {
            newHeight = this.props.minHeight;
        }

        if (typeof this.props.maxHeight == 'number' && this.props.maxHeight < newHeight) {
            newHeight = this.props.maxHeight;
            newOverflow = 'auto';
        }

        var newStyle = {
            height:   newHeight,
            overflow: newOverflow
        };

        node.style.height = newStyle.height + 'px';
        node.style.overflow = newStyle.overflow;
        //save the new height as the current state - if it's the same, the component will not refresh anyway
        //but we might need it later if the component is forced to refresh
        this.setState(newStyle);
    }
});

module.exports = TextareaAutosize;
