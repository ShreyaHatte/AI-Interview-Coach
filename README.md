# AI-Interview-Coach
AI Interview coach is an AI-powered interview preparation platform designed for students and fresh graduates. Using Google Gemini AI, the system generates realistic interview questions, analyzes user responses, and provides constructive feedback to improve interview performance, communication skills, and confidence.
# AI Interview Performance Coach 🎙️

An intelligent, voice-powered interview preparation platform that provides real-time coaching, and actionable feedback using **Google Gemini 1.5 Flash**.

---

## 🌟 The Vision
The AI Interview Performance Coach was developed to help job seekers overcome interview anxiety. By simulating a real HR interaction through voice, the app doesn't just ask questions—it acts as a mentor that analyzes responses and helps candidates refine their delivery using state-of-the-art AI.

## 🛠️ Google Technologies Used
* Gemini 1.5 Flash: High-speed, low-latency generative AI model used for real-time interview logic and coaching feedback.
* Google AI Studio:The development environment for the AI
* web Speech API (Chrome): Powers the seamless **Speech-to-Text** (candidate input) and **Text-to-Speech** (AI Coach response).
* Google Generative AI SDK: Official JavaScript SDK for secure model integration.



## ✨ Key Features
* Voice-First Interaction: Hands-free practice to simulate a real-world interview environment.
* Actionable Feedback: Receive specific "Improvement Tips".
* Secure Gateway: Simple login interface to manage user sessions.

## 🚀 Getting Started

### Prerequisites
* Google Chrome (Required for Web Speech API support)
* A Gemini API Key from [Google AI Studio](https://aistudio.google.com/)

### Installation
1.  Install Dependencies:
    ```bash
    npm install
    ```

2.  Set up API Key:
    Open `src/App.js` and replace the `API_KEY` placeholder with your actual key:
    ```javascript
    const API_KEY = "YOUR_GEMINI_API_KEY_HERE";
    ```

3.  Start the App:
    ```bash
    npm start
    ```

## 🧠 System Architecture
1.  Input: User speaks into the microphone (Web Speech API).
2.  Processing: Text is sent to the Gemini 1.5 Flash model with a "Coaching Prompt."
3.  Analysis: Gemini generates feedback,and the next question.
4.  Output: React updates the UI and the AI Coach speaks the response back to the user.

## 📅 Project Roadmap (Future Scope)
* Emotional Analysis: Using camera input to track facial expressions and confidence.
* Industry Tracks: Specialized tracks for DevOps, Marketing, and Data Science.
* Dashboard: Progress tracking graphs showing score improvements over time.

---
