#!/bin/bash
# This script updates the kiosk.service to use graphical.target,
# removes the old multi-user.target symlink if it exists,
# reloads the systemd daemon, enables, and starts the service.

set -e

SERVICE_FILE="/etc/systemd/system/kiosk.service"

echo "Writing updated service file to ${SERVICE_FILE}..."
sudo tee "${SERVICE_FILE}" > /dev/null <<'EOF'
[Unit]
Description=3bins Kiosk Mode
After=graphical.target

[Service]
User=pi
WorkingDirectory=/home/pi/3bins_project
ExecStart=/bin/bash /home/pi/kiosk.sh
Restart=always
Type=simple
Environment=DISPLAY=:0
Environment=XAUTHORITY=/home/pi/.Xauthority

[Install]
WantedBy=graphical.target
EOF

echo "Reloading systemd daemon..."
sudo systemctl daemon-reload

echo "Enabling kiosk.service for graphical.target..."
sudo systemctl enable kiosk.service

echo "Starting kiosk.service..."
sudo systemctl start kiosk.service

echo "Kiosk service updated, enabled, and started successfully."
