!# /bin/bash
exec >> tmp/kiosk.log 2>&1
echo "Starting the kiosk script at $(date)"

cd /home/user/Desktop/3bins

export BROWSER=none

/usr/bin/npm start &

sleep 15

export DISPLAY=:0

/usr/bin/choromium-browser --noerrdialogs --disable-infobars --kiosk http://localhost:3000

while true; do
  sleep 3600
done
