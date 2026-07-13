#!/bin/bash
set -e
cd ~/Web-HomeMakers
npm run build
sudo rm -rf /var/www/zingro/*
sudo cp -r dist/* /var/www/zingro/
sudo chown -R www-data:www-data /var/www/zingro
sudo systemctl reload nginx
echo "Deployed $(date)"
