browserify -t uglifyify dynamic/client.js | uglifyjs -c > source/js/site.js
browserify -t brfs -t uglifyify dynamic/g-realtime.js | uglifyjs -c > source/js/g-realtime.js
browserify -t brfs -t uglifyify dynamic/myTagOverflowChecker.js | uglifyjs -c > source/js/myTagOverflowChecker.js
browserify -t brfs -t uglifyify dynamic/pullReceipt.js | uglifyjs -c > source/js/pullReceipt.js
browserify -t brfs -t uglifyify dynamic/myTagOverflow.js | uglifyjs -c > source/js/myTagOverflow.js
cp node_modules/localforage/dist/localforage.nopromises.min.js source/js/localforage.nopromises.min.js
