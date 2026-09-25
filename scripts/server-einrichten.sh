#!/bin/bash
# Grundeinrichtung eines Kundenservers (Ubuntu 24.04, Hetzner oder IONOS),
# läuft dort als root (leitfaden/03, „Server einrichten"). Idempotent,
# mehrfach ausführbar. Coolify ist vorher per Installer eingerichtet.
# Aufruf vom Mac:
#   ssh -o BatchMode=yes root@<ip> 'bash -s' < scripts/server-einrichten.sh
# Nach dem Muster von ozcalisthenics/scripts/server-einrichten.sh.
set -euo pipefail

# 4 GB Swap als Netz: 4 GB RAM lassen neben Coolify, App, Postgres und Umami
# wenig Luft. swappiness 10 – erst tauschen, wenn es wirklich eng wird.
if ! swapon --show --noheadings | grep -q '^/swapfile'; then
  fallocate -l 4G /swapfile
  chmod 600 /swapfile
  mkswap /swapfile > /dev/null
  swapon /swapfile
fi
grep -q '^/swapfile' /etc/fstab || echo '/swapfile none swap sw 0 0' >> /etc/fstab
printf 'vm.swappiness=10\n' > /etc/sysctl.d/99-web.conf
sysctl -q -p /etc/sysctl.d/99-web.conf

# SSH nur mit Key. Vorher prüfen, dass der Key-Login geht – sonst sperrt
# sich aus, wer das hier ausführt. Rettungsweg: Konsole im Panel des
# Anbieters (Hetzner: Cloud Console → Server → Konsole; IONOS: Cloud Panel).
# Als 00-*.conf, damit die Datei vor 50-cloud-init.conf geladen wird: sshd
# nimmt je Schlüsselwort den ersten Wert, und IONOS-Images setzen dort
# PasswordAuthentication yes – eine 99-*.conf wäre wirkungslos (USTA,
# 24.09.2026). Eine ältere 99-web.conf wird entfernt.
rm -f /etc/ssh/sshd_config.d/99-web.conf
printf 'PasswordAuthentication no\nKbdInteractiveAuthentication no\n' \
  > /etc/ssh/sshd_config.d/00-web.conf
sshd -t
systemctl reload ssh
if sshd -T | grep -qi '^passwordauthentication yes'; then
  echo "WARNUNG: PasswordAuthentication ist weiter an – /etc/ssh/sshd_config.d/ prüfen" >&2
fi

# fail2ban für sshd. Ubuntu 24.04 hat kein /var/log/auth.log (kein
# rsyslog), deshalb backend = systemd, sonst startet die Jail nicht.
export DEBIAN_FRONTEND=noninteractive
if ! command -v fail2ban-server > /dev/null; then
  apt-get update -qq > /dev/null 2>&1 || true
  apt-get install -y -qq fail2ban > /dev/null 2>&1
fi
printf '[sshd]\nenabled = true\nbackend = systemd\n' > /etc/fail2ban/jail.d/web.local
systemctl enable fail2ban > /dev/null 2>&1
systemctl restart fail2ban
for _ in 1 2 3 4 5; do fail2ban-client ping > /dev/null 2>&1 && break; sleep 1; done

echo "swap: $(swapon --show --noheadings | awk '{print $3}'), swappiness $(sysctl -n vm.swappiness)"
echo "sshd: $(sshd -T | grep -i '^passwordauthentication')"
echo "fail2ban: $(systemctl is-active fail2ban), jails:$(fail2ban-client status | grep 'Jail list' | cut -d: -f2)"
