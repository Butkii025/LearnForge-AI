import React, { useState } from 'react';
import useAgent from '../hooks/useAgent';

export default function CodeReview({ onActivityLogged }) {
  const [code, setCode] = useState("def calculate_sum(n):\n    total = 0\n    for i in range(n):\n        total += i\n    print(f'Total sum: {total}')\n    return total\n\ncalculate_sum(100)");
  const [language, setLanguage] = useState('python');
  const [reviewResult, setReviewResult] = useState(null);
  const { queryAgent, loading, error } = useAgent();

  const handleReview = async () => {
    if (!code.trim()) return;
    setReviewResult(null);
    try {
      const res = await queryAgent('review', code, { language });
      if (res.output) {
        setReviewResult(res.output);
        if (onActivityLogged) {
          onActivityLogged(); // Sync activity timelines
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Code Editor and Language selections */}
      <div className="grid-cols-2" style={{ gridTemplateColumns: '3fr 2fr' }}>
        
        {/* Code Input Card */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', justify: 'space-between', alignItems: 'center' }}>
            <h3 style={{ color: '#FFFFFF', fontSize: '15px' }}>💻 Code Editor</h3>
            <div style={{ width: '120px' }}>
              <select value={language} onChange={(e) => setLanguage(e.target.value)}>
                <option value="python">Python</option>
                <option value="javascript">JavaScript</option>
                <option value="sql">SQL</option>
              </select>
            </div>
          </div>

          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            style={{
              fontFamily: "'Courier New', Courier, monospace",
              fontSize: '13px',
              height: '300px',
              backgroundColor: '#0F0F1A',
              color: '#10B981',
              border: '1px solid #2C2C4E',
              borderRadius: '8px',
              padding: '16px',
              resize: 'none',
              lineHeight: '1.5'
            }}
            disabled={loading}
          />

          <button
            onClick={handleReview}
            disabled={loading || !code}
            className="btn btn-primary"
            style={{ width: '100%' }}
          >
            {loading ? 'Analyzing & Running Sandbox Subprocess...' : 'Analyze Code & Run'}
          </button>
          
          {error && (
            <div className="badge badge-danger" style={{ padding: '10px', borderRadius: '6px' }}>
              ⚠️ {error}
            </div>
          )}
        </div>

        {/* Review Results Card */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '15px', overflowY: 'auto' }}>
          <h3 style={{ color: '#FFFFFF', fontSize: '15px' }}>🔍 Code Review & Execution</h3>
          
          {loading ? (
            <div style={{ color: '#94A3B8', fontSize: '13px', padding: '20px 0', textAlign: 'center' }}>
              🔄 CodeReviewAgent is linting code & running subprocess sandbox...
            </div>
          ) : reviewResult ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px' }}>
              
              {/* Correctness */}
              <div style={{ borderBottom: '1px solid #2C2C4E', paddingBottom: '8px' }}>
                <b style={{ color: '#6366F1', display: 'block', marginBottom: '2px' }}>✅ Correctness</b>
                <span style={{ color: '#E2E8F0' }}>{reviewResult.correctness}</span>
              </div>

              {/* Time Complexity */}
              <div style={{ borderBottom: '1px solid #2C2C4E', paddingBottom: '8px' }}>
                <b style={{ color: '#6366F1', display: 'block', marginBottom: '2px' }}>⏳ Complexity</b>
                <span style={{ color: '#E2E8F0' }}>{reviewResult.complexity}</span>
              </div>

              {/* Style Check */}
              <div style={{ borderBottom: '1px solid #2C2C4E', paddingBottom: '8px' }}>
                <b style={{ color: '#6366F1', display: 'block', marginBottom: '2px' }}>🎨 Style & Best Practice</b>
                <span style={{ color: '#E2E8F0' }}>{reviewResult.style}</span>
              </div>

              {/* Suggestion */}
              <div style={{ borderBottom: '1px solid #2C2C4E', paddingBottom: '8px' }}>
                <b style={{ color: '#6366F1', display: 'block', marginBottom: '2px' }}>💡 Suggestion</b>
                <span style={{ color: '#E2E8F0' }}>{reviewResult.suggestion}</span>
              </div>

              {/* Sandbox Run Output terminal */}
              <div>
                <b style={{ color: '#10B981', display: 'block', marginBottom: '6px' }}>🖥️ Subprocess Sandbox Console:</b>
                <pre style={{
                  backgroundColor: '#0F0F1A',
                  border: '1px solid #2C2C4E',
                  borderRadius: '6px',
                  padding: '12px',
                  fontSize: '11px',
                  fontFamily: 'monospace',
                  color: reviewResult.sandbox_success ? '#10B981' : '#EF4444',
                  whiteSpace: 'pre-wrap',
                  overflowX: 'auto'
                }}>
                  {reviewResult.sandbox_output}
                </pre>
              </div>

            </div>
          ) : (
            <div style={{ color: '#94A3B8', textAlign: 'center', marginTop: '100px', fontSize: '13px' }}>
              Write your script, select the language, and click analyze to review metrics and execute code inside the sandboxed process runner.
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
