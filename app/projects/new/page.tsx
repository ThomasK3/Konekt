'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/lib/store';
import Link from 'next/link';
import { X, Plus } from 'lucide-react';

const commonTech = [
  'React',
  'Next.js',
  'TypeScript',
  'Node.js',
  'Python',
  'Flutter',
  'Figma',
  'Firebase',
  'PostgreSQL',
];

const commonRoles = [
  'Frontend Developer',
  'Backend Developer',
  'Full-stack Developer',
  'Designer',
  'Product Manager',
  'Marketing',
];

export default function NewProjectPage() {
  const router = useRouter();
  const user = useUserStore((state) => state.user);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [stack, setStack] = useState<string[]>([]);
  const [newTech, setNewTech] = useState('');
  const [stage, setStage] = useState<'idea' | 'mvp' | 'launched'>('idea');
  const [newRole, setNewRole] = useState('');
  const [lookingFor, setLookingFor] = useState<Array<{ role: string; count: number; skills: string[] }>>([]);

  const addTech = (tech: string) => {
    if (tech && !stack.includes(tech)) {
      setStack([...stack, tech]);
      setNewTech('');
    }
  };

  const removeTech = (tech: string) => {
    setStack(stack.filter((t) => t !== tech));
  };

  const addRole = () => {
    if (newRole && !lookingFor.find((r) => r.role === newRole)) {
      setLookingFor([...lookingFor, { role: newRole, count: 1, skills: [] }]);
      setNewRole('');
    }
  };

  const removeRole = (roleToRemove: string) => {
    setLookingFor(lookingFor.filter((r) => r.role !== roleToRemove));
  };

  const handleSubmit = () => {
    // In real app, this would save to database
    alert('Projekt vytvořen! (V reálné aplikaci by se uložil do databáze)');
    router.push('/projects');
  };

  const isValid = name && description && stack.length > 0;

  if (!user) {
    return (
      <div className="min-h-screen bg-konekt-cream flex items-center justify-center">
        <Card>
          <p className="text-konekt-black/60 mb-4">Musíš být přihlášený</p>
          <Button onClick={() => router.push('/register')}>Registrovat se</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-konekt-cream">
      {/* Header */}
      <header className="bg-konekt-white border-b-2 border-konekt-black/10">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <Link href="/projects" className="text-2xl font-bold text-konekt-black hover:text-konekt-green transition-colors">
            Konekt
          </Link>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-konekt-black mb-2">Nový projekt</h1>
          <p className="text-konekt-black/60">Sdílej svůj nápad a najdi spolupracovníky</p>
        </div>

        <Card className="space-y-6">
          <Input
            label="Název projektu"
            placeholder="StudyBuddy AI, EventMatch..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Textarea
            label="Popis"
            placeholder="Co je cílem projektu? Jaký problém řeší?"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
          />

          {/* Tech Stack */}
          <div>
            <label className="block text-sm font-medium text-konekt-black mb-2">
              Tech Stack
            </label>
            <div className="flex gap-2 mb-3">
              <Input
                placeholder="Přidat technologii..."
                value={newTech}
                onChange={(e) => setNewTech(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addTech(newTech);
                  }
                }}
              />
              <Button onClick={() => addTech(newTech)} variant="outline" className="shrink-0">
                <Plus className="w-5 h-5" />
              </Button>
            </div>

            {stack.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {stack.map((tech) => (
                  <div
                    key={tech}
                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-konekt-green text-konekt-white rounded-full text-sm"
                  >
                    {tech}
                    <button onClick={() => removeTech(tech)}>
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="flex flex-wrap gap-2">
              {commonTech
                .filter((t) => !stack.includes(t))
                .map((tech) => (
                  <button
                    key={tech}
                    onClick={() => addTech(tech)}
                    className="px-3 py-1.5 bg-konekt-white border-2 border-konekt-black/10 rounded-full text-sm
                      hover:border-konekt-green hover:text-konekt-green transition-colors"
                  >
                    + {tech}
                  </button>
                ))}
            </div>
          </div>

          {/* Stage */}
          <div>
            <label className="block text-sm font-medium text-konekt-black mb-3">
              Fáze projektu
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: 'idea' as const, label: '💡 Idea' },
                { value: 'mvp' as const, label: '🚀 MVP' },
                { value: 'launched' as const, label: '✨ Launched' },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setStage(option.value)}
                  className={`px-4 py-3 rounded-xl border-2 font-medium transition-all ${
                    stage === option.value
                      ? 'bg-konekt-green text-konekt-white border-konekt-green'
                      : 'bg-konekt-white text-konekt-black border-konekt-black/10 hover:border-konekt-green'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Looking For */}
          <div>
            <label className="block text-sm font-medium text-konekt-black mb-2">
              Koho hledáš do týmu? (volitelné)
            </label>
            <div className="flex gap-2 mb-3">
              <Input
                placeholder="Role (např. Frontend Developer)..."
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addRole();
                  }
                }}
              />
              <Button onClick={addRole} variant="outline" className="shrink-0">
                <Plus className="w-5 h-5" />
              </Button>
            </div>

            {lookingFor.length > 0 && (
              <div className="space-y-2 mb-3">
                {lookingFor.map((role) => (
                  <div
                    key={role.role}
                    className="flex items-center justify-between p-3 bg-konekt-pink/10 rounded-lg"
                  >
                    <span className="text-sm font-medium text-konekt-pink">{role.role}</span>
                    <button
                      onClick={() => removeRole(role.role)}
                      className="text-konekt-pink hover:opacity-70"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="flex flex-wrap gap-2">
              {commonRoles
                .filter((r) => !lookingFor.find((lf) => lf.role === r))
                .map((role) => (
                  <button
                    key={role}
                    onClick={() => {
                      setLookingFor([...lookingFor, { role, count: 1, skills: [] }]);
                    }}
                    className="px-3 py-1.5 bg-konekt-white border-2 border-konekt-black/10 rounded-full text-sm
                      hover:border-konekt-pink hover:text-konekt-pink transition-colors"
                  >
                    + {role}
                  </button>
                ))}
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button onClick={() => router.push('/projects')} variant="outline" className="flex-1">
              Zrušit
            </Button>
            <Button onClick={handleSubmit} disabled={!isValid} className="flex-1">
              Vytvořit projekt
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
