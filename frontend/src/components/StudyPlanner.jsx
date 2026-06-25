import React, { useState } from 'react';
import useAgent from '../hooks/useAgent';

export default function StudyPlanner({ track, onActivityLogged }) {
  const [goal, setGoal] = useState('');
  const [planDays, setPlanDays] = useState([]);
  const { queryAgent, loading, error } = useAgent();

  const handleCreatePlan = async () => {
    if (!goal.trim()) return;
    setPlanDays([]);
    try {
      const res = await queryAgent('plan', goal, { track });
      if (res.output && Array.isArray(res.output)) {
        setPlanDays(res.output);
        if (onActivityLogged) {
          onActivityLogged(); // Sync dashboard activity feed
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const defaultGoals = {
    'CSE': 'Master System Design & Load Balancers',
    'IT': 'Prepare for AWS Certified Cloud Practitioner',
    'AI/ML': 'Build and Deploy Deep Learning Models (MLOps)',
    'Data Science': 'Master Feature Engineering and EDA'
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Target goals inputs */}
      <div className="card">
        <h3 style={{ color: '#FFFFFF', marginBottom: '12px', fontSize: '15px' }}>📅 Construct a Custom Study Roadmap</h3>
        <p style={{ color: '#94A3B8', fontSize: '13px', marginBottom: '16px' }}>
          Enter a target learning milestone. The PlannerAgent will scan your SQLite history, identify low-scoring quiz topics, and automatically prioritize them into a 7-day study timeline.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', gap: '12px' }}>
            <input
              type="text"
              placeholder={`e.g. ${defaultGoals[track] || 'Master MLOps in 30 days'}`}
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleCreatePlan()}
              disabled={loading}
            />
            <button
              onClick={handleCreatePlan}
              disabled={!goal || loading}
              className="btn btn-primary"
              style={{ flexShrink: 0 }}
            >
              {loading ? 'Compiling Plan...' : 'Generate Roadmap'}
            </button>
          </div>
          
          {/* Quick presets */}
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '11px', color: '#94A3B8' }}>Preset goals:</span>
            <button 
              onClick={() => setGoal(defaultGoals[track] || '')}
              style={{
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid #2C2C4E',
                color: '#6366F1',
                padding: '4px 8px',
                borderRadius: '4px',
                fontSize: '11px',
                cursor: 'pointer'
              }}
            >
              {defaultGoals[track] || 'Target'}
            </button>
          </div>
        </div>
      </div>

      {/* Timeline display */}
      <div className="card" style={{ minHeight: '350px' }}>
        {loading ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', color: '#94A3B8', marginTop: '100px', textAlign: 'center' }}>
            <div>🔄 PlannerAgent is mapping learning dependencies...</div>
          </div>
        ) : error ? (
          <div className="badge badge-danger" style={{ padding: '16px', borderRadius: '8px' }}>
            ⚠️ {error}
          </div>
        ) : planDays.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h3 style={{ color: '#FFFFFF', fontSize: '16px', borderBottom: '1px solid #2C2C4E', paddingBottom: '10px' }}>
              🎯 Study Roadmap: "{goal}"
            </h3>
            
            {/* Timeline track */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              paddingLeft: '20px',
              borderLeft: '2px solid #2C2C4E',
              marginLeft: '10px',
              position: 'relative'
            }}>
              {planDays.map((day, idx) => (
                <div key={idx} style={{ position: 'relative', marginBottom: '8px' }}>
                  {/* Timeline node circle */}
                  <div style={{
                    position: 'absolute',
                    left: '-27px',
                    top: '2px',
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    backgroundColor: day.topic.includes('RE-STUDY') ? '#EF4444' : '#6366F1',
                    border: '3px solid #1A1A2E'
                  }} />

                  {/* Day Content */}
                  <div>
                    <span style={{
                      fontSize: '11px',
                      color: day.topic.includes('RE-STUDY') ? '#EF4444' : '#10B981',
                      fontWeight: 700,
                      display: 'block'
                    }}>
                      DAY {day.day || idx + 1} ({day.time || '2 hours'})
                    </span>
                    <h4 style={{ color: '#FFFFFF', fontSize: '14px', margin: '2px 0 4px 0' }}>{day.topic}</h4>
                    <p style={{ color: '#94A3B8', fontSize: '12px', margin: 0 }}>
                      📖 <b>Materials:</b> {day.resource}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ color: '#94A3B8', textAlign: 'center', padding: '100px 0' }}>
            Submit a learning milestone to generate a structured 7-day chronological study timeline.
          </div>
        )}
      </div>
    </div>
  );
}
