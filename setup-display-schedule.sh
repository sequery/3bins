#!/bin/bash

# Setup display schedule: OFF at 7PM, ON at 6AM — reboot-proof

set -e

echo "==============================="
echo "Setting up display schedule"
echo "==============================="

# Ensure dependencies are installed
echo "Checking/installing x11-xserver-utils..."
if ! dpkg -s x11-xserver-utils &> /dev/null; then
    sudo apt update
    sudo apt install -y x11-xserver-utils
fi

# Paths for scripts and logs
DISPLAY_OFF_SCRIPT="/usr/local/bin/display-off.sh"
DISPLAY_ON_SCRIPT="/usr/local/bin/display-on.sh"
LOG_DIR="/var/log/display-control"
LOG_FILE="$LOG_DIR/display.log"

# Create log directory
echo "Creating log directory..."
sudo mkdir -p "$LOG_DIR"
sudo touch "$LOG_FILE"
sudo chmod 666 "$LOG_FILE"

# Write display OFF script
echo "Writing display-off.sh..."
sudo tee "$DISPLAY_OFF_SCRIPT" > /dev/null <<'EOF'
#!/bin/bash
export DISPLAY=:0
export XAUTHORITY=/home/user/.Xauthority
echo "$(date): Turning OFF display" >> /var/log/display-control/display.log
xset dpms force off || echo "$(date): Failed to turn off display" >> /var/log/display-control/display.log
EOF

# Write display ON script
echo "Writing display-on.sh..."
sudo tee "$DISPLAY_ON_SCRIPT" > /dev/null <<'EOF'
#!/bin/bash
export DISPLAY=:0
export XAUTHORITY=/home/user/.Xauthority
echo "$(date): Turning ON display" >> /var/log/display-control/display.log
xset dpms force on || echo "$(date): Failed to turn on display" >> /var/log/display-control/display.log
xset s reset
EOF

# Make both scripts executable
echo "Making scripts executable..."
sudo chmod +x "$DISPLAY_OFF_SCRIPT" "$DISPLAY_ON_SCRIPT"

# Add cron jobs (clean old ones first)
echo "Setting up cron jobs..."
(crontab -l 2>/dev/null | grep -v 'display-off.sh' | grep -v 'display-on.sh' ; \
echo "0 19 * * * $DISPLAY_OFF_SCRIPT"; \
echo "0 6 * * * $DISPLAY_ON_SCRIPT"; \
echo "@reboot sleep 30 && $DISPLAY_ON_SCRIPT") | crontab -

echo "Display schedule setup complete!"
echo "Display will turn OFF at 7:00 PM"
echo "Display will turn ON at 6:00 AM"
echo "Reboot-proof with @reboot job"
echo "Logs available at: $LOG_FILE"
