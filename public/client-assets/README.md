# Client assets

Every image the Inaipi website uses, in one place, so the set can be handed
over or replaced without going through the code.

```
client-assets/images/
  brand/          logo and browser tab icons
  hero/           home page hero artwork
  about/          About page photography
  team/           leadership portraits (About page)
  architecture/   the architecture diagram
  logos/          customer logo strip artwork
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

Anything uploaded through the admin is written to `public/uploads/`, which is
content rather than design, and is deliberately kept separate from this folder.

## Old paths still work

These images used to sit at the top level of `public/`. Every previous URL —
`/logo.png`, `/hero.png`, `/team/...`, `/demo-logos/...` and the rest — is
mapped to its new home in `next.config.mjs`, so older links, saved settings and
bookmarks keep working. The mappings can be dropped once nothing refers to the
old paths.
