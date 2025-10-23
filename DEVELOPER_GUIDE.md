# Developer Setup and Deployment Guide

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Initial Setup](#initial-setup)
3. [Telegram Bot Configuration](#telegram-bot-configuration)
4. [Backend Deployment (Vercel)](#backend-deployment-vercel)
5. [Frontend Development](#frontend-development)
6. [Production Deployment](#production-deployment)
7. [Testing](#testing)
8. [Troubleshooting](#troubleshooting)
9. [Security Best Practices](#security-best-practices)

---

## Prerequisites

### Required Accounts
- **GitHub account** (for version control)
- **Vercel account** (free tier) - Sign up at https://vercel.com
- **Telegram account** (for bot creation)

### Required Software
- **Node.js 18+** and npm
- **Git**
- **Vercel CLI** (install via: `npm install -g vercel`)
- **Code editor** (VS Code recommended)

### Required Knowledge
- Basic understanding of React and TypeScript
- Familiarity with command line operations
- Basic Git commands

---

## Initial Setup

### 1. Clone the Repository

```bash
git clone https://github.com/aiaiai-copilot/showcase-telegram-demo-bot.git
cd showcase-telegram-demo-bot
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Verify Project Structure

Ensure you have these key files:
```
showcase-telegram-demo-bot/
├── api/
│   └── send-message.js           # Vercel serverless function
├── src/
│   ├── components/
│   │   ├── showcase/
│   │   │   └── TelegramDemoCard.tsx
│   │   └── ui/                   # shadcn/ui components
│   ├── App.tsx
│   ├── main.tsx
│   └── vite-env.d.ts            # TypeScript env declarations
├── .env.example                  # Frontend env template
├── .env.backend.example          # Backend env template
├── vercel.json                   # Vercel configuration
├── package.json
├── vite.config.ts
└── tsconfig.json
```

---

## Telegram Bot Configuration

### Step 1: Create a Telegram Bot

1. **Open Telegram** and search for `@BotFather`
2. **Send command:** `/newbot`
3. **Follow the prompts:**
   - Enter bot name (e.g., "My Demo Notification Bot")
   - Enter bot username (e.g., "my_demo_notification_bot")
4. **Save the bot token** - looks like: `1234567890:ABCdefGHIjklMNOpqrsTUVwxyz`
   - ⚠️ **CRITICAL:** Keep this token secret - never commit it to Git

### Step 2: Create a Telegram Channel

1. **In Telegram:** Menu → **New Channel** (not New Group)
2. **Configure channel:**
   - Name: Choose a descriptive name (e.g., "Demo Notifications")
   - Description: Optional
   - Channel type: **Public** (recommended for demo purposes)
   - Username: Set a unique username (e.g., `my_demo_messages`)
3. **Save the channel username** - format: `@my_demo_messages`

### Step 3: Add Bot as Channel Administrator

1. **Open your channel** in Telegram
2. **Click channel name** → Settings → Administrators
3. **Click "Add Administrator"**
4. **Search for your bot** by username
5. **Grant permissions:**
   - ✅ **Post Messages** (required)
   - ✅ **Edit Messages** (optional)
   - ❌ Other permissions not needed
6. **Save**

### Step 4: Verify Bot Access

Test that your bot can post to the channel:

```bash
# Replace with your actual values
curl -X POST "https://api.telegram.org/bot<YOUR_BOT_TOKEN>/sendMessage" \
  -H "Content-Type: application/json" \
  -d '{
    "chat_id": "@your_channel_username",
    "text": "Test message from bot"
  }'
```

Expected response: `{"ok":true,"result":{...}}`

If successful, you'll see the message in your channel.

---

## Backend Deployment (Vercel)

### Step 1: Login to Vercel

```bash
vercel login
```

Follow the browser authentication flow.

### Step 2: Deploy the Project

```bash
# From project root directory
vercel
```

**Answer the prompts:**

| Prompt | Answer |
|--------|--------|
| Set up and deploy? | **Y** (Yes) |
| Which scope? | Select your account |
| Link to existing project? | **N** (No, new project) |
| Project name? | Press Enter or type custom name |
| Code directory? | Press Enter (uses `./`) |
| Override settings? | **N** (No) |
| Connect repository? | **Y** (Yes, if prompted) |

**Expected output:**
```
✅  Production: https://your-project-name-xyz.vercel.app
```

⚠️ **Note:** This URL has a unique hash and requires authentication. You'll get the canonical URL later.

### Step 3: Configure Environment Variables

Add your Telegram credentials to Vercel:

#### Add Bot Token

```bash
vercel env add TELEGRAM_BOT_TOKEN
```

**When prompted:**
1. **Value:** Paste your bot token (from Step 1 of Telegram Bot Configuration)
2. **Environments:** Use **arrow keys** to highlight `Production`, press **Spacebar** to select, then **Enter**

#### Add Channel ID

```bash
vercel env add TELEGRAM_CHAT_ID
```

**When prompted:**
1. **Value:** Enter your channel username (e.g., `@my_demo_messages`)
   - For public channels: Use `@username` format
   - For private channels: Use numeric ID (e.g., `-1001234567890`)
2. **Environments:** Select `Production`

### Step 4: Redeploy with Environment Variables

**Option A: Via Vercel Dashboard (Recommended)**

1. Go to https://vercel.com/dashboard
2. Select your project: `showcase-telegram-demo-bot`
3. Navigate to **Deployments** tab
4. Click **"..."** menu on the latest deployment
5. Select **"Redeploy"**
6. Confirm

**Option B: Via CLI (if no Git author errors)**

```bash
vercel --prod
```

### Step 5: Get Your Production API URL

After deployment completes:

1. Go to your Vercel project dashboard
2. Look for **Domains** section at the top
3. Copy the production domain (e.g., `showcase-telegram-demo-bot.vercel.app`)

Your API endpoint will be:
```
https://showcase-telegram-demo-bot.vercel.app/api/send-message
```

### Step 6: Test the Backend API

```bash
# Replace with your actual production URL
curl -X POST https://showcase-telegram-demo-bot.vercel.app/api/send-message \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","message":"Hello from API!"}'
```

**Expected results:**
- API response: `{"success":true,"message":"Message sent successfully"}`
- Message appears in your Telegram channel

**If you get errors:**
- `404`: Check the URL and ensure `/api/send-message` is correct
- `500`: Check Vercel logs for backend errors
- `Auth required`: Use the canonical domain (without unique hash)

---

## Frontend Development

### Step 1: Create Environment File

Create `.env.local` in the project root:

```bash
# Linux/Mac
touch .env.local

# Windows PowerShell
New-Item .env.local
```

### Step 2: Configure Frontend Environment

Edit `.env.local` and add your backend API URL:

```env
VITE_TELEGRAM_API_URL=https://showcase-telegram-demo-bot.vercel.app/api/send-message
```

⚠️ **Replace** `showcase-telegram-demo-bot.vercel.app` with your actual production domain.

**Important notes:**
- File must be named exactly `.env.local` (note the leading dot)
- Variable must start with `VITE_` prefix
- Use the canonical production URL (without unique deployment hash)
- This file is gitignored - never commit it

### Step 3: Update Channel Link in Component

Open `src/components/showcase/TelegramDemoCard.tsx`

Find line ~89 and update the channel link:

```typescript
// BEFORE
href="https://t.me/YOUR_PUBLIC_CHANNEL_NAME"

// AFTER (replace with your actual channel username)
href="https://t.me/my_demo_messages"
```

### Step 4: Start Development Server

```bash
npm run dev
```

**Expected output:**
```
  VITE v6.4.1  ready in XXX ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

### Step 5: Test Locally

1. Open browser to `http://localhost:5173`
2. You should see the TelegramDemoCard component
3. Fill in the form:
   - Name: At least 2 characters
   - Message: At least 3 characters
4. Click "Send Test Message"
5. Expected behavior:
   - Button shows spinner and "Sending..." text
   - Toast notification appears with success message
   - Form resets
   - Message appears in your Telegram channel

**Common local development issues:**

| Issue | Solution |
|-------|----------|
| `env is undefined` | Restart dev server after creating `.env.local` |
| CORS error | Check you're using production URL, not preview URL |
| 404 error | Verify `VITE_TELEGRAM_API_URL` in `.env.local` |
| Form validation errors | Ensure name ≥2 chars, message ≥3 chars |

---

## Production Deployment

### Option 1: Deploy Frontend to Vercel (Recommended)

#### Via Vercel Dashboard

1. Go to https://vercel.com/dashboard
2. Click **"Add New"** → **"Project"**
3. Import your Git repository
4. **Configure:**
   - Framework Preset: **Vite**
   - Root Directory: `./`
   - Build Command: `vite build` (auto-detected)
   - Output Directory: `dist` (auto-detected)
5. **Add Environment Variable:**
   - Name: `VITE_TELEGRAM_API_URL`
   - Value: `https://showcase-telegram-demo-bot.vercel.app/api/send-message`
   - Environment: Production
6. Click **"Deploy"**

Your frontend will be deployed to: `https://showcase-telegram-demo-bot.vercel.app`

#### Via Vercel CLI

⚠️ **Note:** May encounter Git author errors if commits have non-team email.

```bash
vercel --prod
```

If successful, you'll get a production URL.

### Option 2: Deploy to Other Platforms

#### Netlify

1. Create `netlify.toml`:
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

2. Add environment variable `VITE_TELEGRAM_API_URL` in Netlify dashboard
3. Deploy via Git connection or Netlify CLI

#### GitHub Pages

```bash
npm run build
# Deploy dist/ folder to gh-pages branch
```

Add environment variable via GitHub Actions secrets.

---

## Testing

### Unit Testing (Future Enhancement)

Currently no tests configured. To add:

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom
```

Create test files in `src/__tests__/`

### Integration Testing

#### Test API Endpoint

```bash
# Success case
curl -X POST https://your-domain.vercel.app/api/send-message \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","message":"Test message"}'

# Expected: {"success":true,"message":"Message sent successfully"}

# Validation error - name too short
curl -X POST https://your-domain.vercel.app/api/send-message \
  -H "Content-Type: application/json" \
  -d '{"name":"A","message":"Test message"}'

# Expected: {"error":"Name must be at least 2 characters"}

# Validation error - message too short
curl -X POST https://your-domain.vercel.app/api/send-message \
  -H "Content-Type: application/json" \
  -d '{"name":"John","message":"Hi"}'

# Expected: {"error":"Message must be at least 3 characters"}
```

#### Test Frontend Flow

**Manual test checklist:**

- [ ] Form loads correctly
- [ ] Channel link opens correct Telegram channel
- [ ] Name field validation (min 2 chars)
- [ ] Message field validation (min 3 chars)
- [ ] Submit button disabled during submission
- [ ] Loading spinner appears during submission
- [ ] Success toast notification appears
- [ ] Form resets after successful submission
- [ ] Error toast appears on API failure
- [ ] Message appears in Telegram channel

---

## Troubleshooting

### Backend Issues

#### Issue: "Server configuration error"

**Symptoms:** API returns 500 error with this message.

**Causes:**
- Environment variables not set in Vercel
- Environment variables set in wrong environment (Preview instead of Production)

**Solutions:**
1. Go to Vercel Dashboard → Project → Settings → Environment Variables
2. Verify both `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` exist
3. Ensure they're set for **Production** environment
4. Redeploy after adding variables

#### Issue: "Failed to send message to Telegram"

**Symptoms:** API accepts request but Telegram API returns error.

**Causes:**
- Bot not added as admin to channel
- Incorrect `TELEGRAM_CHAT_ID` format
- Bot token invalid or revoked

**Solutions:**
1. Verify bot has admin permissions in channel
2. For public channels: Ensure `TELEGRAM_CHAT_ID` starts with `@`
3. For private channels: Use numeric ID (negative number)
4. Test bot token:
   ```bash
   curl https://api.telegram.org/bot<YOUR_TOKEN>/getMe
   ```
   Should return bot information

#### Issue: CORS Errors from Frontend

**Symptoms:** Browser console shows CORS policy error.

**Causes:**
- Using preview deployment URL (with auth protection)
- `vercel.json` not deployed
- Old deployment without CORS config

**Solutions:**
1. Use canonical production domain (e.g., `project-name.vercel.app`)
2. Verify `vercel.json` exists and is committed to Git
3. Redeploy to ensure latest config is active
4. Check Vercel deployment logs for errors

#### Issue: Deployment Protection / Authentication Required

**Symptoms:** API returns HTML authentication page instead of JSON.

**Causes:**
- Accessing preview deployment URL
- Deployment protection enabled

**Solutions:**
1. Use production URL (without unique hash): `https://project-name.vercel.app`
2. OR disable deployment protection:
   - Vercel Dashboard → Project → Settings → Deployment Protection
   - Set to "Standard Protection" or disable

### Frontend Issues

#### Issue: `import.meta.env.VITE_TELEGRAM_API_URL` is undefined

**Symptoms:** Console shows `undefined`, requests go to `/undefined`

**Causes:**
- `.env.local` file missing or in wrong location
- Variable name typo
- Dev server not restarted after creating `.env.local`
- File encoding issues

**Solutions:**
1. Verify `.env.local` exists in project root (same level as `package.json`)
2. Check file contents:
   ```bash
   cat .env.local
   # Should show: VITE_TELEGRAM_API_URL=https://...
   ```
3. Ensure variable starts with `VITE_` prefix (required by Vite)
4. Stop dev server (Ctrl+C) and restart: `npm run dev`
5. If using Windows, create file with:
   ```powershell
   notepad .env.local
   ```
   Manually type the content and save

#### Issue: TypeScript Compilation Error

**Symptoms:**
```
error TS2339: Property 'env' does not exist on type 'ImportMeta'
```

**Causes:**
- Missing `src/vite-env.d.ts` file

**Solutions:**
1. Ensure `src/vite-env.d.ts` exists with:
   ```typescript
   /// <reference types="vite/client" />

   interface ImportMetaEnv {
     readonly VITE_TELEGRAM_API_URL: string
   }

   interface ImportMeta {
     readonly env: ImportMetaEnv
   }
   ```
2. Restart TypeScript server in VS Code: Cmd/Ctrl+Shift+P → "TypeScript: Restart TS Server"

#### Issue: Form Validation Not Working

**Symptoms:** Can submit form with invalid data.

**Causes:**
- Zod schema misconfigured
- React Hook Form not properly connected

**Solutions:**
1. Verify Zod schema in `TelegramDemoCard.tsx`:
   ```typescript
   const telegramDemoSchema = z.object({
     name: z.string().min(2, "Name must be longer than 2 characters"),
     message: z.string().min(3, "Message must be longer than 3 characters"),
   });
   ```
2. Check `useForm` configuration includes `zodResolver`
3. Inspect browser console for validation errors

### Git and Deployment Issues

#### Issue: "Git author must have access to team"

**Symptoms:** `vercel --prod` fails with this error.

**Causes:**
- Git commits have email addresses not associated with Vercel team

**Solutions:**
1. Use Vercel Dashboard to deploy instead of CLI
2. OR update Git author for new commits:
   ```bash
   git config user.email "your-vercel-email@example.com"
   git config user.name "Your Name"
   ```
3. Make a new commit with updated author

---

## Security Best Practices

### 1. Environment Variables

**DO:**
- ✅ Store sensitive data (bot tokens, API keys) in Vercel environment variables
- ✅ Use `.env.local` for local development (gitignored by default)
- ✅ Use `VITE_` prefix only for non-sensitive, client-side variables
- ✅ Regularly rotate bot tokens

**DON'T:**
- ❌ Commit `.env.local` or `.env` files to Git
- ❌ Expose bot tokens in client-side code
- ❌ Share bot tokens in chat, screenshots, or documentation
- ❌ Use the same bot token for multiple projects

### 2. Bot Token Security

**If token is exposed:**
1. Open Telegram and message `@BotFather`
2. Send `/mybots`
3. Select your bot
4. Select "API Token"
5. Select "Revoke current token"
6. Get new token
7. Update `TELEGRAM_BOT_TOKEN` in Vercel
8. Redeploy

### 3. Input Validation

The backend validates input to prevent:
- XSS attacks (Telegram sanitizes HTML)
- Injection attacks
- Spam (rate limiting recommended for production)

**Current validation:**
```javascript
// In api/send-message.js
if (!name || name.length < 2) {
  return res.status(400).json({ error: 'Name must be at least 2 characters' });
}
```

**Production recommendations:**
- Add rate limiting (Vercel Edge Middleware or Upstash Rate Limit)
- Implement CAPTCHA for public forms
- Add content filtering for inappropriate messages
- Log failed attempts for monitoring

### 4. CORS Configuration

Current `vercel.json` allows all origins (`*`):

```json
{ "key": "Access-Control-Allow-Origin", "value": "*" }
```

**For production, restrict to your domains:**

```json
{ "key": "Access-Control-Allow-Origin", "value": "https://yourdomain.com" }
```

### 5. Channel Permissions

**Recommended bot permissions:**
- ✅ Post Messages (minimum required)
- ❌ Delete Messages (not needed)
- ❌ Ban Users (not needed)
- ❌ Invite Users (not needed)

Principle: Grant minimum necessary permissions.

---

## Additional Configuration

### Custom Domain

1. Go to Vercel Dashboard → Project → Settings → Domains
2. Add your custom domain
3. Configure DNS records as instructed
4. Update `VITE_TELEGRAM_API_URL` to use custom domain

### Rate Limiting (Production Recommendation)

Install Upstash rate limiting:

```bash
npm install @upstash/ratelimit @upstash/redis
```

Update `api/send-message.js`:

```javascript
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, "60 s"), // 5 requests per 60 seconds
});

export default async function handler(req, res) {
  const identifier = req.headers['x-forwarded-for'] || 'anonymous';
  const { success } = await ratelimit.limit(identifier);

  if (!success) {
    return res.status(429).json({ error: 'Too many requests' });
  }

  // ... rest of handler
}
```

### Analytics Integration

Add Vercel Analytics:

```bash
npm install @vercel/analytics
```

In `src/main.tsx`:

```typescript
import { Analytics } from '@vercel/analytics/react';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <Analytics />
  </StrictMode>,
)
```

---

## Maintenance

### Regular Tasks

**Weekly:**
- [ ] Check Telegram channel for spam/inappropriate messages
- [ ] Review Vercel deployment logs for errors

**Monthly:**
- [ ] Update dependencies: `npm update`
- [ ] Review and rotate API keys if needed
- [ ] Check Vercel usage limits (free tier)

**Quarterly:**
- [ ] Security audit of environment variables
- [ ] Review and update CORS policies
- [ ] Test disaster recovery (redeploy from scratch)

### Updating Dependencies

```bash
# Check for updates
npm outdated

# Update all dependencies
npm update

# Update specific package
npm update react react-dom

# Test after updates
npm run build
npm run dev
```

### Monitoring

**Vercel Dashboard provides:**
- Deployment logs
- Function invocations
- Error tracking
- Performance metrics

**Recommended external tools:**
- **Sentry** for error tracking
- **LogRocket** for session replay
- **Uptime monitoring** (UptimeRobot, Pingdom)

---

## Support and Resources

### Documentation Links
- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [Vercel Documentation](https://vercel.com/docs)
- [Telegram Bot API](https://core.telegram.org/bots/api)
- [shadcn/ui Components](https://ui.shadcn.com/)

### Common Commands Reference

```bash
# Development
npm install              # Install dependencies
npm run dev             # Start dev server
npm run build           # Build for production
npm run preview         # Preview production build

# Vercel
vercel login            # Login to Vercel
vercel                  # Deploy to preview
vercel --prod           # Deploy to production
vercel env add          # Add environment variable
vercel env ls           # List environment variables
vercel ls               # List deployments
vercel logs             # View function logs

# Git
git status              # Check status
git add .               # Stage all changes
git commit -m "message" # Commit changes
git push                # Push to remote
git pull                # Pull latest changes
```

---

## Appendix: Architecture Overview

### System Flow

```
┌─────────────┐
│   Browser   │
│   (User)    │
└──────┬──────┘
       │ 1. Fill form (name, message)
       │ 2. Submit
       ▼
┌─────────────────────┐
│  React Frontend     │
│  (Vite + TypeScript)│
│  - Form validation  │
│  - Toast UI         │
└──────┬──────────────┘
       │ 3. POST /api/send-message
       │    {name, message}
       ▼
┌────────────────────────┐
│ Vercel Serverless API  │
│ - Input validation     │
│ - Format message       │
│ - CORS handling        │
└──────┬─────────────────┘
       │ 4. POST to Telegram Bot API
       │    /sendMessage
       │    {chat_id, text}
       ▼
┌──────────────────┐
│ Telegram Bot API │
└──────┬───────────┘
       │ 5. Post message
       ▼
┌────────────────────┐
│ Telegram Channel   │
│ (Public/Private)   │
│ - Visible to users │
└────────────────────┘
```

### Technology Stack

**Frontend:**
- React 18
- TypeScript
- Vite (build tool)
- Tailwind CSS
- shadcn/ui components
- React Hook Form
- Zod (validation)
- Sonner (toasts)
- Lucide React (icons)

**Backend:**
- Node.js (Vercel serverless runtime)
- Vercel Serverless Functions
- Telegram Bot API

**Infrastructure:**
- Vercel (hosting & serverless)
- GitHub (version control)
- Telegram (messaging platform)

---

**Document Version:** 1.0
**Last Updated:** 2025-10-23
**Maintained By:** Development Team
