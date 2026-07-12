#!/usr/bin/env bash
# setup-samba.sh — one-shot: share ~/tmax-exchange with the Windows laptop.
#
# Run:  sudo bash scripts/setup-samba.sh
# Then it will ask you to pick an SMB password for user 'joshua'
# (this is what you'll type on the laptop when opening the share).
#
# On the Lenovo afterwards: Explorer -> \\192.168.1.245\tmax
set -euo pipefail

[ "$(id -u)" -eq 0 ] || { echo "run with sudo"; exit 1; }

command -v smbd >/dev/null || { apt-get update -qq; apt-get install -y samba; }

# add the share once (idempotent)
if ! grep -q '^\[tmax\]' /etc/samba/smb.conf; then
  cat >> /etc/samba/smb.conf <<'EOF'

[tmax]
   comment = ThunderMax tune exchange (pve-tower)
   path = /home/joshua/tmax-exchange
   browseable = yes
   read only = no
   valid users = joshua
   create mask = 0664
   directory mask = 0775
EOF
  echo "share [tmax] added to smb.conf"
else
  echo "share [tmax] already present"
fi

systemctl enable --now smbd >/dev/null
systemctl restart smbd

echo
echo "Set the SMB password for user 'joshua' (used from the laptop):"
smbpasswd -a joshua

echo
echo "Done. On the laptop open:  \\\\192.168.1.245\\tmax"
echo "  tunes-from-nas\\  = all 70 tunes, ready for TMax Tuner"
echo "  from-laptop\\     = drop your edited/exported .tbw files here"
