'use client';

import React, { useEffect, useState, useCallback } from 'react';

import { supabase } from '@/lib/supabase';

interface LeaderboardEntry {
  username: string;
  score: number;
  timestamp: number;
}

interface LeaderboardProps {
  isOpen: boolean;
  onClose: () => void;
  username: string | null;
}

export default function Leaderboard({ isOpen, onClose, username }: LeaderboardProps) {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchLeaderboard = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/leaderboard');
      
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        console.error('Non-JSON response:', text);
        setLeaderboard([]);
        return;
      }

      const data = await response.json();
      setLeaderboard(data.leaderboard || []);
    } catch (err) {
      console.error('Failed to fetch leaderboard:', err);
      setLeaderboard([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      fetchLeaderboard();

      const channel = supabase
        .channel('leaderboard-changes')
        .on(
          'postgres_changes',
          { event: 'INSERT', schema: 'public', table: 'leaderboards' },
          (payload) => {
            console.log('Leaderboard change received!', payload);
            fetchLeaderboard();
          }
        )
        .subscribe();
      
      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [isOpen, fetchLeaderboard]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 px-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[600px] rounded-2xl bg-white text-black shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom-4 duration-300"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold">Leaderboard</h2>
          <button
            onClick={onClose}
            className="rounded-lg px-3 py-1.5 text-lg bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            ✕
          </button>
        </div>

        {loading ? (
          <div className="text-center py-8 text-gray-500">Loading leaderboard...</div>
        ) : leaderboard.length === 0 ? (
          <div className="text-center py-8 text-gray-500">No scores yet. Be the first!</div>
        ) : (
          <div className="space-y-2">
            <div className="grid grid-cols-12 gap-2 text-sm font-semibold text-gray-600 pb-2 border-b">
              <div className="col-span-1 text-center">#</div>
              <div className="col-span-7">Username</div>
              <div className="col-span-4 text-right">Score</div>
            </div>
            {leaderboard.map((entry, index) => {
              const isCurrentUser = username && entry.username.toLowerCase() === username.toLowerCase();
              return (
                <div
                  key={`${entry.username}-${entry.score}-${entry.timestamp}`}
                  className={`grid grid-cols-12 gap-2 py-2 px-2 rounded ${
                    isCurrentUser 
                      ? 'bg-blue-100 font-bold' 
                      : index < 3 
                      ? 'bg-yellow-50 font-semibold' 
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="col-span-1 text-center">
                    {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : index + 1}
                  </div>
                  <div className="col-span-7 truncate">{entry.username}</div>
                  <div className="col-span-4 text-right font-mono">{entry.score.toLocaleString()}</div>
                </div>
              );
            })}
          </div>
        )}

        <div className="mt-6 text-xs text-gray-500 text-center">
          Press <span className="font-semibold">Esc</span> or click outside to close.
        </div>
      </div>
    </div>
  );
}
