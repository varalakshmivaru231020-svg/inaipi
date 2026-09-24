# Website images

Every image the Inaipi website uses, grouped by where it appears, in folders
directly inside `public/`.

```
public/
  brand/          logo and browser tab icons
  hero/           home page hero artwork
  about/          About page photography
  team/           leadership portraits (About page)
  architecture/   the architecture diagram
  logos/          customer logo strip artwork
  uploads/        anything added through the admin — content, not design
```

## Replacing an image

Keep the file name and drop the new file in the same folder — nothing in the
code needs to change. If you rename a file, its references have to be updated
too, so prefer keeping the name.

Several of these can be changed from the admin instead, with no deploy at all:

| What | Where in the admin |
| --- | --- |
| Browser tab icon | Site Settings → Branding |
| Architecture diagram | Site Settings → Section Images |
| Customer logo strip | Customer Logo Strip |
| Blog, resource, industry and job images | the entry's own form |

## Older paths still work

These images have lived in two other places: loose in `public/` (`/logo.png`,
`/hero.png`, `/team/...`, `/demo-logos/...`) and under
`/client-assets/images/...`. Both are mapped to the current locations in
`next.config.mjs`, so saved settings, older content and bookmarks keep working.
Those mappings can be dropped once nothing refers to the older paths.

## Not in use

`public/` also holds images the site no longer references — earlier
architecture drafts, `stage_01`–`stage_04`, `hero_dash`, `hero_mockup`, the
`images/` folder and the Next.js starter SVGs. They were left in place rather
than deleted; they can go whenever you say so.
