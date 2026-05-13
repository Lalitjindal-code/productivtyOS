import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Brain, Sparkles, ThumbsDown, ThumbsUp, Plus, Trash2,
  Loader2, MessageSquare, Send, Lightbulb, AlertTriangle, TrendingUp
} from 'lucide-react';
import { Card } from '../components/common/Card';
import { format } from 'date-fns';
import api from '../services/api';
import { aiService } from '../services/aiService';

const fetchMemory = async () => {
  const res = await api.get('/memory');
  return res.data;
};

// ---- Insight Card ----
const InsightCard = ({ insight, onFlag }) => {
  const typeConfig = {
    strength: { color: 'text-green-400', bg: 'bg-green-400/10', border: 'border-green-400/20', icon: TrendingUp },
    weakness: { color: 'text-red-400', bg: 'bg-red-400/10', border: 'border-red-500/20', icon: AlertTriangle },
    pattern: { color: 'text-plasma-400', bg: 'bg-plasma-400/10', border: 'border-plasma-400/20', icon: Lightbulb },
  };
  const cfg = typeConfig[insight.type] || typeConfig.pattern;

  return (
    <div className={`p-4 bg-base rounded-xl border ${cfg.border} ${insight.flaggedAsWrong ? 'opacity-40' : ''}`}>
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex items-center gap-2">
          <div className={`${cfg.bg} p-1.5 rounded-lg`}>
            <cfg.icon size={14} className={cfg.color} />
          </div>
          <h3 className="font-body font-semibold text-sm text-neutral-100">{insight.title}</h3>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {insight.flaggedAsWrong && (
            <span className="font-mono text-xs text-red-400 border border-red-500/20 px-2 py-0.5 rounded">Flagged Wrong</span>
          )}
          <button
            onClick={() => onFlag(insight._id)}
            title={insight.flaggedAsWrong ? 'Mark as correct' : 'Flag as wrong'}
            className={`transition-colors ${insight.flaggedAsWrong ? 'text-green-400 hover:text-green-300' : 'text-neutral-500 hover:text-red-400'}`}
          >
            {insight.flaggedAsWrong ? <ThumbsUp size={14} /> : <ThumbsDown size={14} />}
          </button>
        </div>
      </div>
      <p className="font-body text-sm text-neutral-400 leading-relaxed">{insight.insight}</p>
      <p className="font-mono text-xs text-neutral-600 mt-2">
        {insight.generatedAt ? format(new Date(insight.generatedAt), 'MMM d, yyyy') : ''}
      </p>
    </div>
  );
};

// ---- Ask Brain Chat ----
const AskBrainChat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const SUGGESTED = [
    "When am I most productive?",
    "What's my biggest struggle?",
    "How can I improve my streak?",
    "What goal should I focus on?",
  ];

  const sendMessage = async (text) => {
    const content = text || input.trim();
    if (!content) return;
    setInput('');

    const userMessage = { role: 'user', content };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setLoading(true);

    try {
      // Call aiService which handles proper endpoint and parameter format
      const result = await aiService.sendMessage(content, messages);
      
      if (result.error) {
        setMessages([...newMessages, { role: 'assistant', content: result.error.message }]);
      } else {
        const replyText = result.data?.reply || 'Sorry, could not get response.';
        setMessages([...newMessages, { role: 'assistant', content: replyText }]);
      }
    } catch (error) {
      setMessages([...newMessages, { role: 'assistant', content: 'AI reach nahi ho paaya. Server `.env` mein `GROQ_API_KEY` aur `GEMINI_API_KEY` configured hai kya, check kar lo.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[500px]">
      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto space-y-3 mb-4 pr-1">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full gap-4 py-8">
            <Brain size={40} className="text-plasma-400 opacity-60" />
            <p className="font-body text-sm text-neutral-500 text-center">
              Ask your AI brain coach anything about your patterns, habits, or productivity.
            </p>
            <div className="flex flex-col gap-2 w-full">
              {SUGGESTED.map(q => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  className="text-left text-sm font-body text-neutral-400 border border-white/5 hover:border-plasma-400/30 hover:text-plasma-400 bg-base px-4 py-2.5 rounded-xl transition-all"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] px-4 py-2.5 rounded-2xl font-body text-sm leading-relaxed ${
              m.role === 'user'
                ? 'bg-primary-400/20 text-neutral-100 rounded-br-sm'
                : 'bg-surface border border-white/5 text-neutral-300 rounded-bl-sm'
            }`}>
              {m.content}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-surface border border-white/5 px-4 py-3 rounded-2xl rounded-bl-sm flex items-center gap-2">
              <Loader2 size={14} className="animate-spin text-plasma-400" />
              <span className="font-body text-sm text-neutral-500">Thinking...</span>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="flex gap-2">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }}}
          placeholder="Ask your brain..."
          className="flex-1 bg-base border border-white/10 rounded-xl px-4 py-2.5 text-neutral-100 font-body text-sm placeholder:text-neutral-600 focus:outline-none focus:border-plasma-400/50"
        />
        <button
          onClick={() => sendMessage()}
          disabled={!input.trim() || loading}
          className="w-10 h-10 flex items-center justify-center rounded-xl bg-plasma-400/20 border border-plasma-400/30 text-plasma-400 hover:bg-plasma-400/30 transition-all disabled:opacity-40"
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  );
};

// ---- Main Analytics Page ----
export const Analytics = () => {
  const queryClient = useQueryClient();
  const [newNote, setNewNote] = useState('');
  const [generatingInsights, setGeneratingInsights] = useState(false);
  const [activeTab, setActiveTab] = useState('insights');

  const { data: memory, isLoading } = useQuery({ queryKey: ['memory'], queryFn: fetchMemory });

  const flagMutation = useMutation({
    mutationFn: (insightId) => api.patch(`/memory/insights/${insightId}/flag`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['memory'] }),
  });

  const addNoteMutation = useMutation({
    mutationFn: (content) => api.post('/memory/notes', { content }),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['memory'] }); setNewNote(''); },
  });

  const deleteNoteMutation = useMutation({
    mutationFn: (noteId) => api.delete(`/memory/notes/${noteId}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['memory'] }),
  });

  const generateInsights = async () => {
    setGeneratingInsights(true);
    try {
      await api.post('/memory/insights/generate');
      queryClient.invalidateQueries({ queryKey: ['memory'] });
    } finally {
      setGeneratingInsights(false);
    }
  };

  const insights = memory?.weeklyInsights || [];
  const notes = memory?.personalNotes || [];

  const tabs = [
    { id: 'insights', label: 'AI Insights', icon: Sparkles },
    { id: 'chat', label: 'Ask Your Brain', icon: MessageSquare },
    { id: 'notes', label: 'My Notes', icon: Brain },
  ];

  return (
    <div className="max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-500">
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="font-display font-bold text-3xl text-neutral-50">AI Brain</h1>
          <p className="font-body text-neutral-400 mt-1">Your personalized AI memory and insights engine.</p>
        </div>
        {activeTab === 'insights' && (
          <button
            onClick={generateInsights}
            disabled={generatingInsights}
            className="flex items-center gap-2 text-sm font-body font-medium text-plasma-400 border border-plasma-400/30 bg-plasma-400/10 hover:bg-plasma-400/20 px-4 py-2.5 rounded-xl transition-all disabled:opacity-50"
          >
            {generatingInsights ? <Loader2 size={15} className="animate-spin" /> : <Sparkles size={15} />}
            {generatingInsights ? 'Analyzing...' : 'Generate This Week\'s Insights'}
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-white/5 pb-4">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-body font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-plasma-400/15 text-plasma-400'
                : 'text-neutral-400 hover:text-neutral-200 hover:bg-white/5'
            }`}
          >
            <tab.icon size={15} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Insights Tab */}
      {activeTab === 'insights' && (
        <div>
          {isLoading ? (
            <div className="flex justify-center py-16"><Loader2 className="animate-spin text-plasma-400" size={28} /></div>
          ) : insights.length === 0 ? (
            <Card className="p-12 text-center">
              <Sparkles size={40} className="text-plasma-400/50 mx-auto mb-4" />
              <h3 className="font-display font-bold text-xl text-neutral-200 mb-2">No Insights Yet</h3>
              <p className="font-body text-neutral-500">Click "Generate This Week's Insights" to let AI analyze your patterns.</p>
            </Card>
          ) : (
            <div className="space-y-3">
              {insights.map(insight => (
                <InsightCard
                  key={insight._id}
                  insight={insight}
                  onFlag={(id) => flagMutation.mutate(id)}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Chat Tab */}
      {activeTab === 'chat' && (
        <Card className="p-5">
          <AskBrainChat />
        </Card>
      )}

      {/* Notes Tab */}
      {activeTab === 'notes' && (
        <div className="space-y-4">
          <Card className="p-5">
            <h2 className="font-display font-semibold text-base text-neutral-50 mb-3">Add a Memory Note</h2>
            <p className="font-body text-xs text-neutral-500 mb-4">Tell the AI things about yourself. E.g. "I work best in the morning", "I lose focus after lunch".</p>
            <div className="flex gap-3">
              <input
                value={newNote}
                onChange={e => setNewNote(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter' && newNote.trim()) addNoteMutation.mutate(newNote); }}
                placeholder="I work best when..."
                className="flex-1 bg-base border border-white/10 rounded-xl px-4 py-2.5 text-neutral-100 font-body text-sm placeholder:text-neutral-600 focus:outline-none focus:border-plasma-400/50"
              />
              <button
                onClick={() => { if (newNote.trim()) addNoteMutation.mutate(newNote); }}
                disabled={!newNote.trim() || addNoteMutation.isPending}
                className="px-4 py-2.5 bg-plasma-400/20 border border-plasma-400/30 text-plasma-400 hover:bg-plasma-400/30 rounded-xl font-body text-sm font-medium transition-all disabled:opacity-40 flex items-center gap-2"
              >
                <Plus size={15} /> Add
              </button>
            </div>
          </Card>

          {notes.length > 0 && (
            <div className="space-y-2">
              {notes.map(note => (
                <div key={note._id} className="flex items-center justify-between bg-base border border-white/5 rounded-xl px-4 py-3 group">
                  <p className="font-body text-sm text-neutral-300">{note.content}</p>
                  <button
                    onClick={() => deleteNoteMutation.mutate(note._id)}
                    className="text-neutral-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all ml-3 shrink-0"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {notes.length === 0 && (
            <Card className="p-8 text-center">
              <Brain size={32} className="text-plasma-400/50 mx-auto mb-3" />
              <p className="font-body text-neutral-500">No personal notes yet. Tell your AI brain a bit about yourself.</p>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};
