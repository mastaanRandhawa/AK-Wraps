# Instagram feed setup

The gallery uses the **Instagram Graph API** (not Basic Display — Meta shut that down in December 2024).

Because this site is a static SPA on GitHub Pages, posts are fetched at **build time** and saved to `frontend/public/instagram-feed.json`. The carousel reads that file in the browser.

## Requirements

1. **Instagram Professional account** — Business or Creator (free to switch in the Instagram app).
2. **Meta Developer app** — [developers.facebook.com](https://developers.facebook.com/).
3. **Long-lived access token** — stored as a GitHub secret, never in the frontend.

## Step 1 — Switch to a Professional account

In the Instagram app:

**Settings → Account type and tools → Switch to professional account**

Choose **Business** or **Creator**.

## Step 2 — Create a Meta app

1. Go to [developers.facebook.com/apps](https://developers.facebook.com/apps) → **Create App**.
2. Use case: **Other** → **Business**.
3. Add the product **Instagram** → **API setup with Instagram login** (no Facebook Page required).

## Step 3 — Configure Instagram Login

In the app dashboard:

1. **Instagram → API setup with Instagram login → Set up**.
2. Add your website URL under **Valid OAuth Redirect URIs** (e.g. `https://yourdomain.com/`).
3. Under **Permissions**, add:
   - `instagram_business_basic`
   - `instagram_business_content_publish` is **not** needed for read-only feeds.

## Step 4 — Generate a short-lived token

Use the **Instagram Login** flow in the Meta dashboard, or open this URL (replace values):

```
https://www.instagram.com/oauth/authorize
  ?client_id=YOUR_APP_ID
  &redirect_uri=YOUR_REDIRECT_URI
  &scope=instagram_business_basic
  &response_type=code
```

Exchange the `code` for a short-lived token:

```bash
curl -X POST "https://api.instagram.com/oauth/access_token" \
  -d "client_id=YOUR_APP_ID" \
  -d "client_secret=YOUR_APP_SECRET" \
  -d "grant_type=authorization_code" \
  -d "redirect_uri=YOUR_REDIRECT_URI" \
  -d "code=CODE_FROM_REDIRECT"
```

## Step 5 — Exchange for a long-lived token (~60 days)

```bash
curl "https://graph.instagram.com/access_token\
?grant_type=ig_exchange_token\
&client_secret=YOUR_APP_SECRET\
&access_token=SHORT_LIVED_TOKEN"
```

Save the `access_token` from the response.

### Refresh before it expires

```bash
curl "https://graph.instagram.com/refresh_access_token\
?grant_type=ig_refresh_token\
&access_token=LONG_LIVED_TOKEN"
```

Refresh every ~50 days and update the GitHub secret.

## Step 6 — Test locally

```bash
# PowerShell
$env:INSTAGRAM_ACCESS_TOKEN="your-long-lived-token"
node scripts/fetch-instagram-feed.mjs

cd frontend
npm run dev
```

Open `/gallery` — you should see your posts in the carousel.

## Step 7 — Add GitHub secret for production

1. Repo → **Settings → Secrets and variables → Actions**.
2. New secret: `INSTAGRAM_ACCESS_TOKEN` = your long-lived token.
3. Push to `main` — the deploy workflow runs `scripts/fetch-instagram-feed.mjs` before build.

## Troubleshooting

| Problem | Fix |
|--------|-----|
| Empty carousel | Token missing or expired; run the fetch script locally and check errors |
| `OAuthException` | Regenerate token; confirm account is Business/Creator |
| Images missing on carousel posts | Reels/videos use `thumbnail_url`; carousels use the first child image |
| Token works locally but not on deploy | Add `INSTAGRAM_ACCESS_TOKEN` to GitHub Actions secrets |

## Security

- Never commit tokens to git.
- Never expose tokens in frontend code or `VITE_*` env vars.
- The public site only serves `instagram-feed.json` (image URLs and captions).
