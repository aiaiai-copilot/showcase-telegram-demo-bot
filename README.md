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
- A Telegram bot with API endpoint for sending messages

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

Edit `.env.local` and add your Telegram API endpoint:

```env
VITE_TELEGRAM_API_URL=https://your-api-endpoint.com/send-message
```

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
├── package.json
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

### Environment Variable Not Loading

Make sure your `.env.local` file is in the root directory and the variable starts with `VITE_`.

### Form Validation Errors

- Name must be at least 2 characters
- Message must be at least 3 characters

### API Connection Issues

1. Verify your API endpoint is accessible
2. Check CORS settings on your API
3. Ensure the API accepts JSON content type
4. Check browser console for detailed error messages

## License

MIT
