mango-is-website
=============

Website of Mango Information Systems SPRL, powered by [hexo](https://hexo.io/).

Blog: unless specified otherwise, blog content is published under a Creative Commons Attribution license.

Branding: All rights reserved to the copyright holder: Mango Information Systems SPRL

## Installation

1. install hexo-cli as a global dependency: `npm install hexo-cli -g`
2. clone this repository `git clone --recursive https://github.com/Mango-information-systems/mango-is-website.git`
3. switch to the version you would like to use `cd mango-is-website; git checkout branch-or-tag-here`
4. install node dependencies: `npm install`
5. create `_config.yml` (in project's root directory), `config/test._config.yml` and `config/prod._config.yml` files based on `config/_config.yml-sample`
6. create `config/dev.theme._config.yml`, `config/test.theme._config.yml` and `config/prod.theme._config.yml` files, based on `theme._config.yml-sample`
7. create `config/test.robots.txt` and `config/prod.robots.txt` files
8. create `dynamic/params.json`, based on `dynamic/params-sample.json`

## Development

Run `npm start`. This script serves a development version, while watching changes in the site content or CSS framework...

* **layouts** are defined in the [custom hexo theme](themes/mango-information-systems).
* **UI** framework in use is [skeleton framework](https://github.com/Mango-information-systems/skeleton-framework). It is included as a git submodule. Its content is compiled at build time (or on-the-fly during development).
* **content** can be found inside directory [source](source).
* **dynamic parts** can be found inside directory [dynamic](dynamic).


## Build and deployment 

How it works:

* build step compiles the site in directory `public`
* deploy step copies the content of directory `public` inside `/var/www/[environment].mango-is.com`
* deploy step copies the server-side dynamic application `/home/srv-node-mango/app`
* server-side application (`/home/srv-node-mango/app/server.js`) to be launched separately (e.g. as a systemd daemon) - currently common for test and prod if environments are hosted in the same server.

### test environment

1. build with `npm run build:test`
2. deploy with `npm run deploy:test`

### prod environment

1. build with `npm run build:prod`.
2. deploy with `npm run deploy:prod`.
