import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import HomeDashboard from './components/HomeDashboard';
import TutorChat from './components/TutorChat';
import QuizMode from './components/QuizMode';
import StudyPlanner from './components/StudyPlanner';
import CodeReview from './components/CodeReview';
import Analytics from './components/Analytics';
import useProgress from './hooks/useProgress';
import client from './api/client';

export default function App() {
  const [token, setToken] = useState(localStorage.getItem('learnforge_token'));
  const [username, setUsername] = useState(localStorage.getItem('learnforge_username') || '');
  const [track, setTrack] = useState(localStorage.getItem('learnforge_track') || 'CSE');
  const [currentTab, setCurrentTab] = useState('dashboard');
  
  // Auth Form State
  const [isLogin, setIsLogin] = useState(true);
  const [formUser, setFormUser] = useState('Vijay');
  const [formPass, setFormPass] = useState('Hello#1234');
  const [formTrack, setFormTrack] = useState('CSE');
  const [authError, setAuthError] = useState(null);
  const [authLoading, setAuthLoading] = useState(false);

  // Load progress hook
  const { progress, loading: loadingProgress, fetchProgress } = useProgress();

  useEffect(() => {
    if (token) {
      fetchProgress();
    }
  }, [token, fetchProgress]);

  const handleTrackChange = async (newTrack) => {
    setTrack(newTrack);
    localStorage.setItem('learnforge_track', newTrack);
    if (token) {
      try {
        await client.put('/auth/track', { track: newTrack });
        fetchProgress();
      } catch (err) {
        console.error("Error syncing track change with backend:", err);
      }
    }
  };

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setAuthError(null);
    setAuthLoading(true);
    
    const endpoint = isLogin ? '/auth/login' : '/auth/register';
    const payload = isLogin 
      ? { username: formUser, password: formPass }
      : { username: formUser, password: formPass, track: formTrack };

    try {
      const response = await client.post(endpoint, payload);
      const { access_token, username: resUser, track: resTrack } = response.data;
      
      localStorage.setItem('learnforge_token', access_token);
      localStorage.setItem('learnforge_username', resUser);
      localStorage.setItem('learnforge_track', resTrack);
      
      setToken(access_token);
      setUsername(resUser);
      setTrack(resTrack);
      setAuthError(null);
    } catch (err) {
      setAuthError(err.response?.data?.detail || "Authentication process failed.");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setAuthError(null);
    setAuthLoading(true);
    // Attempt registration first, if already exists, log in
    try {
      await client.post('/auth/register', { username: 'student_judge', password: 'demo_password_123', track: 'AI/ML' });
    } catch (e) {
      // Ignored if already registered
    }

    try {
      const response = await client.post('/auth/login', { username: 'student_judge', password: 'demo_password_123' });
      const { access_token, username: resUser, track: resTrack } = response.data;
      
      localStorage.setItem('learnforge_token', access_token);
      localStorage.setItem('learnforge_username', resUser);
      localStorage.setItem('learnforge_track', resTrack);
      
      setToken(access_token);
      setUsername(resUser);
      setTrack(resTrack);
    } catch (err) {
      setAuthError("Demo access failed to initialize.");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('learnforge_token');
    localStorage.removeItem('learnforge_username');
    localStorage.removeItem('learnforge_track');
    setToken(null);
    setUsername('');
    setCurrentTab('dashboard');
  };

  const renderActiveTab = () => {
    switch (currentTab) {
      case 'dashboard':
        return (
          <HomeDashboard 
            username={username}
            track={track}
            onTrackChange={handleTrackChange}
            progress={progress}
            loadingProgress={loadingProgress}
          />
        );
      case 'tutor':
        return <TutorChat track={track} onActivityLogged={fetchProgress} />;
      case 'quiz':
        return <QuizMode track={track} onActivityLogged={fetchProgress} />;
      case 'planner':
        return <StudyPlanner track={track} onActivityLogged={fetchProgress} />;
      case 'codereview':
        return <CodeReview onActivityLogged={fetchProgress} />;
      case 'analytics':
        return <Analytics progress={progress} loadingProgress={loadingProgress} onActivityLogged={fetchProgress} />;
      default:
        return <div>Tab not found</div>;
    }
  };

  // --- UNAUTHENTICATED GATE ---
  if (!token) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#0F0F1A',
        padding: '20px'
      }}>
        <div className="card animate-fade-in" style={{ width: '420px', padding: '30px' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <span style={{ fontSize: '36px' }}>🧠</span>
            <h2 style={{ fontSize: '24px', color: '#FFFFFF', marginTop: '10px' }}>LearnForge</h2>
            <p style={{ color: '#94A3B8', fontSize: '13px' }}>Your AI study agent for software engineering</p>
          </div>

          <form onSubmit={handleAuthSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ fontSize: '12px', color: '#94A3B8', display: 'block', marginBottom: '6px' }}>Username</label>
              <input
                type="text"
                placeholder="Enter study username..."
                value={formUser}
                onChange={(e) => setFormUser(e.target.value)}
                required
              />
            </div>

            <div>
              <label style={{ fontSize: '12px', color: '#94A3B8', display: 'block', marginBottom: '6px' }}>Password</label>
              <input
                type="password"
                placeholder="Choose a password..."
                value={formPass}
                onChange={(e) => setFormPass(e.target.value)}
                required
              />
            </div>

            {!isLogin && (
              <div>
                <label style={{ fontSize: '12px', color: '#94A3B8', display: 'block', marginBottom: '6px' }}>Select Target Track</label>
                <select value={formTrack} onChange={(e) => setFormTrack(e.target.value)}>
                  <option value="CSE">CSE (Computer Science Engineering)</option>
                  <option value="IT">IT (Information Technology)</option>
                  <option value="AI/ML">AI & Machine Learning</option>
                  <option value="Data Science">Data Science</option>
                </select>
              </div>
            )}

            {authError && (
              <div className="badge badge-danger" style={{ padding: '10px', borderRadius: '6px', fontSize: '12px' }}>
                ⚠️ {authError}
              </div>
            )}

            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '10px' }} disabled={authLoading}>
              {authLoading ? 'Signing in...' : isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </form>


          {/* Switch Tab */}
          <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '13px', color: '#94A3B8' }}>
            {isLogin ? "New to LearnForge? " : "Already registered? "}
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setAuthError(null);
              }}
              style={{
                background: 'none',
                border: 'none',
                color: '#6366F1',
                cursor: 'pointer',
                fontWeight: 600
              }}
            >
              {isLogin ? 'Create an account' : 'Sign in here'}
            </button>
          </div>

        </div>
      </div>
    );
  }

  // --- AUTHENTICATED WORKSPACE ---
  return (
    <div className="app-container">
      {/* Sidebar Layout */}
      <Sidebar 
        currentTab={currentTab} 
        setCurrentTab={setCurrentTab} 
        username={username}
        onLogout={handleLogout}
      />

      {/* Main Panel Content */}
      <div className="main-content">
        <TopBar currentTab={currentTab} track={track} />
        
        <main className="scroll-pane">
          {renderActiveTab()}
        </main>
      </div>
    </div>
  );
}
