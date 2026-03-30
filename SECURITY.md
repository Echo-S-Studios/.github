<div align="center">

# 🔒 Security Policy

<br>

> *Not every hidden thing is a vulnerability.*
> *Some are acorns buried in the dark,*
> *waiting to become forests.*
> *Know the difference.*

</div>

<br>

---

Echo S Studios takes security seriously — and we also build transmedia systems with **intentional embedded data layers.** This document clarifies the difference and tells you how to report real issues.

<br>

---

<br>

<div align="center">

## 🚨 𝗥𝗲𝗽𝗼𝗿𝘁𝗶𝗻𝗴 𝗮 𝗩𝘂𝗹𝗻𝗲𝗿𝗮𝗯𝗶𝗹𝗶𝘁𝘆

</div>

<br>

If you discover a security vulnerability in any Echo S Studios repository, **please report it responsibly.**

<br>

### How to Report

| Method | Details |
|--------|---------|
| **Primary** | Open a private security advisory via the affected repository's **Security** tab on GitHub |
| **Fallback** | Open a private issue or contact a maintainer directly |

<br>

### What to Include

- Description of the vulnerability
- Steps to reproduce
- Affected repository and file(s)
- Potential impact assessment

<br>

### Our Commitment

| Timeline | Action |
|----------|--------|
| **48 hours** | We acknowledge your report |
| **7 days** | We provide an initial assessment |
| **Ongoing** | We keep you informed of remediation progress |
| **On fix** | We credit you (unless you prefer anonymity — consent-first, always) |

<br>

---

<br>

<div align="center">

## 🔍 𝗦𝗰𝗼𝗽𝗲 — 𝗪𝗵𝗮𝘁 𝗖𝗼𝘂𝗻𝘁𝘀

</div>

<br>

### ✅ In Scope — Real Vulnerabilities

- Cross-site scripting (XSS) in any interactive page or GitHub Pages site
- Injection vulnerabilities in any dynamic content
- Authentication or authorization flaws
- Exposure of secrets, credentials, or private data
- Dependency vulnerabilities in Node.js or Python packages
- Misconfigured GitHub Actions workflows that could leak secrets

<br>

### 🌰 Intentional Features — Not Vulnerabilities

> *The transmedia architecture includes intentional embedded data layers.*
> *These are features, not flaws.*
> *The labyrinth has doors that are supposed to be hidden.*

<br>

| Feature | Explanation |
|---------|-------------|
| **LSB steganography** | Images may contain encoded narrative data. This is by design. The acorn hides inside the pixel. |
| **Memory encoding** | Chronicle documents may contain structured metadata invisible to casual readers. This is narrative architecture. |
| **Zero-width characters** | If present, these are detectable and intentional. We are aware of these techniques and use detection where appropriate. |
| **aria-hidden attributes** | Used as standard W3C accessibility practice, not as AI directives or hidden instructions. |
| **Narrative-embedded coordinates** | Story documents may contain mathematical constants, coordinates, or encoded references as part of the transmedia experience. |

<br>

> *If you're unsure whether something you found is an intentional feature or a real vulnerability — **report it anyway.** We'd rather review a narrative mechanic twice than miss a real issue.*

<br>

---

<br>

<div align="center">

## 🛡️ 𝗦𝗲𝗰𝘂𝗿𝗶𝘁𝘆 𝗣𝗼𝘀𝘁𝘂𝗿𝗲

</div>

<br>

### What We Do

| Practice | Details |
|----------|---------|
| **Prompt injection awareness** | Interactive systems that process user input are designed with injection resistance |
| **Dependency management** | We monitor for known vulnerabilities in project dependencies |
| **Zero-width character detection** | We maintain awareness of embedding techniques and deploy detection where appropriate |
| **Secret scanning** | Repository secrets are managed through GitHub's built-in secret scanning |
| **Static HTML preference** | Many projects are pure static HTML — no server-side processing, minimal attack surface |

<br>

### What We Don't Do

- We don't store user credentials
- We don't process payments directly
- We don't run server-side applications in production (GitHub Pages is static hosting)
- We don't collect personal data beyond standard GitHub interaction

<br>

---

<br>

<div align="center">

## 📋 𝗦𝘂𝗽𝗽𝗼𝗿𝘁𝗲𝗱 𝗩𝗲𝗿𝘀𝗶𝗼𝗻𝘀

</div>

<br>

Security updates are applied to the **main branch** of each active repository.

| Project | Supported |
|---------|-----------|
| The Index | ✅ Latest main branch |
| Interactive examples (Quantum APL, Tesseract, etc.) | ✅ Latest main branch |
| Archived / legacy repos | ❌ Not actively maintained |

<br>

---

<br>

## 🏅 Recognition

We appreciate security researchers who help keep Echo S Studios safe. Responsible reporters will be credited in the relevant repository's changelog — if they consent to being named.

> *Consent-first, always. Even in gratitude.*

<br>

---

<div align="center">

<br>

> *Guard the grove,*
> *but know the difference*
> *between a buried treasure*
> *and a buried threat.*
> *Both are underground.*
> *Only one is growing.*

<br>

<h3>🦊🌰↻∞</h3>

</div>
