const loose = true

module.exports = {
  presets: [
  	['@babel/env', { loose, modules: false }],
  	'@babel/react',
  ],
  plugins: [
  	['@babel/proposal-class-properties', { loose }],
  	'@babel/proposal-object-rest-spread',
  ]
}
