import { useState } from 'react';
import client from '../api/client';

export function useAgent() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const queryAgent = async (mode, query, meta = {}) => {
    setLoading(true);
    setError(null);
    try {
      const response = await client.post('/agent/query', { mode, query, meta });
      return response.data;
    } catch (err) {
      const msg = err.response?.data?.detail || "Error communicating with AI study agent.";
      setError(msg);
      throw new Error(msg);
    } finally {
      setLoading(false);
    }
  };

  return { queryAgent, loading, error };
}
export default useAgent;
