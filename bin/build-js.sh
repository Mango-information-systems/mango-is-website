browserify -t uglifyify dynamic/client.js | uglifyjs -c > source/js/site.js
browserify -t brfs -t uglifyify dynamic/ga-realtime.js | uglifyjs -c > source/js/ga-realtime.js
