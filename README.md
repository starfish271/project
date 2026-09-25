# Gwyn Fox — Portfolio

A blog-style portfolio website built with Astro, GSAP animations, and Sveltia CMS for editing posts without writing code.

## Running locally

```bash
npm install
npm run dev
```

The site runs at `http://localhost:4321`. The admin portal is at `http://localhost:4321/admin`.

To create a production build:

```bash
npm run build
npm run preview
```

## Logging into the admin portal

1. Go to `/admin` on your site (e.g. `http://localhost:4321/admin` in dev).
2. Click "Sign in with GitHub".
3. Enter your GitHub username and a personal access token (see below).

## Setting up the GitHub personal access token

The CMS commits posts directly to your GitHub repo. To do this, it needs a personal access token:

1. Go to GitHub → Settings → Developer settings → Personal access tokens → **Tokens (classic)**
2. Click "Generate new token (classic)"
3. Give it a note like "Sveltia CMS"
4. Under "Select scopes", check **`repo`** (full repository access)
5. Click "Generate token"
6. Copy the token (you won't see it again)
7. Go to your site's `/admin` page and sign in with your GitHub username and the token

The token is stored in your browser's local storage. You can revoke it anytime from GitHub settings.

## Adding and editing posts

1. Sign in to `/admin`
2. Click "Posts" in the sidebar
3. Click "New" to create a post, or click an existing post to edit it
4. Fill in the fields:
   - **Title**: the post title
   - **Date**: publication date (used for sorting)
   - **Summary**: a short one-line description
   - **Cover image**: uploaded to `public/uploads/`
   - **Draft**: toggle to hide from the live site
   - **Content blocks**: add, reorder (drag), edit, and delete blocks in any order
5. Click "Save" — the CMS commits the post to your repo as a Markdown file in `src/content/posts/`

### Block types

| Block | What it does |
|-------|-------------|
| Heading | A section heading (h2) |
| Paragraph | Rich text — bold, italic, links, lists |
| Photo | Image with caption, alt text, and width control (normal/wide/full-bleed) |
| YouTube | Embedded video from a URL with optional caption |
| Code block | Syntax-highlighted code with language and filename label |

## Deployment (GitHub Pages)

This site deploys automatically via GitHub Actions when you push to `main`.

### First-time setup

1. **Update `astro.config.mjs`**: set `base` to `"/your-repo-name"` and `site` to your GitHub Pages URL (e.g. `https://gwynfox.github.io`)
2. **Update `public/admin/config.yml`**: set `backend.repo` to `your-username/your-repo-name`
3. Push to GitHub
4. In your repo: **Settings → Pages → Source → "GitHub Actions"**
5. The workflow in `.github/workflows/deploy.yml` builds and deploys automatically

The CMS config and the Astro config both reference the repo name. Make sure they match.

### How it works

- Every push to `main` triggers the GitHub Actions workflow
- The workflow runs `npm run build` to generate static HTML
- The output is uploaded as a GitHub Pages artifact
- GitHub Pages serves it at `https://<username>.github.io/<repo-name>/`

Posts you create through the CMS are committed to the repo, which triggers a rebuild, which deploys the updated site. The whole loop is automated.
