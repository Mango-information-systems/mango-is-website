browserify -t uglifyify dynamic/client.js | uglifyjs -c > source/legacy/js/site.js
#~browserify -t brfs -t uglifyify dynamic/g-realtime.js | uglifyjs -c > source/js/g-realtime.js
browserify -t brfs -t uglifyify dynamic/myTagOverflowChecker.js | uglifyjs -c > themes/mango-information-systems/source/legacy/js/myTagOverflowChecker.js
#~browserify -t brfs -t uglifyify dynamic/pullReceipt.js | uglifyjs -c > source/js/pullReceipt.js
browserify -t brfs -t uglifyify dynamic/myTagOverflow.js | uglifyjs -c > themes/mango-information-systems/source/legacy/js/myTagOverflow.js
cp node_modules/localforage/dist/localforage.nopromises.min.js themes/mango-information-systems/source/legacy/js/localforage.nopromises.min.js
