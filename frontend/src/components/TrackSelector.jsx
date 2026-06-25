import React from 'react';

export default function TrackSelector({ activeTrack, onTrackChange }) {
  const tracks = ['CSE', 'IT', 'AI/ML', 'Data Science'];

  const styles = {
    container: {
      display: 'flex',
      gap: '12px',
      margin: '20px 0',
      width: '100%'
    },
    button: (isSelected) => ({
      flex: 1,
      padding: '16px 20px',
      fontSize: '15px',
      fontWeight: 700,
      fontFamily: "'Outfit', sans-serif",
      borderRadius: '12px',
      border: isSelected ? '2px solid #6366F1' : '1px solid #2C2C4E',
      background: isSelected ? 'rgba(99, 102, 241, 0.15)' : '#1A1A2E',
      color: isSelected ? '#FFFFFF' : '#94A3B8',
      cursor: 'pointer',
      transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
      textAlign: 'center',
      boxShadow: isSelected ? '0 4px 15px rgba(99, 102, 241, 0.15)' : 'none'
    })
  };

  return (
    <div style={styles.container}>
      {tracks.map((track) => (
        <button
          key={track}
          onClick={() => onTrackChange(track)}
          style={styles.button(activeTrack === track)}
        >
          {track}
        </button>
      ))}
    </div>
  );
}
