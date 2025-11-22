'use client';

import { useState, useEffect } from 'react';
import { useUserStore } from '@/lib/store';
import { useTheme } from '@/components/providers/ThemeProvider';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { SkillSuggestions } from '@/components/ai/SkillSuggestions';
import { getSkillSuggestions } from '@/lib/ai-matching';
import {
  User,
  Mail,
  Lock,
  Bell,
  Eye,
  EyeOff,
  Camera,
  Plus,
  X,
  Save,
  Trash2,
  AlertTriangle,
  Plug,
  Gift,
  Palette,
  Copy,
  Check,
  Download,
  QrCode,
  Moon,
  Sun,
} from 'lucide-react';
import AppLayout from '@/components/layout/AppLayout';

type TabType = 'profile' | 'account' | 'privacy' | 'notifications' | 'integrations' | 'referral' | 'preferences';

export default function SettingsPage() {
  const { user, setUser } = useUserStore();
  const { theme, setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState<TabType>('profile');

  // Profile state
  const [name, setName] = useState(user?.name || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [skills, setSkills] = useState<string[]>(user?.skills || []);
  const [newSkill, setNewSkill] = useState('');
  const [lookingFor, setLookingFor] = useState<string[]>(user?.lookingFor || []);
  const [newRole, setNewRole] = useState('');
  const [skillSuggestions, setSkillSuggestions] = useState<string[]>([]);

  // Update skill suggestions when skills change
  useEffect(() => {
    if (skills.length > 0) {
      const suggestions = getSkillSuggestions(skills);
      setSkillSuggestions(suggestions);
    } else {
      setSkillSuggestions([]);
    }
  }, [skills]);

  // Account state
  const [email, setEmail] = useState(user?.email || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  // Privacy state
  const [profileVisibility, setProfileVisibility] = useState<'everyone' | 'events-only'>(
    'everyone'
  );
  const [whoCanMessage, setWhoCanMessage] = useState<'everyone' | 'connections'>('everyone');
  const [showOnlineStatus, setShowOnlineStatus] = useState(true);

  // Referral state
  const referralLink = `https://konekt.cz/invite/${user?.username || 'user'}`;
  const [copied, setCopied] = useState(false);
  const [referredUsers, setReferredUsers] = useState(7); // Mock data

  // Notifications state
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [newMessages, setNewMessages] = useState(true);
  const [projectInterest, setProjectInterest] = useState(true);
  const [eventReminders, setEventReminders] = useState(true);

  const handleSaveProfile = () => {
    if (user) {
      setUser({
        ...user,
        name,
        bio,
        skills,
        lookingFor,
      });
      alert('Profil uložen!');
    }
  };

  const addSkill = (skill: string) => {
    if (skill && !skills.includes(skill)) {
      setSkills([...skills, skill]);
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter((s) => s !== skillToRemove));
  };

  const addRole = (role: string) => {
    if (role && !lookingFor.includes(role)) {
      setLookingFor([...lookingFor, role]);
      setNewRole('');
    }
  };

  const removeRole = (roleToRemove: string) => {
    setLookingFor(lookingFor.filter((r) => r !== roleToRemove));
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-[#151515] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Pro zobrazení nastavení se prosím přihlaste
          </h2>
          <Link href="/register">
            <Button>Registrace</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <AppLayout>
      <div className="mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">⚙️ Nastavení</h1>
          <p className="text-white/60">Spravuj svůj účet a předvolby</p>
        </div>

        <div className="flex gap-8">
          {/* Tabs Sidebar */}
          <aside className="w-64 flex-shrink-0">
            <div className="bg-[#1a1a1a] rounded-2xl border-2 border-white/10 overflow-hidden">
              <nav className="p-2">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all mb-1 ${
                    activeTab === 'profile'
                      ? 'bg-konekt-green text-konekt-white'
                      : 'text-white/70 hover:bg-[#151515] hover:text-white'
                  }`}
                >
                  <User className="w-5 h-5" />
                  <span>Profil</span>
                </button>

                <button
                  onClick={() => setActiveTab('account')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all mb-1 ${
                    activeTab === 'account'
                      ? 'bg-konekt-green text-konekt-white'
                      : 'text-white/70 hover:bg-[#151515] hover:text-white'
                  }`}
                >
                  <Lock className="w-5 h-5" />
                  <span>Účet</span>
                </button>

                <button
                  onClick={() => setActiveTab('privacy')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all mb-1 ${
                    activeTab === 'privacy'
                      ? 'bg-konekt-green text-konekt-white'
                      : 'text-white/70 hover:bg-[#151515] hover:text-white'
                  }`}
                >
                  <Eye className="w-5 h-5" />
                  <span>Soukromí</span>
                </button>

                <button
                  onClick={() => setActiveTab('notifications')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all mb-1 ${
                    activeTab === 'notifications'
                      ? 'bg-konekt-green text-konekt-white'
                      : 'text-white/70 hover:bg-[#151515] hover:text-white'
                  }`}
                >
                  <Bell className="w-5 h-5" />
                  <span>Notifikace</span>
                </button>

                <button
                  onClick={() => setActiveTab('integrations')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all mb-1 ${
                    activeTab === 'integrations'
                      ? 'bg-konekt-green text-konekt-white'
                      : 'text-white/70 hover:bg-[#151515] hover:text-white'
                  }`}
                >
                  <Plug className="w-5 h-5" />
                  <span>Integrace</span>
                </button>

                <button
                  onClick={() => setActiveTab('referral')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all mb-1 ${
                    activeTab === 'referral'
                      ? 'bg-konekt-green text-konekt-white'
                      : 'text-white/70 hover:bg-[#151515] hover:text-white'
                  }`}
                >
                  <Gift className="w-5 h-5" />
                  <span>Pozvi přátele</span>
                </button>

                <button
                  onClick={() => setActiveTab('preferences')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                    activeTab === 'preferences'
                      ? 'bg-konekt-green text-konekt-white'
                      : 'text-white/70 hover:bg-[#151515] hover:text-white'
                  }`}
                >
                  <Palette className="w-5 h-5" />
                  <span>Vzhled & Export</span>
                </button>
              </nav>
            </div>
          </aside>

          {/* Content */}
          <main className="flex-1">
            <div className="bg-[#1a1a1a] rounded-2xl border-2 border-white/10 p-8">
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-1">Upravit profil</h2>
                    <p className="text-sm text-white/60">
                      Změň své profilové informace a bio
                    </p>
                  </div>

                  {/* Profile Picture */}
                  <div>
                    <label className="block text-sm font-medium text-white mb-3">
                      Profilová fotka
                    </label>
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 rounded-full bg-konekt-green flex items-center justify-center text-konekt-white text-2xl font-bold">
                        {user.name.charAt(0)}
                      </div>
                      <Button variant="outline" size="sm">
                        <Camera className="w-4 h-4 mr-2" />
                        Nahrát novou
                      </Button>
                    </div>
                  </div>

                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Jméno
                    </label>
                    <Input value={name} onChange={(e) => setName(e.target.value)} />
                  </div>

                  {/* Bio */}
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Bio</label>
                    <textarea
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      rows={4}
                      className="w-full px-4 py-3 bg-[#151515] border-2 border-white/10 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-konekt-green focus:border-transparent"
                    />
                  </div>

                  {/* Skills */}
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Skills
                    </label>
                    <div className="flex gap-2 mb-3">
                      <Input
                        placeholder="Přidat skill..."
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            addSkill(newSkill);
                          }
                        }}
                      />
                      <Button onClick={() => addSkill(newSkill)} variant="outline">
                        <Plus className="w-5 h-5" />
                      </Button>
                    </div>

                    {/* AI Skill Suggestions */}
                    <SkillSuggestions
                      suggestions={skillSuggestions}
                      onAdd={addSkill}
                    />

                    <div className="flex flex-wrap gap-2 mb-3">
                      {skills.map((skill) => (
                        <div
                          key={skill}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-konekt-green text-konekt-white rounded-full text-sm"
                        >
                          {skill}
                          <button
                            onClick={() => removeSkill(skill)}
                            className="hover:opacity-70 transition-opacity"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Looking For */}
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Co hledáš
                    </label>
                    <div className="flex gap-2 mb-3">
                      <Input
                        placeholder="Přidat roli..."
                        value={newRole}
                        onChange={(e) => setNewRole(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            addRole(newRole);
                          }
                        }}
                      />
                      <Button onClick={() => addRole(newRole)} variant="outline">
                        <Plus className="w-5 h-5" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {lookingFor.map((role) => (
                        <div
                          key={role}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-konekt-pink text-konekt-white rounded-full text-sm"
                        >
                          {role}
                          <button
                            onClick={() => removeRole(role)}
                            className="hover:opacity-70 transition-opacity"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10">
                    <Button onClick={handleSaveProfile}>
                      <Save className="w-4 h-4 mr-2" />
                      Uložit změny
                    </Button>
                  </div>
                </div>
              )}

              {/* Account Tab */}
              {activeTab === 'account' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-1">Nastavení účtu</h2>
                    <p className="text-sm text-white/60">
                      Změň email, heslo nebo smaž účet
                    </p>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Email
                    </label>
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  {/* Change Password */}
                  <div className="pt-6 border-t border-white/10">
                    <h3 className="text-lg font-semibold text-white mb-4">Změnit heslo</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-white mb-2">
                          Současné heslo
                        </label>
                        <Input
                          type="password"
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-white mb-2">
                          Nové heslo
                        </label>
                        <Input
                          type="password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                        />
                      </div>
                      <Button variant="outline">Změnit heslo</Button>
                    </div>
                  </div>

                  {/* Delete Account */}
                  <div className="pt-6 border-t border-white/10">
                    <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                      <div className="flex gap-3">
                        <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                        <div className="flex-1">
                          <h3 className="text-sm font-semibold text-red-900 mb-1">
                            Smazat účet
                          </h3>
                          <p className="text-sm text-red-700 mb-3">
                            Tato akce je nevratná. Všechna tvá data budou trvale smazána.
                          </p>
                          <Button
                            className="bg-red-600 hover:bg-red-700 text-white"
                            size="sm"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Smazat účet
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Privacy Tab */}
              {activeTab === 'privacy' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-1">Soukromí</h2>
                    <p className="text-sm text-white/60">
                      Kontroluj, kdo může vidět tvůj profil a kontaktovat tě
                    </p>
                  </div>

                  {/* Profile Visibility */}
                  <div>
                    <label className="block text-sm font-medium text-white mb-3">
                      Kdo může vidět můj profil
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center gap-3 p-4 bg-[#151515] rounded-xl cursor-pointer hover:bg-konekt-green/5 transition-colors border-2 border-white/10">
                        <input
                          type="radio"
                          name="visibility"
                          checked={profileVisibility === 'everyone'}
                          onChange={() => setProfileVisibility('everyone')}
                          className="w-5 h-5 accent-konekt-green"
                        />
                        <div>
                          <p className="font-medium text-white">Všichni</p>
                          <p className="text-sm text-white/60">
                            Kdokoliv na platformě může vidět tvůj profil
                          </p>
                        </div>
                      </label>
                      <label className="flex items-center gap-3 p-4 bg-[#151515] rounded-xl cursor-pointer hover:bg-konekt-green/5 transition-colors border-2 border-white/10">
                        <input
                          type="radio"
                          name="visibility"
                          checked={profileVisibility === 'events-only'}
                          onChange={() => setProfileVisibility('events-only')}
                          className="w-5 h-5 accent-konekt-green"
                        />
                        <div>
                          <p className="font-medium text-white">Jen z akcí</p>
                          <p className="text-sm text-white/60">
                            Pouze lidé ze stejných eventů mohou vidět tvůj profil
                          </p>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Who Can Message */}
                  <div className="pt-6 border-t border-white/10">
                    <label className="block text-sm font-medium text-white mb-3">
                      Kdo mi může psát
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center gap-3 p-4 bg-[#151515] rounded-xl cursor-pointer hover:bg-konekt-green/5 transition-colors border-2 border-white/10">
                        <input
                          type="radio"
                          name="messaging"
                          checked={whoCanMessage === 'everyone'}
                          onChange={() => setWhoCanMessage('everyone')}
                          className="w-5 h-5 accent-konekt-green"
                        />
                        <p className="font-medium text-white">Kdokoliv</p>
                      </label>
                      <label className="flex items-center gap-3 p-4 bg-[#151515] rounded-xl cursor-pointer hover:bg-konekt-green/5 transition-colors border-2 border-white/10">
                        <input
                          type="radio"
                          name="messaging"
                          checked={whoCanMessage === 'connections'}
                          onChange={() => setWhoCanMessage('connections')}
                          className="w-5 h-5 accent-konekt-green"
                        />
                        <p className="font-medium text-white">Pouze spojení</p>
                      </label>
                    </div>
                  </div>

                  {/* Online Status */}
                  <div className="pt-6 border-t border-white/10">
                    <label className="flex items-center justify-between p-4 bg-[#151515] rounded-xl cursor-pointer">
                      <div>
                        <p className="font-medium text-white mb-1">
                          Zobrazit online status
                        </p>
                        <p className="text-sm text-white/60">
                          Ostatní uvidí, když jsi online
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        checked={showOnlineStatus}
                        onChange={(e) => setShowOnlineStatus(e.target.checked)}
                        className="w-5 h-5 rounded accent-konekt-green"
                      />
                    </label>
                  </div>
                </div>
              )}

              {/* Notifications Tab */}
              {activeTab === 'notifications' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-1">Notifikace</h2>
                    <p className="text-sm text-white/60">
                      Spravuj, jak a kdy chceš dostávat notifikace
                    </p>
                  </div>

                  {/* Email Notifications */}
                  <label className="flex items-center justify-between p-4 bg-[#151515] rounded-xl cursor-pointer">
                    <div>
                      <p className="font-medium text-white mb-1">Email notifikace</p>
                      <p className="text-sm text-white/60">
                        Dostávej důležité updaty na email
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={emailNotifications}
                      onChange={(e) => setEmailNotifications(e.target.checked)}
                      className="w-5 h-5 rounded accent-konekt-green"
                    />
                  </label>

                  <div className="pt-6 border-t border-white/10">
                    <p className="text-sm font-semibold text-white/60 mb-3">
                      Notifikace v aplikaci
                    </p>
                    <div className="space-y-2">
                      <label className="flex items-center justify-between p-4 bg-[#151515] rounded-xl cursor-pointer">
                        <p className="font-medium text-white">Nové zprávy</p>
                        <input
                          type="checkbox"
                          checked={newMessages}
                          onChange={(e) => setNewMessages(e.target.checked)}
                          className="w-5 h-5 rounded accent-konekt-green"
                        />
                      </label>

                      <label className="flex items-center justify-between p-4 bg-[#151515] rounded-xl cursor-pointer">
                        <p className="font-medium text-white">Zájem o projekty</p>
                        <input
                          type="checkbox"
                          checked={projectInterest}
                          onChange={(e) => setProjectInterest(e.target.checked)}
                          className="w-5 h-5 rounded accent-konekt-green"
                        />
                      </label>

                      <label className="flex items-center justify-between p-4 bg-[#151515] rounded-xl cursor-pointer">
                        <p className="font-medium text-white">Připomínky eventů</p>
                        <input
                          type="checkbox"
                          checked={eventReminders}
                          onChange={(e) => setEventReminders(e.target.checked)}
                          className="w-5 h-5 rounded accent-konekt-green"
                        />
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Integrations Tab */}
              {activeTab === 'integrations' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-1">Integrace</h2>
                    <p className="text-sm text-white/60">
                      Připoj své účty a sdílej více o sobě
                    </p>
                  </div>

                  {/* Social Accounts */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Sociální sítě</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-4 bg-[#151515] rounded-xl">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                            in
                          </div>
                          <div>
                            <p className="font-medium text-white">LinkedIn</p>
                            <p className="text-xs text-white/60">Propojit profesní profil</p>
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          Připojit
                        </Button>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-[#151515] rounded-xl">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-white">
                            GH
                          </div>
                          <div>
                            <p className="font-medium text-white">GitHub</p>
                            <p className="text-xs text-white/60">Zobraz své repositories</p>
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          Připojit
                        </Button>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-[#151515] rounded-xl">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-sky-500 rounded-lg flex items-center justify-center text-white">
                            X
                          </div>
                          <div>
                            <p className="font-medium text-white">Twitter / X</p>
                            <p className="text-xs text-white/60">Sdílej své tweety</p>
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          Připojit
                        </Button>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-[#151515] rounded-xl">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-konekt-green rounded-lg flex items-center justify-center text-white">
                            🌐
                          </div>
                          <div>
                            <p className="font-medium text-white">Portfolio Website</p>
                            <p className="text-xs text-white/60">Link na tvé portfolio</p>
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          Přidat
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Personality Tests */}
                  <div className="pt-6 border-t border-white/10">
                    <h3 className="text-lg font-semibold text-white mb-3">Osobnostní testy</h3>
                    <div className="space-y-3">
                      <div className="p-4 bg-konekt-pink/10 border border-konekt-pink/20 rounded-xl">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="font-medium text-white">16 Personalities (MBTI)</p>
                            <p className="text-xs text-white/60 mt-0.5">
                              Zjisti svůj personality type
                            </p>
                          </div>
                          <Button size="sm" variant="outline">
                            Přidat výsledek
                          </Button>
                        </div>
                        <p className="text-xs text-white/50">
                          💡 Můžeš uploadnout screenshot nebo vyplnit manuálně
                        </p>
                      </div>

                      <div className="p-4 bg-konekt-green/10 border border-konekt-green/20 rounded-xl">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="font-medium text-white">Big Five Personality</p>
                            <p className="text-xs text-white/60 mt-0.5">
                              OCEAN model personality traits
                            </p>
                          </div>
                          <Button size="sm" variant="outline">
                            Přidat výsledek
                          </Button>
                        </div>
                      </div>

                      <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="font-medium text-white">CliftonStrengths</p>
                            <p className="text-xs text-white/60 mt-0.5">
                              Zobraz své top 5 strengths
                            </p>
                          </div>
                          <Button size="sm" variant="outline">
                            Přidat výsledek
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Info Box */}
                  <div className="p-4 bg-[#151515] border-2 border-white/10 rounded-xl">
                    <p className="text-sm text-white/70">
                      <strong>💡 Proč přidat integrace?</strong>
                      <br />
                      Propojené účty a osobnostní testy pomáhají ostatním lépe tě poznat a najít
                      spolupráci, která ti sedne. Všechny informace jsou volitelné a můžeš je kdykoli
                      upravit.
                    </p>
                  </div>
                </div>
              )}

              {/* Referral Tab */}
              {activeTab === 'referral' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-1">Pozvi přátele</h2>
                    <p className="text-sm text-white/60">
                      Za každé 3 pozvané získáš 1 měsíc Premium zdarma
                    </p>
                  </div>

                  {/* Referral Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-6 bg-gradient-to-br from-konekt-green/10 to-konekt-green/5 rounded-xl border-2 border-konekt-green/20">
                      <div className="text-3xl font-bold text-konekt-green mb-1">
                        {referredUsers}
                      </div>
                      <div className="text-sm text-white/60">Pozvaných přátel</div>
                    </div>

                    <div className="p-6 bg-gradient-to-br from-konekt-pink/10 to-konekt-pink/5 rounded-xl border-2 border-konekt-pink/20">
                      <div className="text-3xl font-bold text-konekt-pink mb-1">
                        {Math.floor(referredUsers / 3)}
                      </div>
                      <div className="text-sm text-white/60">Měsíců Premium získáno</div>
                    </div>

                    <div className="p-6 bg-gradient-to-br from-yellow-500/10 to-yellow-500/5 rounded-xl border-2 border-yellow-500/20">
                      <div className="text-3xl font-bold text-yellow-600 mb-1">
                        {3 - (referredUsers % 3)}
                      </div>
                      <div className="text-sm text-white/60">Zbývá do dalšího měsíce</div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="p-6 bg-[#151515] rounded-xl">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-medium text-white">Postup k dalšímu měsíci Premium</span>
                      <span className="text-sm text-white/60">{referredUsers % 3} / 3</span>
                    </div>
                    <div className="w-full h-3 bg-[#1a1a1a] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-konekt-green to-konekt-pink transition-all duration-500"
                        style={{ width: `${((referredUsers % 3) / 3) * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Referral Link */}
                  <div>
                    <h3 className="font-bold text-white mb-3">Tvůj referral link</h3>
                    <div className="flex gap-3">
                      <div className="flex-1 p-4 bg-[#151515] rounded-xl border-2 border-white/10 font-mono text-sm text-white/70 truncate">
                        {referralLink}
                      </div>
                      <Button
                        onClick={() => {
                          navigator.clipboard.writeText(referralLink);
                          setCopied(true);
                          setTimeout(() => setCopied(false), 2000);
                        }}
                        className="flex items-center gap-2"
                      >
                        {copied ? (
                          <>
                            <Check className="w-4 h-4" />
                            Zkopírováno!
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" />
                            Kopírovat
                          </>
                        )}
                      </Button>
                    </div>
                  </div>

                  {/* Referred Users List */}
                  {referredUsers > 0 && (
                    <div>
                      <h3 className="font-bold text-white mb-3">Pozvaní přátelé</h3>
                      <div className="space-y-2">
                        {Array.from({ length: Math.min(referredUsers, 5) }).map((_, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between p-3 bg-[#151515] rounded-xl"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-konekt-green rounded-full flex items-center justify-center text-konekt-white font-bold">
                                {String.fromCharCode(65 + idx)}
                              </div>
                              <div>
                                <div className="font-medium text-white">
                                  User {idx + 1}
                                </div>
                                <div className="text-xs text-white/60">
                                  Připojen{' '}
                                  {new Date(
                                    Date.now() - (idx + 1) * 7 * 24 * 60 * 60 * 1000
                                  ).toLocaleDateString('cs-CZ')}
                                </div>
                              </div>
                            </div>
                            <div className="px-3 py-1 bg-konekt-green/10 text-konekt-green rounded-full text-xs font-medium">
                              Aktivní
                            </div>
                          </div>
                        ))}
                        {referredUsers > 5 && (
                          <div className="text-center text-sm text-white/60 pt-2">
                            A {referredUsers - 5} dalších...
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* How it Works */}
                  <div className="p-6 bg-gradient-to-br from-konekt-green/5 to-konekt-pink/5 border-2 border-white/10 rounded-xl">
                    <h3 className="font-bold text-white mb-4">Jak to funguje?</h3>
                    <div className="space-y-3">
                      <div className="flex gap-3">
                        <div className="w-8 h-8 bg-konekt-green text-konekt-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                          1
                        </div>
                        <div>
                          <div className="font-medium text-white">Sdílej svůj link</div>
                          <div className="text-sm text-white/60">
                            Pošli referral link svým přátelům nebo sdílej na sociálních sítích
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <div className="w-8 h-8 bg-konekt-green text-konekt-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                          2
                        </div>
                        <div>
                          <div className="font-medium text-white">Přátelé se registrují</div>
                          <div className="text-sm text-white/60">
                            Když se registrují přes tvůj link, automaticky se to započítá
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <div className="w-8 h-8 bg-konekt-green text-konekt-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                          3
                        </div>
                        <div>
                          <div className="font-medium text-white">Získej Premium</div>
                          <div className="text-sm text-white/60">
                            Za každé 3 aktivní pozvané automaticky dostaneš 1 měsíc Premium
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Preferences Tab (Dark Mode + Export) */}
              {activeTab === 'preferences' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-1">Vzhled & Export</h2>
                    <p className="text-sm text-white/60">
                      Přizpůsob si prostředí a exportuj svá data
                    </p>
                  </div>

                  {/* Theme Selection */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Vzhled aplikace</h3>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      {/* Light Mode Card */}
                      <button
                        onClick={() => setTheme('light')}
                        className={`p-6 rounded-xl border-2 transition-all ${
                          theme === 'light'
                            ? 'border-konekt-green bg-konekt-green/5'
                            : 'border-white/10 bg-[#151515] hover:border-konekt-green/50'
                        }`}
                      >
                        <div className="flex flex-col items-center gap-3">
                          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 to-orange-400 flex items-center justify-center">
                            <Sun className="w-8 h-8 text-white" />
                          </div>
                          <div className="text-center">
                            <div className="font-bold text-white mb-1">Light Mode</div>
                            <div className="text-xs text-white/60">
                              Světlé pozadí, lepší čitelnost ve dne
                            </div>
                          </div>
                          {theme === 'light' && (
                            <div className="mt-2 px-3 py-1 bg-konekt-green text-white rounded-full text-xs font-medium">
                              ✓ Aktivní
                            </div>
                          )}
                        </div>
                      </button>

                      {/* Dark Mode Card */}
                      <button
                        onClick={() => setTheme('dark')}
                        className={`p-6 rounded-xl border-2 transition-all ${
                          theme === 'dark'
                            ? 'border-indigo-600 bg-indigo-600/5'
                            : 'border-white/10 bg-[#151515] hover:border-indigo-600/50'
                        }`}
                      >
                        <div className="flex flex-col items-center gap-3">
                          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center">
                            <Moon className="w-8 h-8 text-white" />
                          </div>
                          <div className="text-center">
                            <div className="font-bold text-white mb-1">Dark Mode</div>
                            <div className="text-xs text-white/60">
                              Tmavé pozadí, šetří oči v noci
                            </div>
                          </div>
                          {theme === 'dark' && (
                            <div className="mt-2 px-3 py-1 bg-indigo-600 text-white rounded-full text-xs font-medium">
                              ✓ Aktivní
                            </div>
                          )}
                        </div>
                      </button>
                    </div>

                    {/* Info Box */}
                    <div className="p-4 bg-[#151515] border-2 border-white/10 rounded-xl">
                      <p className="text-sm text-white/70">
                        <strong>💡 Tip:</strong> Theme se automaticky ukládá a aplikuje při každé návštěvě.
                        Změna se projeví okamžitě na celé platformě.
                      </p>
                    </div>
                  </div>

                  {/* Export Data Section */}
                  <div className="pt-6 border-t border-white/10">
                    <h3 className="text-lg font-semibold text-white mb-4">Export dat</h3>

                    {/* Export Profile to PDF */}
                    <div className="p-6 bg-[#151515] rounded-xl mb-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Download className="w-5 h-5 text-konekt-green" />
                            <h4 className="font-medium text-white">
                              Stáhnout profil jako PDF
                            </h4>
                          </div>
                          <p className="text-sm text-white/60 mb-4">
                            Exportuj svůj kompletní profil do PDF pro použití mimo platformu.
                            Obsahuje tvoje info, skills, projekty a odznaky.
                          </p>
                          <div className="text-xs text-white/50 mb-4">
                            PDF bude obsahovat:
                            <ul className="list-disc list-inside mt-2 space-y-1">
                              <li>Osobní informace a bio</li>
                              <li>Skills a oblasti zájmu</li>
                              <li>Projekty a portfolio</li>
                              <li>Achievement badges</li>
                              <li>Kontaktní údaje</li>
                            </ul>
                          </div>
                          <Button className="flex items-center gap-2">
                            <Download className="w-4 h-4" />
                            Stáhnout PDF profilu
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Export All Data */}
                    <div className="p-6 bg-[#151515] rounded-xl">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Download className="w-5 h-5 text-konekt-pink" />
                            <h4 className="font-medium text-white">
                              Stáhnout všechna data (GDPR)
                            </h4>
                          </div>
                          <p className="text-sm text-white/60 mb-4">
                            Stáhni kompletní kopii všech svých dat z platformy v JSON formátu.
                            Zahrnuje zprávy, projekty, aktivity a další.
                          </p>
                          <Button variant="outline" className="flex items-center gap-2">
                            <Download className="w-4 h-4" />
                            Exportovat všechna data
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* QR Code Section */}
                  <div className="pt-6 border-t border-white/10">
                    <h3 className="text-lg font-semibold text-white mb-4">
                      QR kód profilu
                    </h3>
                    <div className="p-6 bg-gradient-to-br from-konekt-green/10 to-konekt-pink/10 border-2 border-white/10 rounded-xl">
                      <div className="flex items-start gap-6">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <QrCode className="w-5 h-5 text-konekt-green" />
                            <h4 className="font-medium text-white">
                              Sdílej profil přes QR kód
                            </h4>
                          </div>
                          <p className="text-sm text-white/60 mb-4">
                            Perfektní pro networking na eventtech IRL! Ostatní můžou naskenovat QR
                            kód a okamžitě se dostat na tvůj profil.
                          </p>
                          <Button variant="outline" className="flex items-center gap-2">
                            <QrCode className="w-4 h-4" />
                            Zobrazit QR kód
                          </Button>
                        </div>
                        {/* QR Code Mockup */}
                        <div className="w-32 h-32 bg-[#1a1a1a] border-2 border-konekt-black/20 rounded-xl flex items-center justify-center flex-shrink-0">
                          <div className="text-center">
                            <QrCode className="w-16 h-16 text-white/30 mx-auto mb-2" />
                            <div className="text-xs text-white/40">QR Preview</div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 p-3 bg-[#1a1a1a]/50 rounded-lg">
                        <p className="text-xs text-white/60">
                          💡 Tento QR kód povede na: <span className="font-mono">konekt.cz/profile/{user?.username}</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-4 bg-[#151515] border-2 border-white/10 rounded-xl">
                    <p className="text-sm text-white/70">
                      <strong>🔒 Tvoje data jsou v bezpečí</strong>
                      <br />
                      Všechna data jsou šifrována a můžeš je kdykoli exportovat nebo smazat podle
                      GDPR. Máš plnou kontrolu nad svými informacemi.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </main>
        </div>
    </AppLayout>
  );
}
