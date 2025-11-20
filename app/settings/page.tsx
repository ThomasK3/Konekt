'use client';

import { useState } from 'react';
import { useUserStore } from '@/lib/store';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
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
} from 'lucide-react';
import AppLayout from '@/components/layout/AppLayout';

type TabType = 'profile' | 'account' | 'privacy' | 'notifications' | 'integrations';

export default function SettingsPage() {
  const { user, setUser } = useUserStore();
  const [activeTab, setActiveTab] = useState<TabType>('profile');

  // Profile state
  const [name, setName] = useState(user?.name || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [skills, setSkills] = useState<string[]>(user?.skills || []);
  const [newSkill, setNewSkill] = useState('');
  const [lookingFor, setLookingFor] = useState<string[]>(user?.lookingFor || []);
  const [newRole, setNewRole] = useState('');

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
      <div className="min-h-screen bg-konekt-cream flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-konekt-black mb-4">
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
          <h1 className="text-3xl font-bold text-konekt-black mb-2">⚙️ Nastavení</h1>
          <p className="text-konekt-black/60">Spravuj svůj účet a předvolby</p>
        </div>

        <div className="flex gap-8">
          {/* Tabs Sidebar */}
          <aside className="w-64 flex-shrink-0">
            <div className="bg-konekt-white rounded-2xl border-2 border-konekt-black/10 overflow-hidden">
              <nav className="p-2">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all mb-1 ${
                    activeTab === 'profile'
                      ? 'bg-konekt-green text-konekt-white'
                      : 'text-konekt-black/70 hover:bg-konekt-cream hover:text-konekt-black'
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
                      : 'text-konekt-black/70 hover:bg-konekt-cream hover:text-konekt-black'
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
                      : 'text-konekt-black/70 hover:bg-konekt-cream hover:text-konekt-black'
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
                      : 'text-konekt-black/70 hover:bg-konekt-cream hover:text-konekt-black'
                  }`}
                >
                  <Bell className="w-5 h-5" />
                  <span>Notifikace</span>
                </button>

                <button
                  onClick={() => setActiveTab('integrations')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                    activeTab === 'integrations'
                      ? 'bg-konekt-green text-konekt-white'
                      : 'text-konekt-black/70 hover:bg-konekt-cream hover:text-konekt-black'
                  }`}
                >
                  <Plug className="w-5 h-5" />
                  <span>Integrace</span>
                </button>
              </nav>
            </div>
          </aside>

          {/* Content */}
          <main className="flex-1">
            <div className="bg-konekt-white rounded-2xl border-2 border-konekt-black/10 p-8">
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-konekt-black mb-1">Upravit profil</h2>
                    <p className="text-sm text-konekt-black/60">
                      Změň své profilové informace a bio
                    </p>
                  </div>

                  {/* Profile Picture */}
                  <div>
                    <label className="block text-sm font-medium text-konekt-black mb-3">
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
                    <label className="block text-sm font-medium text-konekt-black mb-2">
                      Jméno
                    </label>
                    <Input value={name} onChange={(e) => setName(e.target.value)} />
                  </div>

                  {/* Bio */}
                  <div>
                    <label className="block text-sm font-medium text-konekt-black mb-2">Bio</label>
                    <textarea
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      rows={4}
                      className="w-full px-4 py-3 bg-konekt-cream border-2 border-konekt-black/10 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-konekt-green focus:border-transparent"
                    />
                  </div>

                  {/* Skills */}
                  <div>
                    <label className="block text-sm font-medium text-konekt-black mb-2">
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
                    <div className="flex flex-wrap gap-2">
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
                    <label className="block text-sm font-medium text-konekt-black mb-2">
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

                  <div className="pt-4 border-t border-konekt-black/10">
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
                    <h2 className="text-2xl font-bold text-konekt-black mb-1">Nastavení účtu</h2>
                    <p className="text-sm text-konekt-black/60">
                      Změň email, heslo nebo smaž účet
                    </p>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-konekt-black mb-2">
                      Email
                    </label>
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  {/* Change Password */}
                  <div className="pt-6 border-t border-konekt-black/10">
                    <h3 className="text-lg font-semibold text-konekt-black mb-4">Změnit heslo</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-konekt-black mb-2">
                          Současné heslo
                        </label>
                        <Input
                          type="password"
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-konekt-black mb-2">
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
                  <div className="pt-6 border-t border-konekt-black/10">
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
                    <h2 className="text-2xl font-bold text-konekt-black mb-1">Soukromí</h2>
                    <p className="text-sm text-konekt-black/60">
                      Kontroluj, kdo může vidět tvůj profil a kontaktovat tě
                    </p>
                  </div>

                  {/* Profile Visibility */}
                  <div>
                    <label className="block text-sm font-medium text-konekt-black mb-3">
                      Kdo může vidět můj profil
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center gap-3 p-4 bg-konekt-cream rounded-xl cursor-pointer hover:bg-konekt-green/5 transition-colors border-2 border-konekt-black/10">
                        <input
                          type="radio"
                          name="visibility"
                          checked={profileVisibility === 'everyone'}
                          onChange={() => setProfileVisibility('everyone')}
                          className="w-5 h-5 accent-konekt-green"
                        />
                        <div>
                          <p className="font-medium text-konekt-black">Všichni</p>
                          <p className="text-sm text-konekt-black/60">
                            Kdokoliv na platformě může vidět tvůj profil
                          </p>
                        </div>
                      </label>
                      <label className="flex items-center gap-3 p-4 bg-konekt-cream rounded-xl cursor-pointer hover:bg-konekt-green/5 transition-colors border-2 border-konekt-black/10">
                        <input
                          type="radio"
                          name="visibility"
                          checked={profileVisibility === 'events-only'}
                          onChange={() => setProfileVisibility('events-only')}
                          className="w-5 h-5 accent-konekt-green"
                        />
                        <div>
                          <p className="font-medium text-konekt-black">Jen z akcí</p>
                          <p className="text-sm text-konekt-black/60">
                            Pouze lidé ze stejných eventů mohou vidět tvůj profil
                          </p>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Who Can Message */}
                  <div className="pt-6 border-t border-konekt-black/10">
                    <label className="block text-sm font-medium text-konekt-black mb-3">
                      Kdo mi může psát
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center gap-3 p-4 bg-konekt-cream rounded-xl cursor-pointer hover:bg-konekt-green/5 transition-colors border-2 border-konekt-black/10">
                        <input
                          type="radio"
                          name="messaging"
                          checked={whoCanMessage === 'everyone'}
                          onChange={() => setWhoCanMessage('everyone')}
                          className="w-5 h-5 accent-konekt-green"
                        />
                        <p className="font-medium text-konekt-black">Kdokoliv</p>
                      </label>
                      <label className="flex items-center gap-3 p-4 bg-konekt-cream rounded-xl cursor-pointer hover:bg-konekt-green/5 transition-colors border-2 border-konekt-black/10">
                        <input
                          type="radio"
                          name="messaging"
                          checked={whoCanMessage === 'connections'}
                          onChange={() => setWhoCanMessage('connections')}
                          className="w-5 h-5 accent-konekt-green"
                        />
                        <p className="font-medium text-konekt-black">Pouze spojení</p>
                      </label>
                    </div>
                  </div>

                  {/* Online Status */}
                  <div className="pt-6 border-t border-konekt-black/10">
                    <label className="flex items-center justify-between p-4 bg-konekt-cream rounded-xl cursor-pointer">
                      <div>
                        <p className="font-medium text-konekt-black mb-1">
                          Zobrazit online status
                        </p>
                        <p className="text-sm text-konekt-black/60">
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
                    <h2 className="text-2xl font-bold text-konekt-black mb-1">Notifikace</h2>
                    <p className="text-sm text-konekt-black/60">
                      Spravuj, jak a kdy chceš dostávat notifikace
                    </p>
                  </div>

                  {/* Email Notifications */}
                  <label className="flex items-center justify-between p-4 bg-konekt-cream rounded-xl cursor-pointer">
                    <div>
                      <p className="font-medium text-konekt-black mb-1">Email notifikace</p>
                      <p className="text-sm text-konekt-black/60">
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

                  <div className="pt-6 border-t border-konekt-black/10">
                    <p className="text-sm font-semibold text-konekt-black/60 mb-3">
                      Notifikace v aplikaci
                    </p>
                    <div className="space-y-2">
                      <label className="flex items-center justify-between p-4 bg-konekt-cream rounded-xl cursor-pointer">
                        <p className="font-medium text-konekt-black">Nové zprávy</p>
                        <input
                          type="checkbox"
                          checked={newMessages}
                          onChange={(e) => setNewMessages(e.target.checked)}
                          className="w-5 h-5 rounded accent-konekt-green"
                        />
                      </label>

                      <label className="flex items-center justify-between p-4 bg-konekt-cream rounded-xl cursor-pointer">
                        <p className="font-medium text-konekt-black">Zájem o projekty</p>
                        <input
                          type="checkbox"
                          checked={projectInterest}
                          onChange={(e) => setProjectInterest(e.target.checked)}
                          className="w-5 h-5 rounded accent-konekt-green"
                        />
                      </label>

                      <label className="flex items-center justify-between p-4 bg-konekt-cream rounded-xl cursor-pointer">
                        <p className="font-medium text-konekt-black">Připomínky eventů</p>
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
                    <h2 className="text-2xl font-bold text-konekt-black mb-1">Integrace</h2>
                    <p className="text-sm text-konekt-black/60">
                      Připoj své účty a sdílej více o sobě
                    </p>
                  </div>

                  {/* Social Accounts */}
                  <div>
                    <h3 className="text-lg font-semibold text-konekt-black mb-3">Sociální sítě</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-4 bg-konekt-cream rounded-xl">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                            in
                          </div>
                          <div>
                            <p className="font-medium text-konekt-black">LinkedIn</p>
                            <p className="text-xs text-konekt-black/60">Propojit profesní profil</p>
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          Připojit
                        </Button>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-konekt-cream rounded-xl">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-white">
                            GH
                          </div>
                          <div>
                            <p className="font-medium text-konekt-black">GitHub</p>
                            <p className="text-xs text-konekt-black/60">Zobraz své repositories</p>
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          Připojit
                        </Button>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-konekt-cream rounded-xl">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-sky-500 rounded-lg flex items-center justify-center text-white">
                            X
                          </div>
                          <div>
                            <p className="font-medium text-konekt-black">Twitter / X</p>
                            <p className="text-xs text-konekt-black/60">Sdílej své tweety</p>
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          Připojit
                        </Button>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-konekt-cream rounded-xl">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-konekt-green rounded-lg flex items-center justify-center text-white">
                            🌐
                          </div>
                          <div>
                            <p className="font-medium text-konekt-black">Portfolio Website</p>
                            <p className="text-xs text-konekt-black/60">Link na tvé portfolio</p>
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          Přidat
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Personality Tests */}
                  <div className="pt-6 border-t border-konekt-black/10">
                    <h3 className="text-lg font-semibold text-konekt-black mb-3">Osobnostní testy</h3>
                    <div className="space-y-3">
                      <div className="p-4 bg-konekt-pink/10 border border-konekt-pink/20 rounded-xl">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="font-medium text-konekt-black">16 Personalities (MBTI)</p>
                            <p className="text-xs text-konekt-black/60 mt-0.5">
                              Zjisti svůj personality type
                            </p>
                          </div>
                          <Button size="sm" variant="outline">
                            Přidat výsledek
                          </Button>
                        </div>
                        <p className="text-xs text-konekt-black/50">
                          💡 Můžeš uploadnout screenshot nebo vyplnit manuálně
                        </p>
                      </div>

                      <div className="p-4 bg-konekt-green/10 border border-konekt-green/20 rounded-xl">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="font-medium text-konekt-black">Big Five Personality</p>
                            <p className="text-xs text-konekt-black/60 mt-0.5">
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
                            <p className="font-medium text-konekt-black">CliftonStrengths</p>
                            <p className="text-xs text-konekt-black/60 mt-0.5">
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
                  <div className="p-4 bg-konekt-cream border-2 border-konekt-black/10 rounded-xl">
                    <p className="text-sm text-konekt-black/70">
                      <strong>💡 Proč přidat integrace?</strong>
                      <br />
                      Propojené účty a osobnostní testy pomáhají ostatním lépe tě poznat a najít
                      spolupráci, která ti sedne. Všechny informace jsou volitelné a můžeš je kdykoli
                      upravit.
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
