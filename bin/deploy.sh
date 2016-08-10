if [ -z ${1} ];
then
	echo "environment is unset, exiting";
	
else
	echo "deploying to '$1' environment";
	sudo cp -rp public/* /var/www/$1.mango-is.com/
	sudo chown -R www-data:www-data /var/www/$1.mango-is.com
	sudo cp -rp dynamic/* /home/srv-node-mango/app
	sudo chown -R srv-node-mango:srv-node-mango /home/srv-node-mango/app
	sudo systemctl restart node-mango-is
fi


