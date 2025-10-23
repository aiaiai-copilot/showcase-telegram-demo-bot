# User Guide: Telegram Demo Card

## Overview

This interactive demo allows you to send a test message that will instantly appear in a public Telegram channel. It's designed to showcase real-time Telegram bot integration.

---

## How to Use

### Step 1: Subscribe to the Telegram Channel

Before sending a message, subscribe to the demo channel to see your message appear in real-time.

1. **Click the "Go to Channel" button** on the demo card
2. This opens the Telegram channel in a new browser tab or Telegram app
3. **Subscribe to the channel** (click "Join" or "Subscribe")
4. **Keep this tab/app open** to see your message appear

💡 **Tip:** You can also search for the channel directly in Telegram using the channel username shown in the link.

---

### Step 2: Fill Out the Demo Form

Return to the demo page and complete the form:

#### Name Field
- **What to enter:** Your name or nickname
- **Requirements:**
  - Minimum 2 characters
  - Can include letters, numbers, and special characters
- **Examples:**
  - ✅ "John"
  - ✅ "Jane Doe"
  - ✅ "User123"
  - ❌ "A" (too short)

#### Message Field
- **What to enter:** Your test message
- **Requirements:**
  - Minimum 3 characters
  - Can be any text you'd like to share
- **Examples:**
  - ✅ "Hello from the demo!"
  - ✅ "Testing the bot integration"
  - ✅ "👋 Hi"
  - ❌ "Hi" (too short)

---

### Step 3: Send Your Message

1. **Click the "Send Test Message" button**
2. **Wait for processing:**
   - Button text changes to "Sending..."
   - A spinner appears next to the text
   - Button is disabled during processing (prevents double-submission)

---

### Step 4: Check Results

#### Success Scenario ✅

**What happens:**
1. **Green toast notification** appears in the top-right corner:
   > "Success! Check the channel for your message."
2. **Form automatically resets** - all fields are cleared
3. **Your message appears in the Telegram channel** with this format:
   ```
   📝 New message from [Your Name]:

   [Your Message]
   ```

**Timeline:** Message typically appears in Telegram within 1-2 seconds.

#### Error Scenario ❌

**What happens:**
1. **Red toast notification** appears:
   > "Failed to send. Please try again later."
2. **Form remains filled** - your data is not lost
3. **No message appears** in Telegram

**Common causes:**
- Temporary network issue
- Server temporarily unavailable
- Rate limiting (too many requests)

**What to do:**
- Wait a few seconds
- Try submitting again
- If problem persists, contact support

---

## Validation Rules

The form validates your input before sending. You'll see error messages if:

### Name Validation

| Input | Status | Message |
|-------|--------|---------|
| Empty | ❌ Error | Required field |
| "A" | ❌ Error | "Name must be longer than 2 characters" |
| "Jo" | ✅ Valid | Accepted |
| "John Doe" | ✅ Valid | Accepted |

### Message Validation

| Input | Status | Message |
|-------|--------|---------|
| Empty | ❌ Error | Required field |
| "Hi" | ❌ Error | "Message must be longer than 3 characters" |
| "Hey" | ✅ Valid | Accepted |
| Long message | ✅ Valid | Accepted (no maximum length) |

**Error display:** Validation errors appear in red text below the respective field.

---

## Visual Guide

### Initial State

```
┌─────────────────────────────────────────┐
│ Live Demo: Telegram Notifications      │
│ Send a test message and watch it        │
│ instantly appear in our public channel. │
├─────────────────────────────────────────┤
│                                         │
│ 1. Subscribe to see the result:        │
│ ┌─────────────────────────────┐        │
│ │ 📤 Go to Channel             │ ← Click│
│ └─────────────────────────────┘        │
│                                         │
│ 2. Send a test message:                │
│ Name                                    │
│ ┌─────────────────────────────┐        │
│ │ Your name                    │        │
│ └─────────────────────────────┘        │
│                                         │
│ Message                                 │
│ ┌─────────────────────────────┐        │
│ │ Your test message            │        │
│ │                              │        │
│ │                              │        │
│ └─────────────────────────────┘        │
├─────────────────────────────────────────┤
│ ┌─────────────────────────────┐        │
│ │ Send Test Message            │ ← Click│
│ └─────────────────────────────┘        │
└─────────────────────────────────────────┘
```

### Sending State

```
┌─────────────────────────────────────────┐
│                                         │
│ Name: "John Doe"                        │
│ Message: "Hello from the demo!"         │
│                                         │
├─────────────────────────────────────────┤
│ ┌─────────────────────────────┐        │
│ │ ⚪ Sending...                │ (Disabled)
│ └─────────────────────────────┘        │
└─────────────────────────────────────────┘
   ↑ Spinner animation
```

### Success State

```
┌─────────────────────────────────────────┐
│                          ┌──────────────┐│
│                          │✅ Success!   ││
│                          │Check channel││
│                          └──────────────┘│
│                                    ↑     │
│                              Toast notification
│                                         │
│ Name                                    │
│ ┌─────────────────────────────┐        │
│ │                              │ ← Cleared
│ └─────────────────────────────┘        │
│                                         │
│ Message                                 │
│ ┌─────────────────────────────┐        │
│ │                              │ ← Cleared
│ └─────────────────────────────┘        │
└─────────────────────────────────────────┘
```

---

## Telegram Channel View

After successfully sending a message, you'll see it in the Telegram channel:

```
┌─────────────────────────────────────┐
│ Demo Notifications                  │
│ @demo_channel · Public Channel      │
├─────────────────────────────────────┤
│                                     │
│ 📝 New message from John Doe:       │
│                                     │
│ Hello from the demo!                │
│                                     │
│ 2:45 PM                             │
├─────────────────────────────────────┤
│ 📝 New message from Alice:          │
│                                     │
│ Testing the integration!            │
│                                     │
│ 2:43 PM                             │
└─────────────────────────────────────┘
```

**Message format:**
- 📝 Emoji indicator
- "New message from [Name]:"
- Your message text
- Timestamp (from Telegram)

---

## Frequently Asked Questions (FAQ)

### General Questions

**Q: Is my message public?**

A: Yes. All messages sent through this demo appear in a public Telegram channel that anyone can view. Do not send sensitive or private information.

**Q: Can I delete my message after sending?**

A: No. Users cannot delete messages from the demo. Only channel administrators can remove messages. If you accidentally sent something inappropriate, contact support.

**Q: Is there a limit to how many messages I can send?**

A: To prevent spam, the system may rate-limit submissions (typically 5 messages per minute per user). If you're blocked, wait a few minutes and try again.

**Q: Can I send messages without subscribing to the channel?**

A: Yes, you can send messages without subscribing. However, you won't be able to see your message appear unless you join the channel.

**Q: What languages are supported?**

A: The form accepts any Unicode text, including:
- English, Spanish, French, German, etc.
- Cyrillic (Russian, Ukrainian, etc.)
- Asian languages (Chinese, Japanese, Korean)
- Arabic, Hebrew
- Emojis 😊🎉

---

### Troubleshooting

**Q: Why is the "Send Test Message" button disabled?**

A: The button is disabled when:
- Form validation fails (name too short, message too short)
- Message is currently being sent (wait for completion)
- Check for red error messages under the input fields

**Q: I see "Failed to send. Please try again later." What should I do?**

**Possible causes and solutions:**

1. **Network connection issue**
   - Check your internet connection
   - Try refreshing the page

2. **Server temporarily unavailable**
   - Wait 30 seconds and try again
   - If problem persists, try again later

3. **Rate limiting**
   - You've sent too many messages in a short time
   - Wait 1-2 minutes before trying again

4. **Invalid input**
   - Despite validation, server might reject certain content
   - Try rephrasing your message
   - Avoid special characters or very long messages

**Q: The form submitted but I don't see my message in Telegram. Why?**

**Possible reasons:**

1. **You're not subscribed to the channel**
   - Click "Go to Channel" and join
   - Refresh the channel to see new messages

2. **Message is delayed**
   - Telegram sometimes has a few seconds delay
   - Wait up to 10 seconds and check again
   - Pull down to refresh in Telegram mobile app

3. **You're looking at the wrong channel**
   - Verify you're in the correct channel (check channel name/username)
   - Click "Go to Channel" button again to confirm

4. **Message was sent to a different channel**
   - If you're testing multiple demos, ensure you're checking the right channel

**Q: Can I use HTML or markdown formatting in my message?**

A: The demo sends plain text only. HTML tags and markdown syntax (like `**bold**`) will appear as literal text, not formatted.

**Q: Why do I see an error message under the name/message field?**

A: The form validates your input in real-time:
- Red error text = invalid input
- Error disappears when you fix the issue
- Common errors:
  - Name too short (< 2 characters)
  - Message too short (< 3 characters)
  - Empty fields

**Q: The page is loading but the form doesn't appear. What's wrong?**

**Troubleshooting steps:**

1. **Hard refresh the page:**
   - Windows/Linux: Ctrl + Shift + R
   - Mac: Cmd + Shift + R

2. **Clear browser cache:**
   - Settings → Privacy → Clear browsing data
   - Select "Cached images and files"

3. **Try a different browser:**
   - Chrome, Firefox, Safari, Edge all supported

4. **Check browser console for errors:**
   - Press F12 → Console tab
   - Look for error messages
   - Share with support if needed

5. **Disable browser extensions:**
   - Ad blockers might interfere
   - Try incognito/private mode

---

### Privacy & Security

**Q: What data is collected when I submit the form?**

A: The system collects:
- Your name (as you entered it)
- Your message text
- Timestamp (when message was sent)
- IP address (for rate limiting, not stored long-term)

**Q: Is my data stored permanently?**

A:
- **Name and message:** Visible permanently in the public Telegram channel (until manually deleted by admin)
- **IP address:** Used only for rate limiting, not permanently stored
- **No account required:** No user accounts, emails, or passwords collected

**Q: Can I request my message be deleted?**

A: Contact the channel administrator through Telegram or the website's support contact. Include:
- Your name (as it appears in the message)
- Approximate time you sent the message
- Reason for deletion request

**Q: Is this form secure?**

A: Security measures:
- HTTPS encryption for all data transmission
- Server-side input validation
- Rate limiting to prevent spam
- No SQL database (reduced attack surface)
- Bot token stored securely server-side (not in browser)

However, remember: **All messages are public.** Never send:
- Passwords or API keys
- Personal identification numbers
- Credit card information
- Private/confidential data

---

### Technical Questions

**Q: What happens when I click "Send Test Message"?**

A: Behind the scenes:
1. Form validates your input (client-side)
2. JavaScript sends data to API server (HTTPS POST request)
3. Server validates input again (server-side)
4. Server formats message and sends to Telegram Bot API
5. Telegram posts message to channel
6. Server responds success/error to browser
7. Browser shows toast notification and resets form

**Q: Why does the button show a spinner?**

A: The spinner provides visual feedback that:
- Your request is being processed
- You should wait (don't click again)
- The system is communicating with Telegram

Typical processing time: 1-3 seconds

**Q: What browsers are supported?**

**Fully supported:**
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

**Mobile browsers:**
- Chrome (Android)
- Safari (iOS)
- Samsung Internet
- Firefox (mobile)

**Not supported:**
- Internet Explorer (all versions)
- Very old browser versions (5+ years old)

**Q: Does this work on mobile devices?**

A: Yes! The demo is fully responsive and works on:
- Smartphones (iOS, Android)
- Tablets
- Desktop computers

**Mobile experience:**
- Clicking "Go to Channel" opens Telegram app if installed
- Otherwise opens Telegram Web
- Touch-optimized buttons and inputs
- Works in portrait and landscape orientations

**Q: Can I use this demo in my own project?**

A: This is a demonstration project. If you want to:
- **Use the code:** Check the repository license (MIT)
- **Integrate similar functionality:** Follow the developer guide
- **Commercial use:** Verify license terms

Contact the project maintainer for specific use cases.

---

## Accessibility

This demo follows web accessibility best practices:

### Keyboard Navigation

**Tab order:**
1. "Go to Channel" button
2. Name input field
3. Message textarea
4. "Send Test Message" button

**Keyboard shortcuts:**
- `Tab` - Move to next field
- `Shift + Tab` - Move to previous field
- `Enter` - Submit form (when focus is in a field)
- `Space` - Click focused button

### Screen Readers

The demo is compatible with:
- JAWS
- NVDA
- VoiceOver (macOS/iOS)
- TalkBack (Android)

**ARIA labels:**
- Form fields have descriptive labels
- Error messages are announced
- Button states (disabled, loading) are conveyed
- Toast notifications are announced

### Visual Accessibility

**Color contrast:**
- All text meets WCAG AA standards
- Error messages use both color and text
- Focus indicators visible on all interactive elements

**Text size:**
- Respects browser zoom (100%-200%)
- Readable at default size
- Scalable without layout breaking

**Motion:**
- Spinner animation respects `prefers-reduced-motion`
- No auto-playing videos or animations
- Toast notifications can be dismissed

---

## Best Practices

### Message Content

**Good examples:**
- "Hello from New York! 👋"
- "Testing the integration - looks great!"
- "Greetings from the demo page"
- "Real-time messaging is cool!"

**Avoid:**
- Spam or repetitive messages
- Offensive or inappropriate content
- Personal information (phone numbers, addresses)
- Commercial advertisements
- Very long messages (keep under 500 characters)

### Etiquette

**Do:**
- ✅ Send test messages to verify functionality
- ✅ Be respectful and friendly
- ✅ Use appropriate language
- ✅ Keep messages concise

**Don't:**
- ❌ Send the same message repeatedly (spam)
- ❌ Use offensive language
- ❌ Share others' private information
- ❌ Advertise products or services

---

## Contact & Support

### Need Help?

If you encounter issues not covered in this guide:

1. **Check FAQ section** above
2. **Try troubleshooting steps** for your specific issue
3. **Contact support:**
   - Email: [Your support email]
   - GitHub Issues: [Repository URL]
   - Telegram: [Support channel/bot]

**When contacting support, include:**
- What you were trying to do
- What happened (actual behavior)
- What you expected to happen
- Browser and device information
- Screenshots (if applicable)
- Error messages from browser console

### Feedback

We welcome your feedback!

**Ways to provide feedback:**
- Submit feature requests via GitHub Issues
- Report bugs with detailed reproduction steps
- Suggest improvements to the user experience
- Share your use case for similar integrations

### Contributing

Interested in improving this demo?
- View source code: [GitHub Repository URL]
- Read developer guide: `DEVELOPER_GUIDE.md`
- Submit pull requests with improvements
- Report security issues privately to: [Security email]

---

## Version History

### Current Version: 1.0.0

**Features:**
- Real-time message posting to Telegram
- Form validation (client and server-side)
- Toast notifications for feedback
- Responsive design (mobile + desktop)
- Accessibility support

**Limitations:**
- English UI only (messages support all languages)
- Rate limiting: ~5 messages/minute
- No message editing or deletion by users
- Single channel destination only

### Planned Improvements

**Upcoming features:**
- Message preview before sending
- Character counter
- Emoji picker
- Dark mode support
- Multi-language UI

**Under consideration:**
- User authentication (for private messages)
- Message threading
- File attachments
- Custom formatting options

---

## Legal

### Terms of Use

By using this demo, you agree to:
- Use the service responsibly
- Not send spam, illegal content, or offensive messages
- Not attempt to abuse or exploit the system
- Accept that all messages are public

### Privacy Policy

See full privacy policy at: [Privacy Policy URL]

**Summary:**
- We don't collect personal information beyond what you submit
- Messages are publicly visible in Telegram
- We use cookies for basic functionality only
- No third-party tracking

### Content Policy

Messages must comply with:
- Telegram Terms of Service
- Local laws and regulations
- Community guidelines
- Respectful communication standards

**Prohibited content:**
- Illegal material
- Hate speech or harassment
- Spam or unsolicited advertising
- Malware or phishing links
- Adult or inappropriate content

Violations may result in:
- Message deletion
- IP address blocking
- Report to authorities (if illegal)

---

## Quick Reference Card

### ✅ Checklist for Sending a Message

- [ ] Click "Go to Channel" and subscribe
- [ ] Enter name (2+ characters)
- [ ] Enter message (3+ characters)
- [ ] Click "Send Test Message"
- [ ] Wait for success notification
- [ ] Check Telegram channel for message

### ⚡ Keyboard Shortcuts

| Action | Shortcut |
|--------|----------|
| Submit form | `Enter` (when in form field) |
| Navigate fields | `Tab` / `Shift+Tab` |
| Click button | `Space` (when focused) |
| Refresh page | `Ctrl+R` / `Cmd+R` |
| Hard refresh | `Ctrl+Shift+R` / `Cmd+Shift+R` |

### 🐛 Quick Troubleshooting

| Problem | Quick Fix |
|---------|-----------|
| Button disabled | Check field validation errors |
| No success message | Wait 10 seconds, refresh Telegram |
| "Failed to send" | Wait 1 minute, try again |
| Form not loading | Hard refresh (Ctrl+Shift+R) |
| Can't see channel | Click "Go to Channel" button |

---

**Document Version:** 1.0
**Last Updated:** 2025-10-23
**For:** End Users
**Demo URL:** [Your deployment URL]
**Support:** [Your support contact]
