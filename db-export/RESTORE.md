# Inaipi — Database Export & Restore

PostgreSQL dump of the Inaipi application database (`inaipi_db`).
Dumped from PostgreSQL 16 with `pg_dump --no-owner --no-privileges --clean --if-exists`,
so it restores cleanly under **any** database user and drops existing objects first.

## Files
- `inaipi_db.sql` — plain SQL dump (restore with `psql`).
- `inaipi_db.sql.gz` — gzip of the same file (smaller for transfer).

## Tables (9)
`Blog`, `Enquiry`, `Industry`, `Job`, `Resource`, `Seo`, `Setting`, `SiteImage`, `Testimonial`

## Restore (client instructions)

1. Create the database and a user (adjust names/password as you like):
   ```bash
   sudo -u postgres psql -c "CREATE USER inaipi_user WITH PASSWORD 'CHANGE_ME';"
   sudo -u postgres psql -c "CREATE DATABASE inaipi_db OWNER inaipi_user;"
   ```

2. Restore the data:
   ```bash
   # if using the .gz, unzip first:  gunzip -k inaipi_db.sql.gz
   psql "postgresql://inaipi_user:CHANGE_ME@127.0.0.1:5432/inaipi_db" -f inaipi_db.sql
   ```

3. Point the app at the database via `.env` in the project root:
   ```
   DATABASE_URL="postgresql://inaipi_user:CHANGE_ME@127.0.0.1:5432/inaipi_db"
   NEXT_PUBLIC_SITE_URL="https://your-domain.com"
   NODE_ENV="production"
   ADMIN_USER=admin
   ADMIN_PASSWORD=change-this
   ADMIN_SECRET=generate-a-long-random-string
   ```

4. Generate the Prisma client and build:
   ```bash
   npm install
   npx prisma generate
   npm run build
   npm run start   # or run under pm2
   ```

   > The schema also lives in `prisma/schema.prisma`. If you prefer to create the
   > tables from the schema instead of this dump, run `npx prisma db push` and then
   > import only the data you need.

## Notes
- The `Enquiry` table contains contact-form submissions (names, emails, IP addresses).
  Review/clear these before sharing if they are not needed.
- No SMTP password or API secrets are stored in this dump; app secrets live in `.env`,
  which is **not** included here and must be set on the target environment.
