# 0xOsama | Cybersecurity Blog

<div align="center">
  <img src="https://readme-typing-svg.demolab.com?font=Orbitron&weight=900&size=28&duration=3000&pause=1000&color=22d3ee;a855f7;f43f5e;10b981&center=true&vCenter=true&width=700&lines=Malware+Analysis;Digital+Forensics;Threat+Intelligence;Reverse+Engineering" alt="Typing SVG" />
  <p><i>Documenting the bits and bytes of the unknown. Exploring obfuscated code, kernel structures, and APT campaigns.</i></p>
</div>

---

## >_ About The Project

This repository hosts the personal blog and portfolio of **Mahmoud Osama** (0xOsama), a Security Engineer specializing in Malware Analysis and Digital Forensics.

The site is built as a **Single Page Application (SPA)** using **React 19**, designed with a heavy influence from "hacker" aesthetics, terminal interfaces, and cyberpunk visuals. It serves as a knowledge base for write-ups, tutorials, and research findings in the cybersecurity domain.

### [+] Core Topics
- **Malware Analysis:** Reverse engineering complex samples and ransomware.
- **CTF Writeups:** Detailed solutions for Capture The Flag challenges.
- **Threat Intelligence:** Reports on emerging threats and APT groups.
- **Digital Forensics:** Artifact analysis and incident response.

---

## [!] Features

- **Cyberpunk UI/UX:** Fully responsive design with a custom Matrix rain background and "glitch" effects.
- **Terminal Interactivity:** 
  - **CLI Search:** Use commands like `grep "ransomware" ./*` to search posts.
  - **Interactive Shell:** Typing support in 404 and About pages (simulated bash environment).
- **Theme System:** Robust Dark/Light mode switcher.
- **Automated Content Pipeline:** Blog posts are written in standard Markdown (`_posts/`) and automatically compiled into a JSON API during build time.
- **Git-Integrated:** Deployed seamlessly via GitHub Actions to GitHub Pages.

---

## [*] Built With

<div align="center">

![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)

</div>

---

## [cp] Open Source & Usage

This project is fully open-source. Feel free to clone, modify, and use the codebase for your own portfolio or blog.

> **Note:** The architecture (React, scripts, UI) is free to use. However, the content (articles in `_posts/`) makes up my personal portfolio. Please replace them with your own research!

---

## [$] Local Development

To run this blog locally on your machine:

1.  **Clone the repository**
    ```bash
    git clone https://github.com/OxOsama/0xOsama.github.io.git
    cd 0xOsama.github.io
    ```

2.  **Install Dependencies**
    ```bash
    npm ci
    # Note: Use --legacy-peer-deps if you encounter React version conflicts with lucide-react
    ```

3.  **Run Development Server**
    ```bash
    npm run dev
    ```
    The site will be available at `http://localhost:3000`.

4.  **Add Content**
    *   Create a new Markdown file in `_posts/` (e.g., `_posts/Analysis/2026-02-09-new-malware.md`).
    *   The build script `generate-posts.js` will automatically process it.

---

## [@] Deployment

This project uses **GitHub Actions** for automated deployment.

1.  Push changes to the `main` branch.
2.  The workflow in `.github/workflows/deploy.yml` triggers.
3.  It builds the React app and deploys the `dist/` folder to the `gh-pages` environment.

---

## [?] Contact

**Mahmoud Osama**

- **Role:** Security Engineer
- **LinkedIn:** [linkedin.com/in/0xosama](https://www.linkedin.com/in/0xosama/)
- **GitHub:** [github.com/OxOsama](https://github.com/OxOsama)
- **Email:** mahmoudosama_1@outlook.com

---

<div align="center">
  <sub>© 2026 0xOsama. System Integrity Verified.</sub>
</div>
