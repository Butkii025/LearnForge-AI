import { useState, useCallback } from 'react';
import client from '../api/client';

export function useProgress() {
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProgress = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await client.get('/student/progress');
      setProgress(response.data);
    } catch (err) {
      const msg = err.response?.data?.detail || "Could not retrieve progress logs.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  const submitQuizResult = async (topic, score, totalQuestions, difficulty) => {
    try {
      await client.post('/student/quiz-result', {
        topic,
        score,
        total_questions: totalQuestions,
        difficulty
      });
      await fetchProgress(); // Synchronize fresh data
    } catch (err) {
      console.error("Error logging quiz metrics:", err);
    }
  };

  return { progress, loading, error, fetchProgress, submitQuizResult };
}
export default useProgress;
