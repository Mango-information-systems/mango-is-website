mango-is-website
=============

Website of Mango Information Systems SPRL, powered by [hexo](https://hexo.io/).

Blog: unless specified otherwise, blog content is published under a Creative Commons Attribution license.

Branding: All rights reserved to the copyright holder: Mango Information Systems SPRL

## setup

1. Install hexo-cli as a global dependency: `npm install hexo-cli -g`
2. clone this repository `git clone https://github.com/Mango-information-systems/mango-is-website.git`
3. install node dependencies: `cd mango-is-website; npm install`
4. create `_config.yml` file based on `_config.yml-sample` and fill it with your own data
5. create `themes/mango-information-systems/_config.yml` file based on `themes/mango-information-systems/_config.yml-sample` and fill it with your own data

Then:
* Develop with `npm start`. (serves a development version, while watching changes in the site content or CSS framework...)
* Build with `npm run build`


## Development

* **layouts** are set in the [custom hexo theme](themes/mango-information-systems).
* **UI** framework in use is [skeleton framework](https://github.com/Mango-information-systems/skeleton-framework). It is included as a git submodule. Its content is compiled at build time (or on-the-fly during development).
* **content** can be found inside directory [source](source).
