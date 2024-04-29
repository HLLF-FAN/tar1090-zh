#!/bin/bash

read -p "请输入你的 UUID：" uuid
echo $uuid > /root/get_message/UUID
read -p "请输入你的机场ICAO码（最好大写）：" icao
sed -i -e "s#你的UUID是#<a>你的UUID是：$uuid</a>#" /usr/local/share/tar1090/html/index.html
sed -i -e "s#这里填你的站点uuid#$uuid#" /usr/local/share/tar1090/html/getsensordata.js
sed -i -e "s#这里填你要查询的机场ICAO码#$icao#" /usr/local/share/tar1090/html/getsensordata.js
echo
echo "-------------配置更新完成，你的UUID是 $uuid ，重启后生效-------------------"