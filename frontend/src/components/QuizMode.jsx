import React, { useState } from 'react';
import useAgent from '../hooks/useAgent';
import client from '../api/client';

export default function QuizMode({ track, onActivityLogged }) {
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState('intermediate');
  const [questions, setQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  
  const { queryAgent, loading, error } = useAgent();

  const trackTopics = {
    'CSE': ['Data Structures', 'Algorithms', 'OS', 'DBMS'],
    'IT': ['Networking', 'Cybersecurity', 'Cloud Computing', 'Linux'],
    'AI/ML': ['Linear Algebra', 'ML Algorithms', 'Deep Learning', 'NLP'],
    'Data Science': ['Statistics', 'Pandas', 'SQL', 'Visualisation']
  };

  const topics = trackTopics[track] || trackTopics['CSE'];

  const startQuiz = async (topicName) => {
    setQuestions([]);
    setCurrentIdx(0);
    setSelectedAnswers({});
    setSubmitted(false);
    setQuizFinished(false);
    
    try {
      const res = await queryAgent('quiz', topicName, { difficulty });
      if (res.output && Array.isArray(res.output)) {
        setQuestions(res.output);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const selectAnswer = (ansIdx) => {
    if (submitted) return;
    setSelectedAnswers({
      ...selectedAnswers,
      [currentIdx]: ansIdx
    });
  };

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = async () => {
    setQuizFinished(true);
    // Calculate final score
    let score = 0;
    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correct_idx) {
        score += 1;
      }
    });

    try {
      // Post result to SQLite
      await client.post('/student/quiz-result', {
        topic: topic,
        score: score,
        total_questions: questions.length,
        difficulty: difficulty
      });
      if (onActivityLogged) {
        onActivityLogged(); // Sync activity feed
      }
    } catch (err) {
      console.error("Error logging quiz score:", err);
    }
  };

  const activeQuestion = questions[currentIdx];
  const totalCorrect = questions.filter((q, i) => selectedAnswers[i] === q.correct_idx).length;

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* 1. Setup Panel */}
      <div className="card">
        <h3 style={{ color: '#FFFFFF', marginBottom: '16px', fontSize: '15px' }}>🚀 Launch a MCQ Assessment</h3>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
          
          <div style={{ flex: 1, minWidth: '200px' }}>
            <label style={{ fontSize: '12px', color: '#94A3B8', display: 'block', marginBottom: '6px' }}>Select Topic</label>
            <select value={topic} onChange={(e) => setTopic(e.target.value)}>
              <option value="">-- Choose Concept --</option>
              {topics.map((t, i) => <option key={i} value={t}>{t}</option>)}
            </select>
          </div>

          <div style={{ width: '150px' }}>
            <label style={{ fontSize: '12px', color: '#94A3B8', display: 'block', marginBottom: '6px' }}>Difficulty</label>
            <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>

          <button
            onClick={() => startQuiz(topic)}
            disabled={!topic || loading}
            className="btn btn-primary"
            style={{ marginTop: '22px' }}
          >
            {loading ? 'Generating...' : 'Start Assessment'}
          </button>
        </div>
      </div>

      {/* 2. Assessment Board */}
      <div className="card" style={{ minHeight: '350px', display: 'flex', flexDirection: 'column', justify: 'center' }}>
        
        {loading ? (
          <div style={{ textAlign: 'center', color: '#94A3B8', marginTop: '100px' }}>
            🔄 QuizAgent is formulating adaptive MCQs based on your track...
          </div>
        ) : error ? (
          <div className="badge badge-danger" style={{ padding: '16px', borderRadius: '8px' }}>
            ⚠️ {error}
          </div>
        ) : questions.length > 0 && !quizFinished ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Progress indicator */}
            <div style={{ display: 'flex', justify: 'space-between', fontSize: '13px', color: '#94A3B8' }}>
              <span>Question {currentIdx + 1} of {questions.length}</span>
              <span>Topic: {topic} | Difficulty: {difficulty}</span>
            </div>
            
            {/* Question Text */}
            <h3 style={{ color: '#FFFFFF', fontSize: '18px' }}>{activeQuestion.question}</h3>

            {/* Answer Options */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {activeQuestion.options.map((opt, oIdx) => {
                const isSelected = selectedAnswers[currentIdx] === oIdx;
                return (
                  <button
                    key={oIdx}
                    onClick={() => selectAnswer(oIdx)}
                    style={{
                      padding: '14px 20px',
                      borderRadius: '8px',
                      border: isSelected ? '1px solid #6366F1' : '1px solid #2C2C4E',
                      background: isSelected ? 'rgba(99, 102, 241, 0.1)' : '#121222',
                      color: isSelected ? '#FFFFFF' : '#E2E8F0',
                      cursor: 'pointer',
                      textAlign: 'left',
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '14px',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>

            {/* Controls */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
              <button
                onClick={handleNext}
                className="btn btn-accent"
                disabled={selectedAnswers[currentIdx] === undefined}
              >
                {currentIdx < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
              </button>
            </div>
          </div>
        ) : quizFinished ? (
          /* Finished State */
          <div style={{ textAlign: 'center', padding: '40px 0', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <span style={{ fontSize: '48px' }}>🏆</span>
            <h2 style={{ color: '#FFFFFF' }}>Assessment Complete!</h2>
            <p style={{ color: '#94A3B8', fontSize: '16px' }}>
              You scored <b style={{ color: '#10B981', fontSize: '20px' }}>{totalCorrect}</b> out of {questions.length} questions.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginTop: '10px' }}>
              <button onClick={() => startQuiz(topic)} className="btn btn-primary">Try Again</button>
              <button onClick={() => setQuestions([])} className="btn btn-secondary">Close</button>
            </div>
          </div>
        ) : (
          <div style={{ color: '#94A3B8', textAlign: 'center', padding: '80px 0' }}>
            Choose a topic and launch an assessment to test your understanding. Questions adapt dynamically based on your track.
          </div>
        )}
      </div>
    </div>
  );
}
