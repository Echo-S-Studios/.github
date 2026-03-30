# 🔒 Security Policy

> *Not every hidden thing is a vulnerability. Some are acorns.*

Echo S Studios takes security seriously — and we also build transmedia systems with intentional embedded data layers. This document clarifies the difference and tells you how to report real issues.

---

## Reporting a Vulnerability

If you discover a security vulnerability in any Echo S Studios repository, **please report it responsibly.**

**How to report:**
- Email: Open a private security advisory on the affected repository via GitHub's Security tab
- If the Security tab is unavailable, open a private issue or contact a maintainer directly

**What to include:**
- Description of the vulnerability
- Steps to reproduce
- Affected repository and file(s)
- Potential impact assessment

**Our commitment:**
- We will acknowledge your report within **48 hours**
- We will provide an initial assessment within **7 days**
- We will keep you informed of remediation progress
- We will credit you in the fix (unless you prefer anonymity)

---

## Scope — What Counts as a Vulnerability

### In Scope

- Cross-site scripting (XSS) in any interactive page or GitHub Pages site
- Injection vulnerabilities in any dynamic content
- Authentication or authorization flaws
- Exposure of secrets, credentials, or private data
- Dependency vulnerabilities in Node.js or Python packages
- Misconfigured GitHub Actions workflows that could leak secrets

### Intentional Features — Not Vulnerabilities

The transmedia architecture of Echo S Studios includes **intentional embedded data layers.** These are features, not security flaws:

- **LSB steganography** in visual assets — images may contain encoded narrative data. This is by design.
- **Memory encoding** in chronicle documents — text may contain structured metadata invisible to casual readers. This is narrative architecture.
- **Zero-width character patterns** — if present, these are detectable and intentional. We are aware of zero-width character techniques and use detection where appropriate.
- **aria-hidden attributes** — used as standard W3C accessibility practice, not as AI directives or hidden instructions.
- **Narrative-embedded coordinates** — story documents may contain mathematical constants, coordinates, or encoded references as part of the transmedia experience.

If you're unsure whether something you found is an intentional feature or a real vulnerability, **report it anyway.** We'd rather review a narrative mechanic twice than miss a real issue.

---

## Security Posture

### What We Do

- **Prompt injection awareness** — Interactive systems that process user input are designed with injection resistance in mind
- **Dependency management** — We monitor for known vulnerabilities in project dependencies
- **Zero-width character detection** — We maintain awareness of zero-width character embedding techniques and deploy detection where appropriate
- **Secret scanning** — Repository secrets are managed through GitHub's built-in secret scanning
- **Static HTML preference** — Many projects (The Index, visualizations) are pure static HTML with no server-side processing, minimizing attack surface

### What We Don't Do

- We don't store user credentials
- We don't process payments directly
- We don't run server-side applications in production (GitHub Pages is static hosting)
- We don't collect personal data beyond standard GitHub interaction

---

## Supported Versions

Security updates are applied to the **main branch** of each active repository. We do not maintain multiple release branches for most projects.

| Project | Supported |
|---------|-----------|
| The Index | ✅ Latest main branch |
| Interactive examples (Quantum APL, Tesseract, etc.) | ✅ Latest main branch |
| Archived / legacy repos | ❌ Not actively maintained |

---

## Recognition

We appreciate security researchers who help keep Echo S Studios safe. Responsible reporters will be credited in the relevant repository's changelog (if they consent to being named — consent-first, always).

---

*🦊🌰↻∞ — Guard the grove, but know the difference between a buried treasure and a buried threat.*
