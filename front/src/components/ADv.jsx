"use client";

import { useEffect, useState } from "react";
import "./Adv.css"; // same CSS you used in your original TSX component
import axios from "axios";

export default function ADv() {
  const [advice, setAdvice] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [glowEffect, setGlowEffect] = useState(false);

  const fetchAdvice = async () => {
    try {
      setIsLoading(true);
      setGlowEffect(true);

      // Optional delay for effect
      await new Promise((res) => setTimeout(res, 1200));

      const res = await axios.get("https://api.adviceslip.com/advice");
      setAdvice(res.data.slip.advice);
    } catch (err) {
      setAdvice("Wisdom unavailable right now. Try again later.");
      console.error(err.message);
    } finally {
      setIsLoading(false);
      setTimeout(() => setGlowEffect(false), 2000);
    }
  };

  useEffect(() => {
    fetchAdvice();
  }, []);

  return (
    <div className="container">
      <div className={`card ${glowEffect ? "card-glow" : ""}`}>
        {/* Background effects */}
        <div className="background-effects">
          <div className="orb orb-1"></div>
          <div className="orb orb-2"></div>
          <div className="orb orb-3"></div>
        </div>

        <div className="content">
          {/* Header */}
          <div className="header">
            <div className="title-container">
              <div className="icon brain-icon">🧠</div>
              <h1 className="title">Wisdom Oracle</h1>
              <div className="icon sparkle-icon">✨</div>
            </div>
            <p className="subtitle">Channeling cosmic insights from the digital realm</p>
          </div>

          {/* Advice */}
          <div className={`advice-container ${glowEffect ? "advice-glow" : ""}`}>
            <div className="corner-icon top-left">⚡</div>
            <div className="corner-icon top-right">✨</div>

            <div className="advice-content">
              {isLoading ? (
                <div className="loading-container">
                  <div className="loading-dots">
                    <div className="dot dot-1"></div>
                    <div className="dot dot-2"></div>
                    <div className="dot dot-3"></div>
                  </div>
                  <span className="loading-text">Channeling cosmic wisdom...</span>
                </div>
              ) : (
                <blockquote className="advice-text">"{advice}"</blockquote>
              )}
            </div>
          </div>

          {/* Button */}
          <div className="button-container">
            <button
              onClick={fetchAdvice}
              disabled={isLoading}
              className={`advice-button ${isLoading ? "disabled" : ""}`}
            >
              <div className="button-content">
                <span className="button-icon">🚀</span>
                <span className="button-text">TRANSMIT MORE WISDOM</span>
                <span className="button-icon">✨</span>
              </div>
            </button>
          </div>

          {/* Footer */}
          <div className="footer">
            <p>Powered by real-time advice & digital intuition</p>
          </div>
        </div>
      </div>
    </div>
  );
}
