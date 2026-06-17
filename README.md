# NGXSMK Wallet

**Privacy-first, fully local Digital Identity, Secrets, Password & Secure Document Manager**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Tauri](https://img.shields.io/badge/Tauri-v2-FFC107?logo=tauri&logoColor=white)](https://tauri.app/)
[![Rust](https://img.shields.io/badge/Rust-1.75+-black?logo=rust&logoColor=white)](https://www.rust-lang.org/)
[![React](https://img.shields.io/badge/React-19-blue?logo=react&logoColor=white)](https://react.dev/)
[![Platform](https://img.shields.io/badge/Platform-Windows%20%7C%20macOS%20%7C%20Linux-brightgreen)](https://github.com/NGXSMK/ngxsmk-wallet)
[![Security](https://img.shields.io/badge/Security-Zero--Knowledge-success.svg)](https://github.com/NGXSMK/ngxsmk-wallet)

NGXSMK Wallet is an advanced, **zero-knowledge, offline-first secure desktop vault** designed to keep your digital identity, passwords, credentials, secrets, and private documents completely encrypted and under your exclusive control. Built using modern technologies like **Tauri v2**, **Rust**, and **React 19**, it ensures absolute privacy by storing all vault data locally on your device with no cloud dependencies, no telemetry, and no tracking.

## Why Choose NGXSMK Wallet?

Many password managers today force your data into the cloud, while local alternatives often suffer from outdated, clunky interfaces. NGXSMK Wallet brings the best of both worlds:
- 🚫 **No Forced Cloud & Zero Telemetry**: Unlike Bitwarden or 1Password, your vault is entirely offline. Your data stays on your machine, period.
- ⚡ **Blazing Fast & Lightweight**: Written in Rust using Tauri, it uses a fraction of the memory that Electron-based apps consume, while delivering a modern, beautiful interface.
- 🛡️ **More Than Just Passwords**: We go beyond simple logins. Manage your FIDO2 Passkeys, Identity Documents, SSH Keys, and encrypted files all in one secure place.
- 🔍 **Built-in Local Secret Scanner**: Proactively scan your system and directories to find accidentally exposed credentials or API keys before they become a problem.
- 💸 **No Subscriptions**: Take back ownership of your digital identity without monthly fees.

---

## Table of Contents

- [Why Choose NGXSMK Wallet?](#why-choose-ngxsmk-wallet)
- [Features](#features)
  - [Password Management](#password-management)
  - [Passkeys & WebAuthn](#passkeys--webauthn)
  - [Secure Documents](#secure-documents)
  - [Identity Records](#identity-records)
  - [Multi-Factor Authentication (TOTP)](#multi-factor-authentication-totp)
  - [Security Dashboard](#security-dashboard)
  - [Local Secret Scanner](#local-secret-scanner)
  - [Backup & Recovery](#backup--recovery)
  - [Import & Export](#import--export)
  - [Platform Security](#platform-security)
- [Architecture](#architecture)
- [System Requirements](#system-requirements)
- [Download](#download)
- [Quick Start](#quick-start)
- [Building from Source](#building-from-source)
- [Security](#security)
- [License](#license)
- [About NGXSMK](#about-ngxsmk)

---

## Features

NGXSMK Wallet provides all the standard capabilities of traditional local password managers (like KeePass) out-of-the-box—such as auto-typing, clipboard clearing, and database portability—while adding next-generation features that modern users expect.

### 🔐 Next-Gen Password & Secret Management
- **Military-Grade Security:** AES-256-GCM encryption with Argon2id memory-hard key derivation.
- **Multiple Entry Types:** Passwords, Secure Notes, API Keys, SSH Keys, Database Credentials, Software Licenses, and custom fields.
- **Advanced Password Generator:** Cryptographically strong random password generator with customizable character sets and strength estimation.
- **Organized Vault:** Nested folders, favorites, tagging, and lightning-fast global search (`Ctrl+K`).
- **Global Auto-Type & Drag-and-Drop:** Seamlessly inject credentials into other applications without revealing them.

### 🔑 Passkeys & WebAuthn (FIDO2)
- Native management of FIDO2/WebAuthn passkeys (no plugins required).
- Store, view, and organize passkey metadata securely alongside traditional passwords.

### ⏱️ Built-in Authenticator (TOTP)
- Integrated TOTP (Time-based One-Time Password) management.
- Live code generation with a visual countdown timer.
- Easy QR code scanning and setup.

### 📄 Secure Documents & Identity Records
- **Encrypted File Attachments:** Attach files directly to entries with secure, versioned in-app storage.
- **Digital Identity Wallet:** Store and categorize Passports, National IDs, Driver's Licenses, and Insurance records.

### 🛡️ Proactive Security & Dashboard
- **Breach Monitoring:** Have I Been Pwned (HIBP) API integration to alert you of compromised accounts.
- **Vault Health Scoring:** Automatic detection of weak, reused, or aging passwords.
- **Local Secret Scanner:** Built-in scanner to detect accidentally exposed API keys or tokens in your local filesystem or environment variables.

### 🔄 Backup, Sync & Recovery
- **No-Hassle Cloud Sync:** Built-in support to securely sync encrypted vaults via Google Drive, Dropbox, or OneDrive (no third-party plugins needed).
- **Shamir's Secret Sharing:** Split your master recovery key into multiple pieces for secure distributed backup.
- **Automated Backups:** Scheduled encrypted backups using Zstd compression.

### 📥 Seamless Import & Export
- Import from Bitwarden, 1Password, KeePass (CSV/XML), Google Chrome, and Microsoft Edge.
- Export your entire vault or specific folders to encrypted JSON or CSV formats.

### 💻 Advanced Platform Security
- **Biometric Unlock:** Windows Hello, Touch ID, and Linux biometric integration.
- **Secure Memory:** Cryptographic material is zeroed out upon locking or exiting.
- **Clipboard Protection:** Secure clipboard handling with auto-clearing after a timeout.
- **Anti-Tampering:** Anti-devtools detection and Strict Content Security Policy.
- **Portable Mode:** Run entirely from a USB stick without installation.

### User Experience
- Dark, Light, and System themes
- Accent color customization
- Compact sidebar mode
- Global command palette (`Ctrl+K` / `Cmd+K`)
- Keyboard shortcuts

---

## Architecture

```
┌─────────────────────────────────────────────────────┐
│                    Desktop Shell                     │
│                    Tauri v2                          │
├──────────────────────┬──────────────────────────────┤
│    Frontend (React)  │    Backend (Rust)             │
│                      │                              │
│  · React 19          │  · Tauri Commands            │
│  · TypeScript        │  · Services Layer            │
│  · Tailwind CSS      │  · Crypto Engine             │
│  · Radix UI          │  · Vault Engine              │
│  · Zustand           │  · SQLite (SQLx)             │
│  · TanStack Query    │  · AES-256-GCM / Argon2      │
│  · Framer Motion     │  · Shamir's Secret Sharing   │
└──────────────────────┴──────────────────────────────┘
         │                        │
         └──────── IPC ───────────┘
              (Tauri Commands)
```

### Tech Stack

| Layer | Technology |
|---|---|
| Desktop Framework | Tauri v2 |
| Frontend | React 19, TypeScript, Tailwind CSS, Radix UI, Zustand |
| Backend | Rust, Tokio, SQLx, Serde |
| Database | SQLite (local, auto-created) |
| Cryptography | AES-256-GCM, ChaCha20Poly1305, Argon2, HKDF, HMAC, SHA-2 |
| Authentication | Master password + Windows Hello biometrics |
| Secret Sharing | Shamir's Secret Sharing |
| Backup | Zstd compression, encrypted export, cloud sync (OAuth2) |

---

## System Requirements

| Platform | Minimum | Recommended |
|---|---|---|
| **Windows** | Windows 10 1803+ | Windows 11 |
| **macOS** | macOS 10.15+ | macOS 14+ |
| **Linux** | WebKit2GTK 4.1+ | Ubuntu 22.04+ / Fedora 38+ |
| **RAM** | 512 MB | 2 GB |
| **Storage** | 200 MB | 500 MB |

---

## Download

You can always find the latest stable version of NGXSMK Wallet for your operating system on our Releases page.

[![Download Latest Release](https://img.shields.io/github/v/release/NGXSMK/ngxsmk-wallet?label=Download%20Latest%20Version&style=for-the-badge&color=success)](https://github.com/NGXSMK/ngxsmk-wallet/releases/latest)

| Platform | Available Formats |
|---|---|
| **Windows** | `.msi`, `.exe` |
| **macOS** | `.dmg`, `.app` |
| **Linux** | `.AppImage`, `.deb` |

👉 **[View All Releases and Changelogs](https://github.com/NGXSMK/ngxsmk-wallet/releases)**

---

## Quick Start

1. **Download** the installer for your platform from the links above
2. **Install** and launch NGXSMK Wallet
3. **Create** your master password on first run
4. **Save** your recovery key in a safe place
5. **Start** adding your passwords, identities, and documents

All data is stored locally in your platform's app data directory. Your master password is the only key.

---

## Building from Source

Building from source requires the Rust backend which is proprietary. Pre-built binaries are the recommended way to use NGXSMK Wallet.

If you have a licensed backend, see [BUILDING.md](./BUILDING.md) for instructions.

---

## Security

NGXSMK Wallet is designed with security as the primary concern:

- **Zero-knowledge architecture** — encryption keys are derived from your master password at runtime and never stored
- **AES-256-GCM** — all vault data encrypted at rest
- **Argon2id** — memory-hard key derivation resists GPU/ASIC attacks
- **Secure memory** — cryptographic material zeroed on lock/exit
- **Constant-time operations** — mitigates timing side-channel attacks
- **Offline-first** — no network requests, no telemetry, no cloud dependence

Found a vulnerability? Contact **[ngxsmk@gmail.com](mailto:ngxsmk@gmail.com)**

---

## License

- **Frontend (React/TypeScript):** MIT License
- **Backend (Rust):** Proprietary — All Rights Reserved

See [LICENSE](./LICENSE) for full terms.

---

## About NGXSMK

NGXSMK builds privacy-first tools for individuals and organizations who value digital sovereignty. Learn more at [ngxsmk.com](https://ngxsmk.com).
