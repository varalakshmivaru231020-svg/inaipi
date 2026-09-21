# Inaipi — Deployment Guide

Production deployment of the Inaipi website/admin (Next.js 14 + Prisma + PostgreSQL).

## Stack
- **Next.js 14** (App Router) — Node.js server (`next start`)
- **Prisma ORM** → **PostgreSQL 16**
- Process manager: **pm2**
- Reverse proxy + TLS: **nginx** (or CloudPanel / Caddy / any proxy)

---

## 1. Prerequisites (on the server)

```bash
# Node.js 20 LTS (18+ works)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# PostgreSQL 16
sudo apt-get install -y postgresql postgresql-contrib

# pm2 (global)
sudo npm install -g pm2
```

Verify: `node -v` (≥ 18), `psql --version` (≥ 14), `pm2 -v`.

---

## 2. Get the code

```bash
git clone https://github.com/BluewitcherProjects/inaipi_production.git
cd inaipi_production
```
(or unzip the delivered project folder and `cd` into it.)

---

## 3. Set up the database

Create the database + user, then restore the delivered dump (see `db-export/RESTORE.md`):

```bash
sudo -u postgres psql -c "CREATE USER inaipi_user WITH PASSWORD 'STRONG_PASSWORD';"
sudo -u postgres psql -c "CREATE DATABASE inaipi_db OWNER inaipi_user;"

# Restore data (use inaipi_db_clean.sql for the client-ready version)
psql "postgresql://inaipi_user:STRONG_PASSWORD@127.0.0.1:5432/inaipi_db" \
  -f db-export/inaipi_db_clean.sql
```

> Alternative — create tables from the schema instead of the dump:
> `npx prisma db push` (after step 4 & 5). Use this if starting with an empty database.

---

## 4. Configure environment variables

Create a **`.env`** file in the project root:

```env
# Database
DATABASE_URL="postgresql://inaipi_user:STRONG_PASSWORD@127.0.0.1:5432/inaipi_db"

# Site
NEXT_PUBLIC_SITE_URL="https://your-domain.com"
NODE_ENV="production"

# Admin panel login (/admin)
ADMIN_USER="admin"
ADMIN_PASSWORD="choose-a-strong-password"
ADMIN_SECRET="a-long-random-string"   # e.g. `openssl rand -hex 32`
```

`ADMIN_SECRET` signs the admin session cookie — set it to a long random value and keep it secret.

---

## 5. Install & build

```bash
npm install          # also runs `prisma generate`
npm run build        # `prisma generate && next build`
```

---

## 6. Run with pm2

```bash
# Start on port 3000 (default). To use another port: PORT=3001 pm2 start ...
pm2 start "npm run start" --name inaipi
pm2 save                     # persist across reboots
pm2 startup                  # follow the printed command to enable boot startup
```

Check: `pm2 status`, `pm2 logs inaipi`. The app now listens on `http://127.0.0.1:3000`.

---

## 7. Reverse proxy + HTTPS (nginx)

`/etc/nginx/sites-available/inaipi`:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass         http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header   Upgrade $http_upgrade;
        proxy_set_header   Connection 'upgrade';
        proxy_set_header   Host $host;
        proxy_set_header   X-Real-IP $remote_addr;
        proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```
```bash
sudo ln -s /etc/nginx/sites-available/inaipi /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx

# Free TLS certificate
sudo apt-get install -y certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

> The enquiry form's rate-limiter reads the client IP from `X-Forwarded-For`,
> so the `X-Forwarded-For` header above is required for it to work correctly.

---

## 8. Admin panel

- URL: `https://your-domain.com/admin`
- Log in with `ADMIN_USER` / `ADMIN_PASSWORD` from `.env`.
- **Email (SMTP):** configure Microsoft Outlook / Office 365 (or any SMTP) to send
  contact-form notifications. Use an App Password if the mailbox has MFA.
- **Analytics:** paste a Google Analytics 4 Measurement ID (`G-XXXXXXXXXX`) to enable tracking.
- **Enquiries:** contact-form submissions are stored here (also emailed when SMTP is on).

---

## 9. Redeploy after code changes

```bash
git pull                 # or copy new files in
npm install              # if dependencies changed
npx prisma db push       # if the Prisma schema changed (adds new tables/columns)
npm run build
pm2 restart inaipi --update-env
```

---

## 10. Troubleshooting

| Symptom | Fix |
|---|---|
| `Environment variable not found: DATABASE_URL` | `.env` missing or not in project root; ensure it's beside `package.json`. |
| Build fails on types | Run `npm install` then `npx prisma generate` before `npm run build`. |
| 502 from nginx | App not running — `pm2 status`, `pm2 logs inaipi`; confirm it's on port 3000. |
| Admin login fails | Check `ADMIN_USER` / `ADMIN_PASSWORD` in `.env`, then `pm2 restart inaipi --update-env`. |
| Enquiry emails not sending | Configure SMTP in **Admin → Email**; use **Verify** / **Send test**. Submissions are still saved under **Enquiries** even when email is off. |

---

**Summary:** install prerequisites → clone → restore DB → set `.env` → `npm install && npm run build` → `pm2 start` → put nginx + HTTPS in front → log in at `/admin`.
