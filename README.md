# james-rainey.github.io

Personal website of James Rainey, built with Jekyll and deployed to GitHub Pages by `.github/workflows/deploy.yml` on every push to `main`.

## Run locally

```bash
docker compose up        # http://localhost:8080
# or, with Ruby 3.3 and ImageMagick installed:
bundle install && bundle exec jekyll serve
```

## Updating content

### Add project contribution details

Fill in `my_role`, `project_dates` and `project_status` in each project's front matter.
Describe your own contribution in `my_role`.
Use a date range such as `"2023–2026"` for `project_dates`.
Use a short status such as `"Ongoing research"` for `project_status`.
Leave unknown values empty.
Empty fields do not appear on the site.

Set `featured_projects` in `_pages/about.md` to an ordered list of project filename stems.
Add a `featured_result` sentence to each featured project's front matter.
The homepage shows the project's image, description, contribution (when supplied) and result.

### Content reference

| What | Where |
| --- | --- |
| Home page text, research areas | `_pages/about.md` |
| News item | add `_news/YYYY-MM-DD-short-name.md` with a `date:` and one or two sentences |
| Paper | add a BibTeX entry to `_bibliography/papers.bib`. Optional fields: `abbr` (venue badge), `website`, `pdf`, `code`, `project`, `selected={true}` (show on home page) |
| Project | add `_projects/name.md` with `title`, `tagline`, `img`, `category` (`PostDoc`, `PhD` or `fun`; anything else is hidden), `tags` and optional `links` |
| CV | `_data/resume.json` (read at build time, not published); put a PDF in `assets/pdf/` and set `cv_pdf` in `_pages/cv.md` |
| Social links | `_data/socials.yml` |

## Design

Styles live in `_sass/`: `_tokens.scss` holds every colour, font and spacing value (light and dark themes), `_base.scss` the element defaults and prose, `_layout.scss` the page chrome and `_components.scss` the cards, timeline and publication list. Layouts are in `_layouts/` and the only script is `assets/js/site.js`.
