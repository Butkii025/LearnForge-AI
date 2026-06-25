import React from 'react';
import TrackSelector from './TrackSelector';
import { 
  CheckCircle, 
  Settings, 
  HelpCircle, 
  Cpu, 
  BookOpen, 
  Calendar, 
  Code,
  Award,
  Clock,
  Layers
} from 'lucide-react';

export default function HomeDashboard({ 
  username, 
  track, 
  onTrackChange, 
  progress, 
  loadingProgress 
}) {
  
  // Track metrics mapping
  const trackMetrics = {
    'CSE': { topics: 6, quizzes: 18, graphNodes: 12 },
    'IT': { topics: 5, quizzes: 15, graphNodes: 10 },
    'AI/ML': { topics: 6, quizzes: 20, graphNodes: 15 },
    'Data Science': { topics: 6, quizzes: 18, graphNodes: 12 }
  };

  const currentMetrics = trackMetrics[track] || trackMetrics['CSE'];

  const agentCards = [
    { name: 'TutorAgent', icon: BookOpen, desc: 'Explains CS & AI concepts in depth', status: 'ready' },
    { name: 'QuizAgent', icon: HelpCircle, desc: 'Generates adaptive MCQ assessments', status: 'ready' },
    { name: 'PlannerAgent', icon: Calendar, desc: 'Builds weekly custom study timelines', status: 'ready' },
    { name: 'CodeReviewAgent', icon: Code, desc: 'Reviews code syntax & runs sandbox execution', status: 'ready' }
  ];

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* 1. HERO SECTION */}
      <div style={{
        background: 'linear-gradient(135deg, #1A1A2E 0%, #111126 100%)',
        border: '1px solid #2C2C4E',
        borderRadius: '12px',
        padding: '30px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '15px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
              <span style={{ fontSize: '32px' }}>🧠</span>
              <h1 style={{ fontSize: '28px', color: '#FFFFFF', margin: 0 }}>LearnForge Study Console</h1>
            </div>
            <p style={{ color: '#94A3B8', fontSize: '16px', maxWidth: '600px', marginBottom: '8px' }}>
              Your AI-powered study agent for software engineering.
            </p>
          </div>
          <span className="badge badge-success" style={{ padding: '8px 16px', fontSize: '13px' }}>
            <Cpu size={16} /> Gemma 3 · Running Locally via Ollama
          </span>
        </div>

        {/* Agent Cards Sub-Row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
          marginTop: '24px'
        }}>
          {agentCards.map((agent, i) => {
            const Icon = agent.icon;
            return (
              <div key={i} style={{
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid #2C2C4E',
                borderRadius: '8px',
                padding: '12px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <div style={{
                  background: 'rgba(99, 102, 241, 0.1)',
                  padding: '8px',
                  borderRadius: '6px',
                  color: '#6366F1'
                }}>
                  <Icon size={18} />
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <h4 style={{ margin: 0, fontSize: '13px', color: '#E2E8F0' }}>{agent.name}</h4>
                    <span style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: '#10B981',
                      display: 'inline-block'
                    }} title="Agent Ready" />
                  </div>
                  <span style={{ fontSize: '11px', color: '#94A3B8' }}>{agent.desc}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. TRACK SELECTOR SECTION */}
      <div>
        <h3 style={{ fontSize: '16px', color: '#E2E8F0', marginBottom: '8px' }}>Select Your Academic Track</h3>
        <TrackSelector activeTrack={track} onTrackChange={onTrackChange} />
      </div>

      {/* 3. QUICK STATS ROW */}
      <div className="grid-cols-4">
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ background: 'rgba(99, 102, 241, 0.1)', padding: '12px', borderRadius: '8px', color: '#6366F1' }}>
            <BookOpen size={24} />
          </div>
          <div>
            <div style={{ fontSize: '24px', fontWeight: 700, color: '#E2E8F0' }}>{currentMetrics.topics}</div>
            <div style={{ fontSize: '12px', color: '#94A3B8' }}>Core Track Topics</div>
          </div>
        </div>

        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '12px', borderRadius: '8px', color: '#10B981' }}>
            <CheckCircle size={24} />
          </div>
          <div>
            <div style={{ fontSize: '24px', fontWeight: 700, color: '#E2E8F0' }}>{currentMetrics.quizzes}</div>
            <div style={{ fontSize: '12px', color: '#94A3B8' }}>Assessment MCQs</div>
          </div>
        </div>

        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ background: 'rgba(245, 158, 11, 0.1)', padding: '12px', borderRadius: '8px', color: '#F59E0B' }}>
            <Layers size={24} />
          </div>
          <div>
            <div style={{ fontSize: '24px', fontWeight: 700, color: '#E2E8F0' }}>{currentMetrics.graphNodes}</div>
            <div style={{ fontSize: '12px', color: '#94A3B8' }}>Dependencies Graph Nodes</div>
          </div>
        </div>

        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ background: 'rgba(99, 102, 241, 0.1)', padding: '12px', borderRadius: '8px', color: '#6366F1' }}>
            <Settings size={24} />
          </div>
          <div>
            <div style={{ fontSize: '24px', fontWeight: 700, color: '#E2E8F0' }}>4</div>
            <div style={{ fontSize: '12px', color: '#94A3B8' }}>Active Specialist Agents</div>
          </div>
        </div>
      </div>

      {/* Main Grid: Left Side Activity/Info, Right Side Tech stack architecture details */}
      <div className="grid-cols-2">
        
        {/* LEFT COLUMN: HOW IT WORKS & RECENT ACTIVITY */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* HOW IT WORKS */}
          <div className="card">
            <h3 style={{ color: '#FFFFFF', marginBottom: '16px', fontSize: '16px' }}>💡 Getting Started</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', gap: '12px' }}>
                <span style={{ background: 'rgba(99,102,241,0.15)', color: '#6366F1', width: '24px', height: '24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700, flexShrink: 0 }}>1</span>
                <div>
                  <h4 style={{ fontSize: '13px', color: '#E2E8F0', margin: '0 0 2px 0' }}>Choose your engineering track</h4>
                  <p style={{ fontSize: '11px', color: '#94A3B8', margin: 0 }}>Select your target specialization above to update study topics, quiz bank, and goals.</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <span style={{ background: 'rgba(99,102,241,0.15)', color: '#6366F1', width: '24px', height: '24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700, flexShrink: 0 }}>2</span>
                <div>
                  <h4 style={{ fontSize: '13px', color: '#E2E8F0', margin: '0 0 2px 0' }}>Ask the AI tutor or take a quiz</h4>
                  <p style={{ fontSize: '11px', color: '#94A3B8', margin: 0 }}>Explain weak topics, compile weekly schedules, or run code snippets safely in our sandbox.</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <span style={{ background: 'rgba(99,102,241,0.15)', color: '#6366F1', width: '24px', height: '24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700, flexShrink: 0 }}>3</span>
                <div>
                  <h4 style={{ fontSize: '13px', color: '#E2E8F0', margin: '0 0 2px 0' }}>Track progress and review weak spots</h4>
                  <p style={{ fontSize: '11px', color: '#94A3B8', margin: 0 }}>View study stats in the analytics module and let the agent adapt future study plans dynamically.</p>
                </div>
              </div>
            </div>
          </div>

          {/* RECENT ACTIVITY FEED */}
          <div className="card">
            <h3 style={{ color: '#FFFFFF', marginBottom: '16px', fontSize: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Clock size={16} /> Recent Study Activity
            </h3>
            
            {loadingProgress ? (
              <div style={{ color: '#94A3B8', fontSize: '13px', padding: '10px 0' }}>Retrieving SQLite logs...</div>
            ) : progress?.recent_activity && progress.recent_activity.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {progress.recent_activity.map((activity, idx) => (
                  <div key={idx} style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    paddingBottom: '12px',
                    borderBottom: idx < progress.recent_activity.length - 1 ? '1px solid #2C2C4E' : 'none',
                    fontSize: '12px'
                  }}>
                    <div>
                      <div style={{ fontWeight: 600, color: '#E2E8F0' }}>
                        {activity.type === 'study' ? '📖 Concept Study' : '✏️ Quiz Assessment'}
                      </div>
                      <span style={{ color: '#94A3B8' }}>{activity.description}</span>
                    </div>
                    <span style={{ color: '#94A3B8', fontSize: '11px', flexShrink: 0 }}>
                      {new Date(activity.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ color: '#94A3B8', fontSize: '13px', textAlign: 'center', padding: '20px 0' }}>
                No recent study activity logged. Log study sessions or quiz attempts to sync stats!
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: ABOUT THIS PROJECT (Judges Review) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div className="card">
            <h3 style={{ color: '#FFFFFF', marginBottom: '8px', fontSize: '16px' }}>🔬 Judge's Panel: What is LearnForge?</h3>
            <p style={{ color: '#94A3B8', fontSize: '13px', marginBottom: '16px' }}>
              LearnForge is an agentic studying console designed for engineering students. It uses local LLM executions and localized database logs to construct a fully secure, offline educational ecosystem.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '10px', borderRadius: '6px', border: '1px solid #2C2C4E' }}>
                <b style={{ color: '#E2E8F0', fontSize: '12px' }}>⚙️ Multi-Agent Architecture:</b>
                <pre style={{
                  fontFamily: 'monospace',
                  fontSize: '9px',
                  color: '#6366F1',
                  overflowX: 'auto',
                  marginTop: '8px',
                  lineHeight: '1.2'
                }}>{`      [Client Request] --> [Sanitizer Guard] 
                               |
                   [Root Orchestrator Agent]
                   /      |         |      \\
             Tutor   Quiz    Planner   Code-Review
                   \\      |         |      /
             [Model Context Protocol (MCP) Server]
             /       |         |         |      \\
        Arxiv   Sandbox   Progress    Quiz   Concept-Graph`}</pre>
              </div>
            </div>

            <h4 style={{ color: '#E2E8F0', fontSize: '12px', marginBottom: '8px' }}>Technology Stack Stack Badges</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              <span className="badge">React 18</span>
              <span className="badge">FastAPI</span>
              <span className="badge">Google ADK</span>
              <span className="badge">MCP Tools</span>
              <span className="badge">SQLite</span>
              <span className="badge">Slowapi</span>
              <span className="badge">python-jose</span>
              <span className="badge">Railway</span>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
