import React, { useState } from 'react';
import useAgent from '../hooks/useAgent';

export default function TutorChat({ track, onActivityLogged }) {
  const [topicInput, setTopicInput] = useState('');
  const [currentResponse, setCurrentResponse] = useState('');
  const { queryAgent, loading, error } = useAgent();

  const trackTopics = {
    'CSE': ['Data Structures', 'Algorithms', 'OS', 'DBMS', 'Networks', 'System Design'],
    'IT': ['Networking', 'Cybersecurity', 'Cloud Computing', 'DevOps', 'Linux'],
    'AI/ML': ['Linear Algebra', 'ML Algorithms', 'Deep Learning', 'NLP', 'MLOps', 'LLMs'],
    'Data Science': ['Statistics', 'Pandas', 'SQL', 'Visualisation', 'Feature Engineering', 'EDA']
  };

  const topics = trackTopics[track] || trackTopics['CSE'];

  const handleStudy = async (topicName) => {
    if (!topicName || !topicName.trim()) return;
    setCurrentResponse('');
    try {
      const res = await queryAgent('explain', topicName, { difficulty: 'Intermediate' });
      setCurrentResponse(res.output);
      if (onActivityLogged) {
        onActivityLogged(); // reload logs on dashboard
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Topics row for quick selection */}
      <div className="card">
        <h3 style={{ color: '#FFFFFF', marginBottom: '12px', fontSize: '15px' }}>
          Select a Quick Concept for {track} track:
        </h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {topics.map((t, i) => (
            <button
              key={i}
              onClick={() => {
                setTopicInput(t);
                handleStudy(t);
              }}
              className="btn btn-secondary"
              style={{ padding: '8px 14px', fontSize: '13px' }}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Input panel & Chat logs */}
      <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '20px', minHeight: '400px' }}>
        
        {/* Custom Input */}
        <div style={{ display: 'flex', gap: '12px' }}>
          <input
            type="text"
            placeholder="Type any software engineering or computer science concept (e.g. Backpropagation)..."
            value={topicInput}
            onChange={(e) => setTopicInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleStudy(topicInput)}
            disabled={loading}
          />
          <button
            onClick={() => handleStudy(topicInput)}
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? 'Consulting Agent...' : 'Ask Tutor'}
          </button>
        </div>

        {/* Error block */}
        {error && (
          <div className="badge badge-danger" style={{ padding: '12px', width: '100%', borderRadius: '8px' }}>
            ⚠️ {error}
          </div>
        )}

        {/* Tutor Output */}
        <div style={{
          flex: 1,
          background: 'rgba(255, 255, 255, 0.01)',
          border: '1px solid #2C2C4E',
          borderRadius: '8px',
          padding: '20px',
          overflowY: 'auto',
          fontSize: '14px',
          lineHeight: '1.6'
        }}>
          {loading ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', color: '#94A3B8' }}>
              <div>🔄 TutorAgent is formulating intuitive explanations...</div>
              <div style={{ width: '100%', height: '4px', backgroundColor: '#2C2C4E', borderRadius: '2px', overflow: 'hidden', position: 'relative' }}>
                <div style={{
                  position: 'absolute',
                  width: '40%',
                  height: '100%',
                  backgroundColor: '#6366F1',
                  animation: 'loadingProgress 1.5s infinite ease-in-out'
                }} />
              </div>
              <style>{`
                @keyframes loadingProgress {
                  0% { left: -40%; }
                  50% { left: 100%; }
                  100% { left: 100%; }
                }
              `}</style>
            </div>
          ) : currentResponse ? (
            <div style={{ whiteSpace: 'pre-wrap' }} className="tutor-output-content">
              {currentResponse}
            </div>
          ) : (
            <div style={{ color: '#94A3B8', textAlign: 'center', marginTop: '100px' }}>
              Select a quick concept card or type a custom topic to begin your lesson with the Tutor Agent.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
