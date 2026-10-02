import os
import requests
from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv

from security_rules import build_response_payload

load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '.env'))

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

API_KEY = os.getenv("OPENROUTER_API_KEY", "")
MODEL_NAME = os.getenv("OPENROUTER_MODEL", "openai/gpt-4o-mini")
OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions"
MAX_MESSAGE_LENGTH = 500

SYSTEM_PROMPT = """You are CyberSafe AI, a cybersecurity awareness assistant for ordinary internet users.

Your job is to help people understand common cyber threats in simple, practical language.
You must:
- Use simple English and avoid unnecessary technical jargon.
- Explain what is happening in a way the average user can understand.
- Identify warning signs and safe actions.
- Give practical prevention advice.
- Recommend contacting banks, platform support, or trusted professionals when appropriate.
- Clearly explain that you are providing general educational guidance, not confirmation that a real account, device, email, or link is actually malicious.

Do not provide instructions for:
- Credential theft
- Malware creation
- Phishing attacks
- Account takeover
- Bypassing authentication
- Attacking real systems
- Evading security systems
- Stealing personal information

If a user asks for harmful or malicious guidance, redirect them toward defensive cybersecurity education.

Always format the answer in a helpful educational structure:
1. What is happening?
2. Warning signs
3. What you should do
4. Prevention

Keep the answer short, clear, and actionable.
"""


@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({"status": "ok"})


@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.get_json(silent=True) or {}
    message = (data.get('message') or '').strip()

    if not message:
        return jsonify({
            "error": "Please enter a cybersecurity question.",
            "response": "Please enter a cybersecurity question.",
            "category": "General Cybersecurity",
            "risk": "LOW"
        }), 400

    if len(message) > MAX_MESSAGE_LENGTH:
        return jsonify({
            "error": "Your message is too long. Please keep it under 500 characters.",
            "response": "Your message is too long. Please keep it under 500 characters.",
            "category": "General Cybersecurity",
            "risk": "MEDIUM"
        }), 400

    ai_payload = build_response_payload(message)
    category = ai_payload["category"]
    risk = ai_payload["risk"]

    if not API_KEY:
        return jsonify({
            "error": "CyberSafe AI is temporarily unavailable. The OpenRouter API key is missing.",
            "response": "CyberSafe AI is temporarily unavailable. Please add your OpenRouter API key in backend/.env and try again.",
            "category": category,
            "risk": risk
        }), 503

    try:
        headers = {
            "Authorization": f"Bearer {API_KEY}",
            "Content-Type": "application/json",
            "HTTP-Referer": "http://localhost:5173",
            "X-Title": "CyberSafe AI"
        }

        payload = {
            "model": MODEL_NAME,
            "messages": [
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": message}
            ],
            "temperature": 0.5,
            "max_tokens": 350
        }

        response = requests.post(OPENROUTER_URL, headers=headers, json=payload, timeout=25)

        if response.status_code != 200:
            return jsonify({
                "error": "CyberSafe AI is temporarily unavailable. Please try again.",
                "response": "CyberSafe AI is temporarily unavailable. Please try again.",
                "category": category,
                "risk": risk
            }), 502

        data = response.json()
        content = data.get("choices", [{}])[0].get("message", {}).get("content")

        if not content or not isinstance(content, str):
            return jsonify({
                "error": "CyberSafe AI could not generate a valid response.",
                "response": "CyberSafe AI could not generate a valid response. Please try again.",
                "category": category,
                "risk": risk
            }), 502

        return jsonify({
            "response": content.strip(),
            "category": category,
            "risk": risk
        })

    except requests.exceptions.Timeout:
        return jsonify({
            "error": "The request timed out. Please try again.",
            "response": "CyberSafe AI is temporarily unavailable. Please try again.",
            "category": category,
            "risk": risk
        }), 504
    except requests.exceptions.RequestException:
        return jsonify({
            "error": "A network error occurred while contacting the AI service.",
            "response": "CyberSafe AI is temporarily unavailable. Please try again.",
            "category": category,
            "risk": risk
        }), 502


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
