#!/bin/bash
# This script updates the kiosk.service to use graphical.target,
# reloads the systemd daemon, enables, and starts the service.

set -e

echo "Updating package lists..."
sudo apt update

echo "Installing chromium browser..."
sudo apt install -y chromium-browser

echo "Chromium installation complete!"

SERVICE_FILE="/etc/systemd/system/kiosk.service"

echo "Writing updated service file to ${SERVICE_FILE}..."
sudo tee "${SERVICE_FILE}" > /dev/null <<'EOF'
[Unit]
Description=3bins Kiosk Mode
After=graphical.target

[Service]
User=pi
WorkingDirectory=/home/user/Desktop/3bins
ExecStart=/bin/bash /home/user/Desktop/3bins/kiosk.sh
Restart=always
Type=simple
Environment=DISPLAY=:0
Environment=XAUTHORITY=/home/user/.Xauthority

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
