import React, { useState, useEffect } from 'react';
import client from '../api/client';
import { Search, Info, Award, Brain } from 'lucide-react';

export default function Analytics({ progress, loadingProgress, onActivityLogged }) {
  const [arxivQuery, setArxivQuery] = useState('');
  const [arxivPapers, setArxivPapers] = useState([]);
  const [loadingArxiv, setLoadingArxiv] = useState(false);
  const [graphTopic, setGraphTopic] = useState('transformers');
  const [conceptGraph, setConceptGraph] = useState(null);
  const [loadingGraph, setLoadingGraph] = useState(false);

  // Fetch concept dependency graph
  const fetchGraph = async (topicName) => {
    setLoadingGraph(true);
    try {
      const response = await client.post('/mcp/concept-graph', { topic: topicName });
      setConceptGraph(response.data);
    } catch (err) {
      console.error("Error fetching concept map:", err);
    } finally {
      setLoadingGraph(false);
    }
  };

  // Fetch arXiv papers
  const handleArxivSearch = async () => {
    if (!arxivQuery.trim()) return;
    setLoadingArxiv(true);
    setArxivPapers([]);
    try {
      const response = await client.post('/mcp/arxiv', { query: arxivQuery });
      setArxivPapers(response.data);
      if (onActivityLogged) {
        onActivityLogged(); // Log search event
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingArxiv(false);
    }
  };

  useEffect(() => {
    // Initial fetch of default graph
    fetchGraph(graphTopic);
  }, []);

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Metrics Summary Row */}
      <div className="grid-cols-2">
        
        {/* Left Card: SQLite Quiz Performance Metrics */}
        <div className="card">
          <h3 style={{ color: '#FFFFFF', fontSize: '15px', marginBottom: '16px' }}>📊 Spaced Repetition Metrics</h3>
          {loadingProgress ? (
            <div style={{ color: '#94A3B8', fontSize: '13px' }}>Loading analytics...</div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', gap: '24px' }}>
                <div>
                  <span style={{ fontSize: '12px', color: '#94A3B8' }}>Average Quiz Score</span>
                  <div style={{ fontSize: '32px', fontWeight: 700, color: '#10B981' }}>
                    {progress?.average_score ? `${progress.average_score}%` : 'N/A'}
                  </div>
                </div>
                <div>
                  <span style={{ fontSize: '12px', color: '#94A3B8' }}>Assessments Done</span>
                  <div style={{ fontSize: '32px', fontWeight: 700, color: '#E2E8F0' }}>
                    {progress?.total_quizzes || 0}
                  </div>
                </div>
              </div>

              {/* Weak / Mastered categories */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '10px' }}>
                <div>
                  <span style={{ fontSize: '12px', color: '#EF4444', fontWeight: 600 }}>⚠️ Weak Concepts</span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '6px' }}>
                    {progress?.weak_topics && progress.weak_topics.length > 0 ? (
                      progress.weak_topics.map((t, idx) => (
                        <span key={idx} className="badge badge-danger" style={{ fontSize: '11px' }}>{t}</span>
                      ))
                    ) : (
                      <span style={{ color: '#94A3B8', fontSize: '11px' }}>None recorded. Keep testing!</span>
                    )}
                  </div>
                </div>
                <div>
                  <span style={{ fontSize: '12px', color: '#10B981', fontWeight: 600 }}>🎖️ Mastered Concepts</span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '6px' }}>
                    {progress?.mastered_topics && progress.mastered_topics.length > 0 ? (
                      progress.mastered_topics.map((t, idx) => (
                        <span key={idx} className="badge badge-success" style={{ fontSize: '11px' }}>{t}</span>
                      ))
                    ) : (
                      <span style={{ color: '#94A3B8', fontSize: '11px' }}>None yet. Score > 70% to master!</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Card: Concept Graph Visualizer */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', justify: 'space-between', alignItems: 'center' }}>
            <h3 style={{ color: '#FFFFFF', fontSize: '15px' }}>🔗 Concept Dependencies Map</h3>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                type="text"
                placeholder="Topic..."
                value={graphTopic}
                onChange={(e) => setGraphTopic(e.target.value)}
                style={{ width: '100px', padding: '4px 8px', fontSize: '11px' }}
              />
              <button 
                onClick={() => fetchGraph(graphTopic)} 
                className="btn btn-primary"
                style={{ padding: '4px 8px', fontSize: '11px' }}
              >
                Map
              </button>
            </div>
          </div>

          <div style={{
            flex: 1,
            backgroundColor: '#0F0F1A',
            border: '1px solid #2C2C4E',
            borderRadius: '8px',
            padding: '16px',
            minHeight: '180px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
          }}>
            {loadingGraph ? (
              <div style={{ color: '#94A3B8', fontSize: '12px' }}>Updating dependency nodes...</div>
            ) : conceptGraph?.nodes ? (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '20px',
                flexWrap: 'wrap',
                width: '100%'
              }}>
                {conceptGraph.nodes.map((node, nIdx) => {
                  const statusColors = {
                    mastered: '#10B981',
                    unlocked: '#6366F1',
                    locked: '#2C2C4E'
                  };
                  return (
                    <div key={node.id} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{
                        padding: '8px 12px',
                        borderRadius: '6px',
                        border: `1px solid ${statusColors[node.status]}`,
                        background: 'rgba(26,26,46,0.8)',
                        color: node.status === 'locked' ? '#94A3B8' : '#FFFFFF',
                        fontSize: '11px',
                        fontWeight: 600,
                        boxShadow: node.status === 'unlocked' ? '0 0 10px rgba(99, 102, 241, 0.3)' : 'none'
                      }}>
                        {node.label}
                      </div>
                      {nIdx < conceptGraph.nodes.length - 1 && (
                        <span style={{ color: '#2C2C4E', fontSize: '14px' }}>➔</span>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div style={{ color: '#94A3B8', fontSize: '12px' }}>Enter a topic and map learning paths.</div>
            )}
          </div>
        </div>

      </div>

      {/* ArXiv Research Hub */}
      <div className="grid-cols-2" style={{ gridTemplateColumns: '2fr 3fr' }}>
        
        {/* ArXiv search parameters */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h3 style={{ color: '#FFFFFF', fontSize: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Search size={16} /> ArXiv Scientific Search
          </h3>
          <p style={{ color: '#94A3B8', fontSize: '12px' }}>
            Search computer science, AI, and IT research papers directly using the arXiv API.
          </p>

          <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
            <input
              type="text"
              placeholder="e.g. self-attention transformers..."
              value={arxivQuery}
              onChange={(e) => setArxivQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleArxivSearch()}
            />
            <button
              onClick={handleArxivSearch}
              disabled={loadingArxiv || !arxivQuery}
              className="btn btn-primary"
            >
              {loadingArxiv ? 'Searching...' : 'Search'}
            </button>
          </div>
        </div>

        {/* ArXiv results panel */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '12px', minHeight: '300px' }}>
          <h3 style={{ color: '#FFFFFF', fontSize: '15px' }}>📖 Research Papers Results</h3>
          
          <div style={{
            flex: 1,
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            {loadingArxiv ? (
              <div style={{ color: '#94A3B8', fontSize: '13px', textAlign: 'center', marginTop: '80px' }}>
                🔄 Querying arXiv and parsing XML Atom Feed...
              </div>
            ) : arxivPapers.length > 0 ? (
              arxivPapers.map((paper, idx) => (
                <div key={idx} style={{
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid #2C2C4E',
                  background: 'rgba(255, 255, 255, 0.01)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px'
                }}>
                  <h4 style={{ color: '#FFFFFF', fontSize: '13px', margin: 0 }}>{paper.title}</h4>
                  <p style={{ color: '#94A3B8', fontSize: '11px', margin: 0, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {paper.summary}
                  </p>
                  {paper.link && (
                    <a
                      href={paper.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: '#6366F1', fontSize: '11px', textDecoration: 'none', fontWeight: 600 }}
                    >
                      Read full paper on arXiv ➔
                    </a>
                  )}
                </div>
              ))
            ) : (
              <div style={{ color: '#94A3B8', textAlign: 'center', marginTop: '80px', fontSize: '13px' }}>
                Search topics to import educational research papers into your console.
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
