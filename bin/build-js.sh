browserify -t uglifyify dynamic/client.js | uglifyjs -c > source/js/site.js
browserify -t brfs -t uglifyify dynamic/g-realtime.js | uglifyjs -c > source/js/g-realtime.js
browserify -t brfs -t uglifyify dynamic/stackexchange-stats.js | uglifyjs -c > source/js/stackexchange-stats.js
