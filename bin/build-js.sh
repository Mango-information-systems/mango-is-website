browserify -t uglifyify dynamic/client.js | uglifyjs -c > source/js/site.js
browserify -t brfs -t uglifyify dynamic/g-realtime.js | uglifyjs -c > source/js/g-realtime.js
cp node_modules/localforage/dist/localforage.nopromises.min.js source/js/localforage.nopromises.min.js
