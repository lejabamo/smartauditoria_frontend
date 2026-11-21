import os
import paramiko, io, sys

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect('51.79.35.88', username='root', password=os.environ["VPS_SSH_PASSWORD"], timeout=10)
cmd = "docker exec smartauditoria_db mariadb -u sgsri_user -p'${SGSRI_ADMIN_PASSWORD}' -D sgsri_db -e \"UPDATE roles_auth SET nombre_rol='ADMIN' WHERE nombre_rol='admin';\""
stdin, stdout, stderr = client.exec_command(cmd, timeout=10)
print(stdout.read().decode())
print(stderr.read().decode())
