# [columns.app](https://columns.app/) exporter

That's a simple [deno](https://deno.land/) script that exports all of your projects, lists and cards from columns.app as a single json file.

### How to bundle
Run `deno bundle --unstable index.ts > dist.js`

Flag `--unstable` used to [enable unstable API’s](https://deno.land/manual/runtime/stability), since deno isn't 1.0.0 yet

### How to use
Run `deno run --allow-net --allow-write=./projects.json dist.js -e <YOUR_EMAIL> -p <YOUR_PASSWORD>`
    
Flag `--allow-net` used to allow script to access network, which is necessary to access columns.app api

Flag `--allow-write=./projects.json` used to allow script to write `projects.json` file to your file system

You can also run `index.ts` directly as `deno run --unstable --allow-net --allow-write=./projects.json index.ts -e <YOUR_EMAIL> -p <YOUR_PASSWORD>`, that's useful for development purposes.
