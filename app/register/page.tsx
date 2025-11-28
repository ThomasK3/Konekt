'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';

// Dynamically import registration components to avoid SSR issues
const IntroScreen = dynamic(() => import('@/components/registration/IntroScreen').then(mod => ({ default: mod.IntroScreen })), { ssr: false });
const ArchetypeSelection = dynamic(() => import('@/components/registration/ArchetypeSelection').then(mod => ({ default: mod.ArchetypeSelection })), { ssr: false });
const AvatarCreation = dynamic(() => import('@/components/registration/AvatarCreation').then(mod => ({ default: mod.AvatarCreation })), { ssr: false });
const SkillsBuilder = dynamic(() => import('@/components/registration/SkillsBuilder').then(mod => ({ default: mod.SkillsBuilder })), { ssr: false });
const QuestSetup = dynamic(() => import('@/components/registration/QuestSetup').then(mod => ({ default: mod.QuestSetup })), { ssr: false });
const StoryMode = dynamic(() => import('@/components/registration/StoryMode').then(mod => ({ default: mod.StoryMode })), { ssr: false });
const VideoChallenge = dynamic(() => import('@/components/registration/VideoChallenge').then(mod => ({ default: mod.VideoChallenge })), { ssr: false });
const PowerUps = dynamic(() => import('@/components/registration/PowerUps').then(mod => ({ default: mod.PowerUps })), { ssr: false });
const ProfileReveal = dynamic(() => import('@/components/registration/ProfileReveal').then(mod => ({ default: mod.ProfileReveal })), { ssr: false });

export interface RegistrationData {
  // Step 1: Archetype
  archetype?: string;

  // Step 2: Avatar
  avatar?: string;
  avatarStyle?: 'photo' | 'illustrated' | '3d-emoji' | 'abstract' | 'minimalist';
  avatarBackground?: string;
  avatarFrame?: 'none' | 'circle' | 'hexagon' | 'squircle';
  avatarEffects?: string[];

  // Step 3: Skills
  skills: string[];
  skillLevels: { [skill: string]: number };

  // Step 4: Quest
  lookingFor: string[];
  availability?: string;
  location?: string;
  remoteOk?: boolean;

  // Step 5: Story
  oneLiner?: string;
  workingOn?: string;
  superpower?: string;
  bio?: string;

  // Step 6: Video
  videoUrl?: string;

  // Step 7: Power-ups
  integrations?: {
    github?: string;
    linkedin?: string;
    portfolio?: string;
    personality?: string;
  };
}

export default function RegisterPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [showIntro, setShowIntro] = useState(true);
  const [data, setData] = useState<RegistrationData>({
    skills: [],
    skillLevels: {},
    lookingFor: [],
  });

  const totalSteps = 7;

  const updateData = (updates: Partial<RegistrationData>) => {
    setData((prev) => ({ ...prev, ...updates }));
    // Auto-save to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('konekt-registration', JSON.stringify({ ...data, ...updates }));
    }
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const skipStep = () => {
    nextStep();
  };

  if (showIntro) {
    return <IntroScreen onStart={() => setShowIntro(false)} onSkip={() => router.push('/dashboard')} />;
  }

  const steps = [
    <ArchetypeSelection key="archetype" data={data} updateData={updateData} onNext={nextStep} />,
    <AvatarCreation key="avatar" data={data} updateData={updateData} onNext={nextStep} />,
    <SkillsBuilder key="skills" data={data} updateData={updateData} onNext={nextStep} />,
    <QuestSetup key="quest" data={data} updateData={updateData} onNext={nextStep} />,
    <StoryMode key="story" data={data} updateData={updateData} onNext={nextStep} />,
    <VideoChallenge key="video" data={data} updateData={updateData} onNext={nextStep} onSkip={skipStep} />,
    <PowerUps key="powerups" data={data} updateData={updateData} onNext={nextStep} onSkip={skipStep} />,
  ];

  if (currentStep >= totalSteps) {
    return <ProfileReveal data={data} />;
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white overflow-hidden">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-[#151515] border-b border-white/10 backdrop-blur-xl bg-opacity-80">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                currentStep === 0
                  ? 'text-white/30 cursor-not-allowed'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              Back
            </button>

            <span className="text-sm font-semibold text-white/60">
              Step {currentStep + 1} of {totalSteps}
            </span>

            <button
              onClick={skipStep}
              className="text-sm font-medium text-white/60 hover:text-white transition-colors"
            >
              Skip →
            </button>
          </div>

          {/* Progress bar */}
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-konekt-green via-emerald-400 to-konekt-pink"
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            />
          </div>
        </div>
      </div>

      {/* Step Content */}
      <div className="pt-24 pb-12 px-6">
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {steps[currentStep]}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
