<div align="center">

```
██╗     ███████╗ █████╗ ██████╗ ███╗   ██╗███████╗ ██████╗ ██████╗  ██████╗ ███████╗
██║     ██╔════╝██╔══██╗██╔══██╗████╗  ██║██╔════╝██╔═══██╗██╔══██╗██╔════╝ ██╔════╝
██║     █████╗  ███████║██████╔╝██╔██╗ ██║█████╗  ██║   ██║██████╔╝██║  ███╗█████╗  
██║     ██╔══╝  ██╔══██║██╔══██╗██║╚██╗██║██╔══╝  ██║   ██║██╔══██╗██║   ██║██╔══╝  
███████╗███████╗██║  ██║██║  ██║██║ ╚████║██║     ╚██████╔╝██║  ██║╚██████╔╝███████╗
╚══════╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝      ╚═════╝ ╚═╝  ╚═╝ ╚═════╝ ╚══════╝
```

### AI-powered study agent for every software engineering student

[![Python](https://img.shields.io/badge/Python-3.11+-3776AB?style=flat-square&logo=python&logoColor=white)](https://python.org)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=black)](https://reactjs.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.110-009688?style=flat-square&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![Google ADK](https://img.shields.io/badge/Google%20ADK-Multi--Agent-4285F4?style=flat-square&logo=google&logoColor=white)](https://google.github.io/adk-docs/)
[![MCP](https://img.shields.io/badge/MCP-Server-6366F1?style=flat-square)](https://modelcontextprotocol.io)
[![Railway](https://img.shields.io/badge/Deployed%20on-Railway-0B0D0E?style=flat-square&logo=railway&logoColor=white)](https://railway.app)
[![License](https://img.shields.io/badge/License-MIT-10B981?style=flat-square)](LICENSE)
[![Kaggle](https://img.shields.io/badge/Kaggle-Capstone%202026-20BEFF?style=flat-square&logo=kaggle&logoColor=white)](https://kaggle.com)

**[Kaggle Writeup](https://kaggle.com/competitions/vibecoding-agents-capstone-project/writeups/learnforge-ai-a-multi-agent-study-system-for-engi)** · **[Video Demo](#DemoVideo)**

---

*Built for the Google × Kaggle 5-Day AI Agents Intensive Capstone 2026*

</div>

---

## What is LearnForge?

LearnForge is an **AI study assistant** that helps software engineering students learn smarter. You pick your engineering track — CSE, IT, AI/ML, or Data Science — and four AI agents work together to tutor you, quiz you, plan your study schedule, and review your code.

The entire system runs **on your own computer** using Gemma 3 (a free local AI model). No internet required after setup. No API keys. No monthly fees.

> Think of it as having a personal AI tutor available 24/7 that knows exactly what you need to study next.

---

## Who is this for?

| Student type | What LearnForge helps with |
|---|---|
| CSE students | Data Structures, Algorithms, OS, DBMS, Networks, System Design |
| IT students | Networking, Cybersecurity, Cloud Computing, DevOps, Linux |
| AI/ML students | ML Theory, Deep Learning, NLP, LLMs, MLOps |
| Data Science students | Statistics, Pandas, SQL, EDA, Feature Engineering |

---

## How it works — simple version

```
You type a question or request
         ↓
Orchestrator Agent figures out what you need
         ↓
Sends your request to the right specialist agent
         ↓
┌─────────────┬──────────────┬──────────────┬───────────────┐
│ Tutor Agent │  Quiz Agent  │Planner Agent │Code Review    │
│             │              │              │Agent          │
│ Explains    │ Gives you    │ Builds your  │ Reads your    │
│ concepts    │ MCQ tests    │ weekly study │ code and      │
│ clearly     │ and tracks   │ plan         │ fixes it      │
│             │ weak areas   │              │               │
└─────────────┴──────────────┴──────────────┴───────────────┘
         ↓
Agents use tools (search papers, run your code, check your progress)
         ↓
Answer comes back to your browser
```

---

## Competition requirements — all 6 covered

This project was built for the Google × Kaggle Vibe Coding Capstone 2026. Here is exactly where each requirement is demonstrated:

| # | Requirement | What was built | Where to find it |
|---|---|---|---|
| 1 | **Multi-agent system (ADK)** | Orchestrator + 4 specialist agents built with Google ADK | `backend/agents/` |
| 2 | **MCP Server** | Local Python MCP server with 5 tools agents can call | `backend/mcp/server.py` |
| 3 | **Antigravity** | Entire project generated using Antigravity CLI agent | Video demo |
| 4 | **Security features** | JWT auth, prompt injection guard, sandboxed code execution, rate limiting | `backend/security/` |
| 5 | **Deployability** | Railway.app auto-deploy + Docker + one-command local setup | `railway.toml`, `Dockerfile` |
| 6 | **Agent skills (CLI)** | `learnforge-cli` with 4 working commands | `cli/learnforge_cli.py` |

---

## The 4 AI agents explained

### 1. Orchestrator Agent
This is the "brain" that receives your message, decides which specialist to send it to, and coordinates everything.

```
You: "Quiz me on transformers, I'm intermediate level"
  ↓
Orchestrator reads your message
  ↓
Decides → this needs the Quiz Agent
  ↓
Passes: topic=transformers, level=intermediate
  ↓
Quiz Agent takes over
```

### 2. Tutor Agent
Explains any concept in a way that actually makes sense. Always gives:
- A simple 2-sentence intuition first
- Key bullet points
- A worked example or code snippet
- One real-world application

### 3. Quiz Agent
Generates 4-option MCQs adapted to your level. Tracks which topics you keep getting wrong and focuses on those next time (spaced repetition).

### 4. Planner Agent
Builds you a personalised 7-day or 30-day study plan based on your track and your past quiz performance. If you're weak on a topic, it schedules more time there automatically.

### 5. Code Review Agent
Paste your Python, JavaScript, or SQL code. The agent runs it in a safe sandbox, checks for bugs, style issues, and time complexity, then gives you a fixed version.

---

## The MCP Server — tools the agents use

The MCP (Model Context Protocol) server is a local service that gives agents access to real tools, not just the language model.

```
MCP Server running locally on port 8001
│
├── search_arxiv(query)
│   → Searches academic papers so the Tutor Agent can cite real research
│
├── run_code_sandbox(code)
│   → Safely runs your code in an isolated box with a 10-second timeout
│
├── get_student_progress(student_id)
│   → Reads your quiz history from the local database
│
├── generate_quiz(topic, level, weak_areas)
│   → Asks Gemma 3 to create fresh MCQs tailored to your weak spots
│
└── get_concept_graph(topic, track)
    → Returns what topics you should learn before tackling this one
```

---

## Security — 4 layers of protection

```
Your message comes in
        ↓
① Rate limiting — max 20 messages/min so no one can spam the system
        ↓
② JWT authentication — you must be logged in with a valid token
        ↓
③ Prompt injection guard — strips attempts to hijack the AI with tricks
   Example: "ignore previous instructions" gets caught and removed
        ↓
④ Sandboxed code execution — your code runs in a locked box:
   - 10 second timeout (kills infinite loops)
   - 64MB RAM limit
   - No internet access from inside the sandbox
   - No file system access outside /tmp/sandbox
        ↓
Safe response sent back to you
```

---

## Project folder structure

```
learnforge-AI/
│
├── backend/                    ← Python server (FastAPI)
│   ├── agents/
│   │   ├── orchestrator.py     ← Routes your request to the right agent
│   │   ├── tutor_agent.py      ← Explains concepts
│   │   ├── quiz_agent.py       ← Generates and grades MCQs
│   │   ├── planner_agent.py    ← Builds study plans
│   │   └── code_review_agent.py← Reviews and fixes code
│   │
│   ├── mcp/
│   │   ├── server.py           ← MCP server (gives agents tools to use)
│   │   └── tools/
│   │       ├── arxiv_tool.py   ← Paper search
│   │       ├── sandbox_tool.py ← Safe code execution
│   │       ├── progress_tool.py← Read/write your progress DB
│   │       └── quiz_tool.py    ← MCQ generation via Gemma 3
│   │
│   ├── security/
│   │   ├── auth.py             ← Login tokens (JWT)
│   │   ├── sanitizer.py        ← Blocks prompt injection attacks
│   │   └── rate_limiter.py     ← Limits requests per minute
│   │
│   ├── db/
│   │   └── models.py           ← Database table definitions
│   │
│   ├── api/
│   │   └── routes.py           ← All API endpoints (/chat, /quiz, etc.)
│   │
│   ├── main.py                 ← Starts the FastAPI server
│   ├── requirements.txt        ← Python packages needed
│   └── Dockerfile              ← How to package the backend
│
├── frontend/                   ← React web app (what you see in browser)
│   └── src/
│       ├── components/
│       │   ├── HomeDashboard.jsx   ← Main page with project info
│       │   ├── TrackSelector.jsx   ← Pick CSE / IT / AI-ML / DS
│       │   ├── TutorChat.jsx       ← Chat with the AI tutor
│       │   ├── QuizMode.jsx        ← Take adaptive MCQ tests
│       │   ├── StudyPlanner.jsx    ← See your weekly study plan
│       │   ├── CodeReview.jsx      ← Paste code, get feedback
│       │   └── Analytics.jsx       ← See your progress charts
│       └── App.jsx                 ← Main app file
│
├── cli/
│   └── learnforge_cli.py       ← Command line tool (Agent skill)
│
├── .github/workflows/
│   └── deploy.yml              ← Auto-deploy to Railway on every push
│
├── docker-compose.yml          ← Run everything locally in one command
├── railway.toml                ← Railway deployment config
├── .env.example                ← Template for your environment variables
└── README.md                   ← This file
```

---

## Running locally on your computer

### What you need first

- **Python 3.11+** — download from https://python.org
- **Node.js 18+** — download from https://nodejs.org
- **Ollama** — download from https://ollama.ai (this runs the AI model)
- **Git** — download from https://git-scm.com

### Step 1 — Get the code

```bash
git clone https://github.com/Butkii025/learnforge-AI.git
cd learnforge-AI
```

### Step 2 — Set up your settings

```bash
cp .env.example .env
```

Open `.env` and fill it in:

```env
SECRET_KEY=make-up-any-long-random-string-here
OLLAMA_HOST=http://localhost:11434
DATABASE_URL=sqlite:///./db/progress.db
CORS_ORIGINS=http://localhost:3000
```

### Step 3 — Download the AI model

```bash
ollama pull gemma3
ollama serve
```

Leave this terminal running. Open a new one for the next steps.

### Step 4 — Start the backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate        # Windows
# source venv/bin/activate   # Mac/Linux
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

### Step 5 — Start the MCP server

Open another terminal:

```bash
cd backend
venv\Scripts\activate
python mcp/server.py
```

### Step 6 — Start the frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

### Step 7 — Open in browser

Go to **http://localhost:3000** — LearnForge is running!

### Shortcut — Docker (if you have Docker Desktop installed)

Instead of all the above steps, just run:

```bash
docker compose up
```

Then open **http://localhost:3000**

---

## CLI tool — use LearnForge from the terminal

```bash
pip install -e ./cli
```

Then you can run:

```bash
# Get a topic explained
learnforge study --topic "transformer attention mechanism" --track aiml

# Take a quiz
learnforge quiz --topic "backpropagation" --difficulty hard

# Generate a study plan
learnforge plan --goal "master MLOps in 30 days" --track aiml

# Get code reviewed
learnforge review --file my_model.py
```
---
# Screenshots
<img width="1900" height="973" alt="Screenshot 2026-06-26 024228" src="https://github.com/user-attachments/assets/547d25b2-0f3f-4e67-b073-4e7bfad10ea3" />
***
<img width="1842" height="738" alt="Screenshot 2026-06-26 195047" src="https://github.com/user-attachments/assets/bcd78213-cbb5-4e0a-93a3-77612b6853c0" />
***
<img width="1870" height="757" alt="Screenshot 2026-06-26 194816" src="https://github.com/user-attachments/assets/65109cab-73c9-4f5e-b0d5-95d730b8422d" />
***
<img width="1860" height="719" alt="Screenshot 2026-06-26 195124" src="https://github.com/user-attachments/assets/dfa4f398-644b-4f66-b4f1-b49f1554e7b3" />

---
# DemoVideo

https://github.com/user-attachments/assets/f5ad7c8e-f4a7-4958-b2c9-f847d22004d3

---

## Tech stack — what powers LearnForge

| Part | Technology | Why this was chosen |
|---|---|---|
| AI model | Gemma 3 via Ollama | Runs 100% locally, no internet or API key needed |
| Agent framework | Google ADK | Competition requirement, clean multi-agent pattern |
| Tool protocol | MCP Python SDK | Competition requirement, lets agents share tools |
| Backend | FastAPI + Python 3.11 | Fast, modern, great for streaming AI responses |
| Frontend | React 18 + Vite | Fast builds, great developer experience |
| Styling | Tailwind CSS | No CSS files to maintain |
| Database | SQLite + SQLAlchemy | Zero config, stores progress locally |
| Authentication | JWT (python-jose) | Secure, stateless, works on Railway |
| Deployment | Railway.app | Free tier, GitHub auto-deploy |
| CI/CD | GitHub Actions | Tests run automatically on every push |
| CLI | Python + argparse | Agent skills competition requirement |

---

## Why LearnForge is different

Most AI study tools are just a chatbot wrapper around GPT. LearnForge is different in three ways:

**1. It knows your discipline.** When you pick AI/ML as your track, every topic, quiz, study plan, and tutor response is calibrated for AI/ML. A CSE student gets completely different content.

**2. It actually remembers your progress.** Your quiz results are stored locally. The Quiz Agent reads them before generating questions, so it focuses on what you actually struggle with.

**3. It runs your code for real.** The Code Review Agent doesn't just read your code — it executes it in a sandbox and shows you the actual output alongside the feedback.

---

## Acknowledgements

- Google × Kaggle 5-Day AI Agents Intensive Course 2026
- Google ADK team for the multi-agent framework
- Ollama project for making local LLMs accessible
- MCP SDK contributors

---

## Developer

**Priynashu Vijay** — Built for Google × Kaggle Vibe Coding Capstone 2026

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---
