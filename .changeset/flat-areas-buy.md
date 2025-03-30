---
'react-textarea-autosize': patch
---

Add a workerd target for cloudflare workers

This adds a patch that adds a workerd target to the build process. This lets wrangler and the cloudflare vite plugin pick up the right version of the built module, preventing issues like https://github.com/cloudflare/workers-sdk/issues/8723. It also adds an edge-light target for vercel edge functions.
