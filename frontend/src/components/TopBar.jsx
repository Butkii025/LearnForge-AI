import React from 'react';
import { Cpu } from 'lucide-react';

export default function TopBar({ currentTab, track }) {
  const getTabName = () => {
    switch (currentTab) {
      case 'dashboard': return 'Dashboard Overview';
      case 'tutor': return 'AI Conceptual Tutor';
      case 'quiz': return 'Adaptive Assessment Board';
      case 'planner': return 'Personalized Study Roadmap';
      case 'codereview': return 'Code Review Terminal & Sandbox';
      case 'analytics': return 'Performance Charts & Graph Dependency Maps';
      default: return 'LearnForge AI';
    }
  };

  return (
    <header style={{
      height: '64px',
      backgroundColor: '#1A1A2E',
      borderBottom: '1px solid #2C2C4E',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 24px',
      flexShrink: 0
    }}>
      {/* Title */}
      <h2 style={{
        fontSize: '16px',
        fontWeight: 600,
        color: '#E2E8F0',
        fontFamily: "'Outfit', sans-serif"
      }}>
        {getTabName()}
      </h2>

      {/* Badges & System Metrics */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {/* Track indicator badge */}
        <span className="badge" style={{
          backgroundColor: 'rgba(99, 102, 241, 0.1)',
          borderColor: 'rgba(99, 102, 241, 0.3)',
          color: '#6366F1',
          padding: '6px 12px',
          fontWeight: 600
        }}>
          🎓 Track: {track}
        </span>

        {/* Ollama Gemma 3 Indicator */}
        <span className="badge badge-success" style={{
          padding: '6px 12px',
          fontWeight: 600
        }}>
          <Cpu size={14} /> Gemma 3 · Running Locally
        </span>
      </div>
    </header>
  );
}
