mango-is-website
=============

Website of Mango Information Systems SPRL.

Blog: unless specified otherwise, blog content is published under a Creative Commons Attribution license.

Branding: All rights reserved to the copyright holder: Mango Information Systems SPRL

## Contents

This repository hosts the code of all the contents in mango-is.com:

* static website
* blog
* web applications (`/tools` pages)

## Technologies

* [node.js](https://nodejs.org/en/)
* [d3.js](https://d3js.org/)
* [hexo](https://hexo.io/)

c.f. [package.json](package.json) and submodule for a more complete list.

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

### Tools

If you are interested in one of the [tools](https://mango-is.com/tools/) and do not want to carry the website, blog and other tools, ask us in an issue, we will try to help isolating the corresponding code.

### myTagOverflow dev setup

In order to run myTagOverflow in dev environment, the site must be served from port 80 (otherwise stackExchange API auth fails). The following command forwards port 80 traffic to port 4000:

    sudo iptables -t nat -I OUTPUT -p tcp -d 127.0.0.1 --dport 80 -j REDIRECT --to-ports 4000
    
Then myTagOverflow can be reached at the following URL: http://localhost/tools/myTagOverflow/


## Build and deployment 

How it works:

* build step compiles the site in directory `public`
* deploy step copies the content of directory `public` inside `/var/www/[environment].mango-is.com`
* deploy step copies the server-side dynamic application `/home/srv-node-mango/app`
* server-side application (`/home/srv-node-mango/app/server.js`) to be launched separately (e.g. as a systemd daemon) - currently common for test and prod if environments are hosted in the same server.

### Deploy archived blog to alef.website

```
git checkout alef-hosted-version-wip
rm -r public/
npm run build:prod
cp -r public/blog/archive ../alef.website/src/pages/blog
cp -r public/tools/csv-to-json ../alef.website/src/pages/tools
cp -r public/tools/myTagOverflow ../alef.website/src/pages/tools
cp -r public/legacy ../alef.website/public
```


### test environment

1. build with `npm run build:test`
2. deploy with `npm run deploy:test`

### prod environment

1. build with `npm run build:prod`.
2. deploy with `npm run deploy:prod`.
