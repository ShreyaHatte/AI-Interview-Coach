import React, { useState } from 'react';

const API_KEY = "AIzaSyAdJWptxrGLN1B-rRS-HaCEzyjPTbXjQfA"; 

function App() {
  // State for Login
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // State for Interview
  const [transcript, setTranscript] = useState('');
  const [aiResponse, setAiResponse] = useState("Welcome! I am your AI Coach. Click 'Start' to begin.");
  const [isListening, setIsListening] = useState(false);
  const [loading, setLoading] = useState(false);

  // --- Login Logic ---
  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      setIsLoggedIn(true);
    } else {
      alert("Please enter both Email and Password");
    }
  };

  // --- Voice & AI Logic ---
  const speak = (text) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  const getAIResponse = async (text) => {
    setLoading(true);
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;
      const coachingPrompt = `You are an AI Interview Coach. User said: "${text}". Provide: 1. Feedback, 2. Improvement tip, 3. Score/10, 4. Next Question. Keep it under 50 words.`;

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: coachingPrompt }] }] })
      });

      const data = await response.json();
      const responseText = data.candidates[0].content.parts[0].text;
      setAiResponse(responseText);
      speak(responseText);
    } catch (e) {
      setAiResponse("Coach: Good start! Try to be more specific. Next: What are your goals?");
      speak("Good start! Try to be more specific. Next: What are your goals?");
    } finally {
      setLoading(false);
    }
  };

  const handleMic = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (e) => {
      const speechText = e.results[0][0].transcript;
      setTranscript(speechText);
      getAIResponse(speechText);
    };
    recognition.onend = () => setIsListening(false);
    recognition.start();
  };

  // --- UI Rendering ---

  // 1. LOGIN PAGE UI
  if (!isLoggedIn) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <h1 style={styles.title}>Welcome!</h1>
          <p style={styles.subtitle}>Login to start your AI Interview coach</p>
          <form onSubmit={handleLogin}>
            <input 
              type="email" 
              placeholder="Email Address" 
              style={styles.input} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
            <input 
              type="password" 
              placeholder="Password" 
              style={styles.input} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
            <button type="submit" style={styles.button}>Login</button>
          </form>
        </div>
      </div>
    );
  }

  // 2. MAIN INTERVIEW PAGE UI
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>AI Interview Coach 🎙️</h1>
        <div style={styles.box}>
          <strong style={{ color: '#4285F4' }}>Analysis & Question:</strong>
          <p style={styles.text}>{loading ? "Thinking..." : aiResponse}</p>
        </div>
        <div style={{ ...styles.box, backgroundColor: '#e6f4ea' }}>
          <strong style={{ color: '#34A853' }}>Your Answer:</strong>
          <p style={styles.text}>{transcript || "Click start to speak..."}</p>
        </div>
        <button 
          onClick={handleMic} 
          disabled={isListening || loading}
          style={{ ...styles.button, backgroundColor: isListening ? '#ea4335' : '#4285F4' }}
        >
          {isListening ? "Listening..." : "Start Interview"}
        </button>
        <button onClick={() => setIsLoggedIn(false)} style={styles.logoutBtn}>Logout</button>
      </div>
    </div>
  );
}

// --- Professional Styles ---
const styles = {
  container: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f0f2f5', fontFamily: 'sans-serif' },
  card: { padding: '40px', borderRadius: '15px', backgroundColor: '#fff', boxShadow: '0 8px 24px rgba(0,0,0,0.1)', textAlign: 'center', width: '380px' },
  title: { fontSize: '24px', color: '#333', marginBottom: '10px' },
  subtitle: { fontSize: '14px', color: '#777', marginBottom: '25px' },
  input: { width: '100%', padding: '12px', marginBottom: '15px', borderRadius: '8px', border: '1px solid #ddd', boxSizing: 'border-box' },
  button: { width: '100%', padding: '12px', borderRadius: '30px', border: 'none', backgroundColor: '#4285F4', color: '#fff', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' },
  box: { textAlign: 'left', padding: '15px', borderRadius: '10px', backgroundColor: '#e8f0fe', marginBottom: '15px', minHeight: '80px' },
  text: { fontSize: '14px', marginTop: '5px', color: '#444' },
  logoutBtn: { marginTop: '15px', background: 'none', border: 'none', color: '#ea4335', cursor: 'pointer', textDecoration: 'underline' }
};

export default App;