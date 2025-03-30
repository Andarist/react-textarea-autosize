---
'react-textarea-autosize': patch
---

Added `edge-light` and `workerd` conditions to `package.json` manifest to better serve users using Vercel Edge and Cloudflare Workers.

This lets tools like Wrangler and the Cloudflare Vite Plugin pick up the right version of the built module, preventing issues like https://github.com/cloudflare/workers-sdk/issues/8723.
