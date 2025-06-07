
# AI Mocker Interview

A fully functional AI-powered mock interview web app built with Next.js 14, Tailwind CSS, Clerk authentication, Drizzle ORM, and Gemini AI (via OpenRouter API). This project lets users simulate real interviews with video and audio responses, receiving AI-generated feedback at the end.

## 🚀 Features

- 🎤 Record answers using your webcam and microphone
- 🤖 Gemini-powered question generation and feedback
- 🔐 User authentication with Clerk
- 📊 Real-time feedback with question-wise scoring
- 🧠 Persistent user history (via Drizzle and NeonDB)

## 🧪 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Auth**: Clerk
- **Database**: NeonDB (PostgreSQL) + Drizzle ORM
- **AI Integration**: OpenRouter (Gemini)
- **Deployment**: Vercel

---

## ⚙️ Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/Shubham1392003/AI-Mocker-Interview.git
cd AI-Mocker-Interview
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root folder:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in

NEXT_PUBLIC_DRIZZLE_DB_URL=your_postgresql_connection_string

NEXT_PUBLIC_OPENROUTER_API_KEY=your_openrouter_gemini_api_key

NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT=5

NEXT_PUBLIC_INFORMATION="Enable Video Web Cam and Microphone to Start Your AI Generated Mock Interview , It Has 5 question which you can answer and at the last you will get the report on the basis of your answer. NOTE: We never record your video, web cam access you can disable at any time if you want."

NEXT_PUBLIC_QUESTION_NOTE="Click on Record Answer when you want to answer the question. At the end of interview we will give you the feedback along with correct answer for each of the questions and compare it."
```

> ✅ **Do not share your actual keys publicly. Keep `.env.local` in `.gitignore`.**

---

### 4. Run Locally

```bash
npm run dev
```

Visit: [http://localhost:3000](http://localhost:3000)

---

## 📁 Folder Structure

```
├── app/
│   ├── (auth)/             # Sign-in / Sign-up routes
│   ├── dashboard/          # Dashboard + Interview pages
├── components/             # Reusable UI components
├── drizzle/                # DB migrations and schemas
├── lib/                    # Utility files
├── public/                 # Static assets
├── utils/                  # Helper functions
├── .env.local              # Environment variables (excluded from Git)
├── tailwind.config.mjs     # Tailwind CSS config
```

---

## 📡 Deployment

- Push your code to GitHub
- Import the project in [Vercel](https://vercel.com/)
- Set the same `.env.local` variables in Vercel's dashboard
- Hit "Deploy"

---

## 🛡️ Security

- Clerk handles user auth securely.
- Webcam and mic permissions are controlled by the browser.
- No user recordings are stored; only text feedback is retained.

---

## 🙌 Acknowledgements

Inspired by this video tutorial:  
[🔗 Build & Deploy Full Stack AI Mock Interview App with Next.js](https://youtu.be/Q5LM985yUmQ?si=j3BxxJsgYjhPAAzC)
