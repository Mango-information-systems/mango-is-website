if [ -z ${1} ];
then
	echo "environment is unset, exiting";
else
	echo "deploying to '$1' environment";
	sudo cp -rp public/* /var/www/$1.mango-is.com/
	sudo cp -rp config/$1.robots.txt /var/www/$1.mango-is.com/robots.txt
	sudo chown -R www-data:www-data /var/www/$1.mango-is.com
	sudo cp -rp dynamic/* /home/srv-node-mango/app
	sudo chown -R srv-node-mango:srv-node-mango /home/srv-node-mango/app
	sudo touch /var/ngx_pagespeed_cache/cache.flush
	sudo systemctl restart node-mango-is
fi


