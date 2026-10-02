# CyberSafe AI

## Problem:
Users often lack the knowledge required to identify and respond safely to common cyber threats.

## Solution:
CyberSafe AI is an AI-powered web-based cybersecurity awareness assistant that analyzes user-described situations, identifies the relevant cybersecurity category, provides an awareness risk indicator, and generates simple defensive recommendations.

## Technology:
React + TypeScript + Tailwind CSS + Python Flask + OpenRouter LLM API.

## Outcome:
The system provides an accessible first layer of cybersecurity education and helps users recognize common threats and take safer actions.

## Real-World Cybersecurity Problem

Many ordinary internet users receive phishing messages, scam calls, suspicious links, fake login pages, malicious attachments, and social-engineering attempts but do not know how to identify them or what action to take. This lack of awareness can lead to credential theft, financial loss, account compromise, malware infection, privacy violations, and identity theft.

CyberSafe AI addresses this gap by offering a simple educational first layer of support. It helps users explain their situation in normal language and then explains the likely threat, warning signs, recommended actions, and preventive steps.

## Proposed Technology-Based Solution

CyberSafe AI is a practical technology-based solution built using:

- Python for the backend logic and request handling
- Flask for the web API layer
- React + TypeScript + Tailwind CSS for the interface
- OpenRouter AI API to generate clear, simple, educational cybersecurity guidance

The project connects a real-world problem to a simple educational technology solution: a user describes an online situation, the system detects the likely cyber topic, estimates awareness risk, and replies with defensive guidance that is easier for non-technical users to understand.

## System Architecture

User
↓
Web Interface
↓
Python Flask Backend
↓
Cybersecurity Analysis
↓
OpenRouter AI
↓
Cybersecurity Guidance

## Key Features

- AI cybersecurity chat for everyday user questions
- Keyword-based cybersecurity topic detection
- Awareness risk indicator with simple rule-based scoring
- Scenario cards for common online threats
- Security checklist for safer everyday behavior
- Defensive guidance with explanation, warning signs, actions, and prevention
- Beginner-friendly academic prototype with no complex deployment stack

## Security Considerations

- API key protection: the OpenRouter key is stored only in `backend/.env` and never exposed to the frontend.
- Input validation: messages are checked for emptiness and excessive length before being processed.
- Defensive AI behavior: the system prompt instructs the AI to provide educational guidance only and to refuse harmful instructions.
- No permanent storage of personal conversations: this prototype does not save user chat history.
- Safe cybersecurity guidance: responses are designed to help users react safely rather than exploit systems.

## Limitations

- The chatbot does not verify whether a URL is actually malicious.
- It does not inspect the user's device.
- It does not replace professional incident response.
- AI responses may require verification from official sources or trusted support channels.

## Future Improvements

- Real malicious URL detection
- Email analysis
- QR code analysis
- ML-based scam detection
- Threat intelligence integration
- User awareness scoring
- Multilingual support

## Academic Assignment Alignment

This project follows the assignment requirement: "Students should select one real-world cyber security problem and propose a technology-based solution using Python / Machine Learning / Web Technology / Cryptography."

Selected problem:
Lack of cybersecurity awareness among ordinary internet users, leading to phishing, online scams, password theft, account compromise, malware infections, and unsafe online behavior.

Proposed solution:
An AI-powered cybersecurity awareness chatbot that provides simple, actionable, defensive guidance to users.

This connection is clearly demonstrated in the application:

Real-world problem → Technology solution → Cybersecurity awareness → User guidance → Measurable result

## Project Structure

```text
cybersafe-ai/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.tsx
│   │   │   ├── ChatWindow.tsx
│   │   │   ├── MessageBubble.tsx
│   │   │   ├── ChatInput.tsx
│   │   │   ├── ScenarioCards.tsx
│   │   │   ├── RiskBadge.tsx
│   │   │   └── SecurityChecklist.tsx
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   └── package.json
├── backend/
│   ├── app.py
│   ├── security_rules.py
│   ├── requirements.txt
│   ├── .env
│   └── .env.example
├── .gitignore
├── README.md
└── .venv/
```

## Setup Instructions

### 1. Put your OpenRouter API key in `backend/.env`

Create or update the file:

```bash
backend/.env
```

Add:

```env
OPENROUTER_API_KEY=your_key_here
OPENROUTER_MODEL=openai/gpt-4o-mini
```

Important:
- Do not put the key in the frontend.
- Do not commit the key to GitHub.
- Keep the key only in the Flask backend environment file.

### 2. Start the backend

```bash
cd /home/pooja/Downloads/cyber-project
source .venv/bin/activate
python backend/app.py
```

The backend runs at:

```text
http://localhost:5000
```

### 3. Start the frontend

Open a second terminal and run:

```bash
cd /home/pooja/Downloads/cyber-project/frontend
npm install
npm run dev -- --host 0.0.0.0
```

The frontend runs at:

```text
http://localhost:5173
```

### 4. Test the API connection

Check the backend status:

```bash
curl http://localhost:5000/api/health
```

Send a chat request:

```bash
curl -X POST http://localhost:5000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"I received a suspicious email."}'
```

## Demo Scenarios

### Demo 1
"I received an email saying my bank account will be closed today unless I click a link."

Expected category:
- 🎣 Phishing

Expected risk:
- 🔴 HIGH

### Demo 2
"How can I create a secure password?"

Expected category:
- 🔐 Password Security

Expected risk:
- 🟢 LOW

### Demo 3
"Someone called me claiming to be from my bank and asked for my OTP."

Expected category:
- 💳 Online Scam / Social Engineering

Expected risk:
- 🔴 HIGH

## Final Notes

This project is intentionally simple and academic. It demonstrates a real cybersecurity awareness problem, proposes a practical Python + web + AI solution, and delivers a clear user-facing experience that is suitable for a college cybersecurity project demo.
