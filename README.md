# Telegram Demo Bot - Interactive Showcase

A React TypeScript application showcasing an interactive Telegram bot integration with a beautiful UI built using shadcn/ui components.

## Features

- Interactive demo form for sending messages to a Telegram channel
- Form validation with Zod and React Hook Form
- Real-time toast notifications
- Beautiful UI with shadcn/ui and Tailwind CSS
- Type-safe TypeScript implementation

## Prerequisites

- Node.js 18+ and npm (or yarn/pnpm)
- A Telegram bot (create one via [@BotFather](https://t.me/botfather) on Telegram)
- A Vercel account (free tier works perfectly)
- A public Telegram channel or group

## Architecture

This project consists of two parts:

1. **Frontend (React)** - The demo UI that users interact with
2. **Backend (Vercel Serverless)** - API that securely communicates with Telegram

```
User → React App → Vercel API → Telegram Bot API → Your Channel
```

## Setup Guide

### Part 1: Deploy the Backend API to Vercel

First, you need to deploy the backend API that will handle Telegram communication.

#### 1.1 Create a Telegram Bot

1. Open Telegram and search for [@BotFather](https://t.me/botfather)
2. Send `/newbot` and follow the instructions
3. Save your bot token (looks like: `1234567890:ABCdefGHIjklMNOpqrsTUVwxyz`)
4. Add your bot as an administrator to your Telegram channel

#### 1.2 Get Your Channel ID

For a **public channel**:
- Use your channel username: `@your_channel_name`

For a **private channel** (requires additional steps):
1. Send a message to your channel
2. Forward it to [@userinfobot](https://t.me/userinfobot)
3. It will show you the channel ID (e.g., `-1001234567890`)

#### 1.3 Deploy to Vercel

**Option A: Deploy via Vercel CLI (Recommended)**

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy from the project root
vercel
```

When prompted:
- Select "Yes" to setup and deploy
- Project name: Choose any name
- Framework: Select "Other"
- Build command: Leave empty (press Enter)
- Output directory: Leave empty (press Enter)

**Option B: Deploy via Vercel Dashboard**

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New" → "Project"
3. Import your Git repository
4. Click "Deploy"

#### 1.4 Configure Environment Variables in Vercel

After deployment:

1. Go to your project in Vercel Dashboard
2. Navigate to "Settings" → "Environment Variables"
3. Add these two variables:

| Name | Value | Example |
|------|-------|---------|
| `TELEGRAM_BOT_TOKEN` | Your bot token from BotFather | `1234567890:ABCdef...` |
| `TELEGRAM_CHAT_ID` | Your channel ID or username | `@your_channel` or `-1001234567890` |

4. Click "Save"
5. Go to "Deployments" tab and redeploy (click "..." → "Redeploy")

#### 1.5 Get Your API URL

After deployment, Vercel gives you a URL like:
```
https://your-project-name.vercel.app
```

Your API endpoint will be:
```
https://your-project-name.vercel.app/api/send-message
```

**Save this URL - you'll need it for the frontend!**

### Part 2: Run the Frontend Locally

Now configure and run the React app locally.

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your Vercel API endpoint (from Part 1, step 1.5):

```env
VITE_TELEGRAM_API_URL=https://your-project-name.vercel.app/api/send-message
```

Replace `your-project-name` with your actual Vercel deployment URL.

### 3. Update Channel Link

Open `src/components/showcase/TelegramDemoCard.tsx` and replace the placeholder URL:

```tsx
// Change this line (around line 89)
href="https://t.me/YOUR_PUBLIC_CHANNEL_NAME"
// To your actual channel:
href="https://t.me/your_actual_channel"
```

### 4. Run the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Manual Testing

1. Open the application in your browser
2. Click "Go to Channel" to open your Telegram channel in a new tab
3. Fill in the form with:
   - **Name**: Your name (minimum 2 characters)
   - **Message**: A test message (minimum 3 characters)
4. Click "Send Test Message"
5. Check your Telegram channel for the message

### Expected Behavior

- **Success**: Toast notification "Success! Check the channel for your message." appears and form resets
- **Error**: Toast notification "Failed to send. Please try again later." appears
- **Loading**: Submit button shows spinner and "Sending..." text while processing

## API Requirements

Your Telegram API endpoint should:

- Accept POST requests
- Expect JSON body with:
  ```json
  {
    "name": "string",
    "message": "string"
  }
  ```
- Return appropriate HTTP status codes (200 for success)

## Project Structure

```
showcase-telegram-demo-bot/
├── api/
│   └── send-message.js                  # Vercel serverless function
├── src/
│   ├── components/
│   │   ├── showcase/
│   │   │   └── TelegramDemoCard.tsx    # Main demo component
│   │   └── ui/                          # shadcn/ui components
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── form.tsx
│   │       ├── input.tsx
│   │       ├── label.tsx
│   │       └── textarea.tsx
│   ├── lib/
│   │   └── utils.ts                     # Utility functions
│   ├── App.tsx                          # Main app component
│   ├── main.tsx                         # Entry point
│   └── index.css                        # Global styles
├── .env.example                         # Frontend env template
├── .env.backend.example                 # Backend env template
├── package.json
├── vercel.json                          # Vercel configuration
├── vite.config.ts
├── tailwind.config.js
└── tsconfig.json
```

## Technologies Used

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality React components
- **React Hook Form** - Form state management
- **Zod** - Schema validation
- **Sonner** - Toast notifications
- **Lucide React** - Icon library

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Troubleshooting

### Backend Issues

**"Server configuration error"**
- Check that `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` are set in Vercel environment variables
- Redeploy after adding environment variables

**"Failed to send message to Telegram"**
- Verify your bot is added as an administrator to the channel
- Check that the `TELEGRAM_CHAT_ID` is correct
- For public channels, ensure it starts with `@`
- For private channels, ensure it's a negative number

**Bot not posting to channel**
- Make sure your bot has admin permissions in the channel
- Test your bot token: `curl https://api.telegram.org/bot<YOUR_TOKEN>/getMe`

### Frontend Issues

**Environment Variable Not Loading**
- Make sure `.env.local` is in the root directory
- Variable must start with `VITE_`
- Restart the dev server after changing `.env.local`

**Form Validation Errors**
- Name must be at least 2 characters
- Message must be at least 3 characters

**API Connection Issues**
- Verify your Vercel API endpoint is accessible
- Check browser console for detailed error messages
- Ensure the URL in `.env.local` includes `/api/send-message`
- Test the endpoint: `curl -X POST https://your-project.vercel.app/api/send-message -H "Content-Type: application/json" -d '{"name":"Test","message":"Hello"}'`

**CORS Errors**
- The `vercel.json` should already handle CORS
- If issues persist, check Vercel deployment logs

## License

MIT
