import re
from typing import Dict, List, Tuple

KEYWORDS = {
    "Phishing": [
        "phishing", "suspicious email", "bank account will be closed", "click a link",
        "fake login", "password reset", "urgent action", "verify my account",
        "otp", "one time password", "login link", "email claiming", "blocked account",
        "suspicious message", "fake website", "impersonation", "urgent payment", "claim prize"
    ],
    "Password Security": [
        "password", "passcode", "strong password", "create a secure password",
        "password manager", "change password", "password safety", "reuse password", "unique password"
    ],
    "Account Security": [
        "account hacked", "someone accessed my account", "account compromise", "login activity",
        "security check", "recovery email", "two factor", "mfa", "locked out", "unauthorized access"
    ],
    "Online Scams": [
        "scam", "fraud", "payment", "urgent payment", "bank transfer", "fake call", "impersonating",
        "request for money", "someone called", "fake investment", "refund scam", "gift card"
    ],
    "Malware": [
        "downloaded an unknown file", "malware", "virus", "attachment", "unknown attachment",
        "suspicious download", "file looked strange", "exe file", "malicious file", "infected computer"
    ],
    "Email Security": [
        "email", "mail", "spam", "sender", "unexpected email", "attachment in email", "email from bank"
    ],
    "Social Media Security": [
        "instagram", "facebook", "social media", "account was hacked", "someone messaged me",
        "fake profile", "profile takeover", "friend request", "dm", "direct message"
    ],
    "Privacy": [
        "privacy", "data leak", "personal information", "location", "share my data", "private information",
        "spying", "surveillance", "public wifi", "tracking"
    ],
    "Suspicious Links": [
        "clicked a link", "unknown link", "short link", "suspicious url", "opened a link",
        "tinyurl", "bit.ly", "malicious link", "unsafe website", "website looks fake"
    ],
    "QR Code Safety": [
        "qr code", "scan a qr", "qr code safety", "qr scam", "scan code", "quick response code"
    ],
    "General Cybersecurity": []
}

RISK_RULES: List[Tuple[str, List[str], str]] = [
    ("HIGH", ["otp", "bank", "urgent", "blocked", "click link", "code", "payment", "called me", "account hacked", "scan qr"], "HIGH"),
    ("MEDIUM", ["password", "email", "suspicious", "unknown", "downloaded", "login", "account", "social media", "privacy"], "MEDIUM"),
    ("LOW", ["how can i create a secure password", "safe password", "best practices", "what is phishing"], "LOW"),
]


def normalize_text(value: str) -> str:
    return re.sub(r"\s+", " ", value).strip().lower()


def detect_category(message: str) -> str:
    text = normalize_text(message)
    scores: Dict[str, int] = {category: 0 for category in KEYWORDS}

    for category, words in KEYWORDS.items():
        if not words:
            continue
        for word in words:
            if word in text:
                scores[category] += 1

    if not any(scores.values()):
        return "General Cybersecurity"

    best_category = max(scores, key=scores.get)
    if scores[best_category] == 0:
        return "General Cybersecurity"
    return best_category


def detect_risk(message: str) -> str:
    text = normalize_text(message)
    if any(term in text for term in ["otp", "bank", "blocked", "urgent payment", "account hacked", "called me", "scan qr"]):
        return "HIGH"
    if any(term in text for term in ["password", "email", "suspicious", "unknown", "downloaded", "account", "social media"]):
        return "MEDIUM"
    return "LOW"


def build_response_payload(message: str) -> Dict[str, str]:
    category = detect_category(message)
    risk = detect_risk(message)
    return {
        "category": category,
        "risk": risk,
    }
