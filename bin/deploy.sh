sudo cp -rp public/* /var/www/mango-is/
sudo chown -R www-data:www-data /var/www/mango-is
sudo cp -rp dynamic/* /home/srv-node-mango/
sudo chown -R srv-node-mango:srv-node-mango /home/srv-node-mango
sudo systemctl restart node-mango-is
