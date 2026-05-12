import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Skull, Zap, AlertTriangle, FileText, Loader2, Flame } from 'lucide-react';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { format } from 'date-fns';
import api from '../services/api';

const fetchWall = async () => {
  const res = await api.get('/rage/wall');
  return res.data;
};

const WallCard = ({ task, onCreatePenalty }) => {
  const [creating, setCreating] = useState(false);
  const handlePenalty = async () => {
    setCreating(true);
    try { await onCreatePenalty(task._id); } finally { setCreating(false); }
  };

  return (
    <Card glow="danger" className="p-5">
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex items-center gap-2">
          <Skull size={18} className="text-red-400 shrink-0" />
          <h3 className="font-body font-semibold text-neutral-100 line-clamp-1">{task.title}</h3>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Badge label={task.category} size="sm" />
          <Badge label={task.priority} color="danger" size="sm" />
        </div>
      </div>

      {task.aiRoast && (
        <div className="bg-red-500/5 border border-red-500/15 rounded-lg p-3 mb-3">
          <p className="font-body text-sm text-red-300/90 italic">"{task.aiRoast}"</p>
        </div>
      )}

      <div className="flex items-center justify-between mt-3">
        <span className="font-mono text-xs text-neutral-600">
          Failed: {task.failedAt ? format(new Date(task.failedAt), 'MMM d, yyyy') : 'Unknown'}
        </span>
        <button
          onClick={handlePenalty}
          disabled={creating}
          className="flex items-center gap-2 text-sm font-body text-amber-400 border border-amber-400/30 bg-amber-400/10 hover:bg-amber-400/20 px-3 py-1.5 rounded-lg transition-all disabled:opacity-50"
        >
          {creating ? <Loader2 size={13} className="animate-spin" /> : <Zap size={13} />}
          Create Penalty Task
        </button>
      </div>
    </Card>
  );
};

export const WallOfShame = () => {
  const queryClient = useQueryClient();
  const [shameReport, setShameReport] = useState(null);
  const [generatingReport, setGeneratingReport] = useState(false);

  const { data, isLoading } = useQuery({ queryKey: ['wall-of-shame'], queryFn: fetchWall });

  const penaltyMutation = useMutation({
    mutationFn: (taskId) => api.post(`/rage/penalty/${taskId}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks'] }),
  });

  const generateReport = async () => {
    setGeneratingReport(true);
    try {
      const res = await api.post('/rage/shame-report');
      setShameReport(res.data.report);
    } catch (e) {
      setShameReport('Report generate nahi ho paaya. Server `.env` mein `GROQ_API_KEY` / `GEMINI_API_KEY` check kar lo.');
    } finally {
      setGeneratingReport(false);
    }
  };

  const tasks = data?.tasks || [];
  const categoryCount = data?.categoryCount || {};
  const worstCategory = Object.entries(categoryCount).sort((a, b) => b[1] - a[1])[0];

  return (
    <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-500">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Skull size={28} className="text-red-400" />
          <h1 className="font-display font-bold text-3xl text-neutral-50">Wall of Shame</h1>
        </div>
        <p className="font-body text-neutral-400">Every failure you couldn't face. They will haunt you until you atone.</p>
      </div>

      {/* Stats */}
      {tasks.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          <Card className="p-4 text-center">
            <p className="font-display font-bold text-4xl text-red-400">{tasks.length}</p>
            <p className="font-body text-sm text-neutral-500 mt-1">Failed Tasks</p>
          </Card>
          {worstCategory && (
            <Card className="p-4 text-center">
              <p className="font-display font-bold text-2xl text-orange-400 capitalize">{worstCategory[0]}</p>
              <p className="font-body text-sm text-neutral-500 mt-1">Worst Category ({worstCategory[1]} fails)</p>
            </Card>
          )}
          <Card className="p-4 flex flex-col items-center justify-center gap-2">
            <button
              onClick={generateReport}
              disabled={generatingReport}
              className="flex items-center gap-2 text-sm font-body text-red-400 border border-red-500/30 bg-red-500/10 hover:bg-red-500/20 px-4 py-2 rounded-lg transition-all disabled:opacity-50"
            >
              {generatingReport ? <Loader2 size={14} className="animate-spin" /> : <FileText size={14} />}
              {generatingReport ? 'Generating...' : 'Get Shame Report'}
            </button>
          </Card>
        </div>
      )}

      {/* Shame Report */}
      {shameReport && (
        <Card glow="danger" className="p-5 mb-8">
          <div className="flex items-center gap-2 mb-3">
            <Flame size={18} className="text-red-400" />
            <h2 className="font-display font-semibold text-lg text-neutral-50">Weekly Shame Report</h2>
          </div>
          <p className="font-body text-neutral-300 leading-relaxed italic">"{shameReport}"</p>
        </Card>
      )}

      {/* Task List */}
      {isLoading ? (
        <div className="flex justify-center py-16"><Loader2 className="animate-spin text-red-400" size={28} /></div>
      ) : tasks.length === 0 ? (
        <Card className="p-12 text-center">
          <div className="text-5xl mb-4">🎉</div>
          <h3 className="font-display font-bold text-xl text-neutral-200 mb-2">Wall is Clean!</h3>
          <p className="font-body text-neutral-500">No failures to show. Keep it that way.</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {tasks.map(task => (
            <WallCard
              key={task._id}
              task={task}
              onCreatePenalty={() => penaltyMutation.mutate(task._id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
