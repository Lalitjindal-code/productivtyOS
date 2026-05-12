import React, { useState, useEffect } from 'react';
import { User, Timer, Bell, Database, Download, Trash2, Save, Loader2, Flame } from 'lucide-react';
import { useUserProfile } from '../hooks/useStats';
import { useTimer } from '../contexts/TimerContext';
import { ButtonPrimary } from '../components/common/Button';
import { Card } from '../components/common/Card';

const tabs = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'pomodoro', label: 'Pomodoro', icon: Timer },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'rageMode', label: 'Rage Mode', icon: Flame },
  { id: 'data', label: 'Data & Export', icon: Database },
];

const RAGE_MODES = [
  { id: 'soft', label: 'Soft', emoji: '😔', desc: 'Gentle disappointment. Like a sad teacher.' },
  { id: 'hard', label: 'Hard', emoji: '💀', desc: 'Blunt, honest, no sugar-coating.' },
  { id: 'brutal', label: 'Brutal', emoji: '🔥', desc: 'Savage roasts. Get absolutely destroyed.' },
  { id: 'custom', label: 'Custom', emoji: '⚡', desc: 'Critical but motivational. Ends with action.' },
];

export const Settings = () => {
  const { profile, isLoading, updateProfile, isUpdating } = useUserProfile();
  const { settings: timerSettings, updateSettings } = useTimer();
  const [activeTab, setActiveTab] = useState('profile');
  const [saved, setSaved] = useState(false);

  // Local form state mirrors profile
  const [profileForm, setProfileForm] = useState({
    displayName: '', avatarUrl: '', timezone: 'Asia/Kolkata', dateOfBirth: ''
  });
  const [pomodoroForm, setPomodoroForm] = useState({ ...timerSettings });
  const [notifForm, setNotifForm] = useState({
    taskReminders: true, streakReminders: true, dailyDigest: false
  });
  const [rageMode, setRageMode] = useState('hard');

  // Sync from API
  useEffect(() => {
    if (profile) {
      setProfileForm({
        displayName: profile.displayName || '',
        avatarUrl: profile.avatarUrl || '',
        timezone: profile.settings?.timezone || 'Asia/Kolkata',
        dateOfBirth: profile.dateOfBirth ? profile.dateOfBirth.split('T')[0] : '',
      });
      if (profile.settings?.pomodoro) {
        setPomodoroForm(profile.settings.pomodoro);
      }
      if (profile.settings?.notifications) {
        setNotifForm(profile.settings.notifications);
      }
      if (profile.settings?.rageMode) {
        setRageMode(profile.settings.rageMode);
      }
    }
  }, [profile]);

  const handleSave = () => {
    const payload = {
      displayName: profileForm.displayName,
      avatarUrl: profileForm.avatarUrl,
      dateOfBirth: profileForm.dateOfBirth || undefined,
      settings: {
        pomodoro: pomodoroForm,
        notifications: notifForm,
        rageMode: rageMode,
        appearance: profile?.settings?.appearance || {}
      }
    };
    updateProfile(payload, {
      onSuccess: () => {
        // Sync timer context with new pomodoro settings
        updateSettings(pomodoroForm);
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
      }
    });
  };

  const handleExportData = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/user/profile`);
      const data = await res.json();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'productivityos-data.json';
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      alert('Export failed. Make sure the server is running.');
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full py-20">
        <Loader2 className="animate-spin text-primary-400" size={32} />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-500">
      <div className="mb-8">
        <h1 className="font-display font-bold text-3xl text-neutral-50">Settings</h1>
        <p className="font-body text-neutral-400 mt-1">Customize your ProductivityOS experience.</p>
      </div>

      <div className="flex gap-6">
        {/* Sidebar tabs */}
        <div className="w-48 shrink-0 space-y-1">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-body font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-primary-400/15 text-primary-400'
                  : 'text-neutral-400 hover:text-neutral-200 hover:bg-white/5'
              }`}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Panel */}
        <div className="flex-1">
          <Card className="p-6 space-y-5">
            {/* PROFILE */}
            {activeTab === 'profile' && (
              <>
                <h2 className="font-display font-semibold text-lg text-neutral-50">Profile</h2>
                {[
                  { label: 'Display Name', key: 'displayName', type: 'text', placeholder: 'Productivity Warrior' },
                  { label: 'Avatar URL', key: 'avatarUrl', type: 'url', placeholder: 'https://...' },
                  { label: 'Timezone', key: 'timezone', type: 'text', placeholder: 'Asia/Kolkata' },
                  { label: 'Date of Birth', key: 'dateOfBirth', type: 'date', placeholder: '' },
                ].map(f => (
                  <div key={f.key}>
                    <label className="block font-body text-sm text-neutral-300 mb-1.5">{f.label}</label>
                    <input
                      type={f.type}
                      value={profileForm[f.key]}
                      onChange={e => setProfileForm(p => ({ ...p, [f.key]: e.target.value }))}
                      placeholder={f.placeholder}
                      className="w-full bg-base border border-white/10 rounded-lg px-4 py-2.5 text-neutral-100 font-body text-sm focus:outline-none focus:border-primary-400/50 focus:ring-1 focus:ring-primary-400/30"
                    />
                  </div>
                ))}
              </>
            )}

            {/* POMODORO */}
            {activeTab === 'pomodoro' && (
              <>
                <h2 className="font-display font-semibold text-lg text-neutral-50">Pomodoro Settings</h2>
                {[
                  { label: 'Focus Duration (min)', key: 'work', min: 1, max: 120 },
                  { label: 'Short Break (min)', key: 'shortBreak', min: 1, max: 30 },
                  { label: 'Long Break (min)', key: 'longBreak', min: 5, max: 60 },
                  { label: 'Long Break After (cycles)', key: 'longBreakInterval', min: 1, max: 10 },
                ].map(f => (
                  <div key={f.key}>
                    <label className="block font-body text-sm text-neutral-300 mb-1.5">{f.label}</label>
                    <input
                      type="number"
                      min={f.min}
                      max={f.max}
                      value={pomodoroForm[f.key]}
                      onChange={e => setPomodoroForm(p => ({ ...p, [f.key]: Number(e.target.value) }))}
                      className="w-32 bg-base border border-white/10 rounded-lg px-4 py-2.5 text-neutral-100 font-mono text-sm focus:outline-none focus:border-primary-400/50 focus:ring-1 focus:ring-primary-400/30"
                    />
                  </div>
                ))}
              </>
            )}

            {/* NOTIFICATIONS */}
            {activeTab === 'notifications' && (
              <>
                <h2 className="font-display font-semibold text-lg text-neutral-50">Notifications</h2>
                {[
                  { key: 'taskReminders', label: 'Task Reminders', desc: 'Get alerted before deadlines' },
                  { key: 'streakReminders', label: 'Streak Reminders', desc: 'Reminder to keep your streak alive' },
                  { key: 'dailyDigest', label: 'Daily Digest', desc: 'Morning summary of your day' },
                ].map(n => (
                  <label key={n.key} className="flex items-center justify-between p-4 bg-base rounded-xl border border-white/5 cursor-pointer hover:border-white/10 transition-colors">
                    <div>
                      <p className="font-body text-sm font-medium text-neutral-200">{n.label}</p>
                      <p className="font-body text-xs text-neutral-500">{n.desc}</p>
                    </div>
                    <div
                      onClick={() => setNotifForm(p => ({ ...p, [n.key]: !p[n.key] }))}
                      className={`w-11 h-6 rounded-full transition-colors cursor-pointer relative ${notifForm[n.key] ? 'bg-primary-400' : 'bg-white/10'}`}
                    >
                      <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${notifForm[n.key] ? 'translate-x-5.5 left-0.5' : 'left-0.5'}`} />
                    </div>
                  </label>
                ))}
              </>
            )}

            {/* RAGE MODE */}
            {activeTab === 'rageMode' && (
              <>
                <h2 className="font-display font-semibold text-lg text-neutral-50">Rage Mode</h2>
                <p className="font-body text-sm text-neutral-400 mb-2">How hard should the AI roast you when you fail a task?</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {RAGE_MODES.map(mode => (
                    <button
                      key={mode.id}
                      onClick={() => setRageMode(mode.id)}
                      className={`text-left p-4 rounded-xl border transition-all ${
                        rageMode === mode.id
                          ? 'bg-red-400/10 border-red-400/40 shadow-inner-glow'
                          : 'bg-base border-white/5 hover:border-white/10'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-2xl">{mode.emoji}</span>
                        {rageMode === mode.id && <div className="w-2 h-2 rounded-full bg-red-400 shadow-[0_0_10px_rgba(248,113,113,0.8)]" />}
                      </div>
                      <p className={`font-body font-bold text-sm ${rageMode === mode.id ? 'text-red-400' : 'text-neutral-200'}`}>
                        {mode.label}
                      </p>
                      <p className="font-body text-xs text-neutral-500 mt-1">{mode.desc}</p>
                    </button>
                  ))}
                </div>
              </>
            )}

            {/* DATA */}
            {activeTab === 'data' && (
              <>
                <h2 className="font-display font-semibold text-lg text-neutral-50">Data & Export</h2>
                <div className="space-y-4">
                  <div className="p-4 bg-base rounded-xl border border-white/5">
                    <p className="font-body text-sm font-medium text-neutral-200 mb-1">Export All Data</p>
                    <p className="font-body text-xs text-neutral-500 mb-3">Download all your profile and settings data as JSON.</p>
                    <button
                      onClick={handleExportData}
                      className="flex items-center gap-2 text-sm font-body text-plasma-400 border border-plasma-400/30 bg-plasma-400/10 hover:bg-plasma-400/20 px-4 py-2 rounded-lg transition-colors"
                    >
                      <Download size={14} /> Export JSON
                    </button>
                  </div>

                  <div className="p-4 bg-base rounded-xl border border-red-500/10">
                    <p className="font-body text-sm font-medium text-red-400 mb-1">Danger Zone</p>
                    <p className="font-body text-xs text-neutral-500 mb-3">This action is irreversible. All your data will be permanently deleted.</p>
                    <button
                      onClick={() => window.confirm('Are you absolutely sure? This cannot be undone.') && alert('Data clear not implemented in MVP.')}
                      className="flex items-center gap-2 text-sm font-body text-red-400 border border-red-500/20 bg-red-500/5 hover:bg-red-500/15 px-4 py-2 rounded-lg transition-colors"
                    >
                      <Trash2 size={14} /> Clear All Data
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* Save button (not shown in data tab) */}
            {activeTab !== 'data' && (
              <div className="pt-4 border-t border-white/5 flex items-center gap-3">
                <ButtonPrimary onClick={handleSave} disabled={isUpdating}>
                  {isUpdating ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                  <span className="ml-1.5">{isUpdating ? 'Saving...' : 'Save Changes'}</span>
                </ButtonPrimary>
                {saved && <span className="font-body text-sm text-green-400 animate-in fade-in">✓ Saved!</span>}
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};
