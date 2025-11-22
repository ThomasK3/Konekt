'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useUserStore } from '@/lib/store';
import { ArrowLeft, ArrowRight, Check, Rocket } from 'lucide-react';
import { ProjectBasics } from '@/components/projects/ProjectBasics';
import { ProjectDescription } from '@/components/projects/ProjectDescription';
import { ProjectMedia } from '@/components/projects/ProjectMedia';
import { ProjectTechStack } from '@/components/projects/ProjectTechStack';
import { ProjectTeam } from '@/components/projects/ProjectTeam';
import { ProjectSettings } from '@/components/projects/ProjectSettings';

interface ProjectData {
  // Step 1: Basics
  name: string;
  oneLiner: string;
  category: string;
  stage: string;
  // Step 2: Description
  description: string;
  // Step 3: Media
  coverImage?: string;
  coverVideo?: string;
  gallery: Array<{ id: string; type: 'image' | 'video'; url: string; caption?: string }>;
  // Step 4: Tech & Links
  stack: string[];
  links: {
    demo?: string;
    github?: string;
    figma?: string;
    website?: string;
    video?: string;
  };
  // Step 5: Team
  lookingForHelp: boolean;
  lookingFor: Array<{ role: string; skills: string[]; count: number }>;
  collaborationMessage?: string;
  // Step 6: Settings
  visibility: 'public' | 'private' | 'unlisted';
  allowComments: boolean;
  tags: string[];
}

const steps = [
  { id: 1, label: 'Basics', icon: '📝' },
  { id: 2, label: 'Story', icon: '📖' },
  { id: 3, label: 'Media', icon: '🎨' },
  { id: 4, label: 'Tech', icon: '⚡' },
  { id: 5, label: 'Team', icon: '👥' },
  { id: 6, label: 'Launch', icon: '🚀' },
];

export default function NewProjectPage() {
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState<ProjectData>({
    name: '',
    oneLiner: '',
    category: '',
    stage: '',
    description: '',
    gallery: [],
    stack: [],
    links: {},
    lookingForHelp: false,
    lookingFor: [],
    visibility: 'public',
    allowComments: true,
    tags: [],
  });

  // Auto-save to localStorage
  useEffect(() => {
    const saved = localStorage.getItem('konekt-new-project');
    if (saved) {
      try {
        setData(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load saved project data');
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('konekt-new-project', JSON.stringify(data));
  }, [data]);

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return data.name && data.oneLiner && data.category && data.stage;
      case 2:
        return data.description.length >= 50;
      case 3:
        return true; // Media is optional
      case 4:
        return data.stack.length > 0;
      case 5:
        return true; // Team is optional
      case 6:
        return data.visibility;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (currentStep < 6 && isStepValid()) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    if (!isStepValid()) return;

    // In real app, this would save to database
    console.log('Creating project:', data);
    localStorage.removeItem('konekt-new-project');

    alert('🎉 Project created successfully! (In real app, this would save to database)');
    router.push('/projects');
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-[#151515] border-2 border-white/10 rounded-2xl p-8 text-center">
          <div className="text-4xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold text-white mb-3">Authentication Required</h2>
          <p className="text-white/60 mb-6">You need to be logged in to create a project</p>
          <button
            onClick={() => router.push('/register')}
            className="w-full px-6 py-3 bg-gradient-to-r from-konekt-green to-konekt-pink text-white font-bold rounded-xl hover:opacity-90 transition-opacity"
          >
            Get Started
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      {/* Header with Progress */}
      <header className="bg-[#151515] border-b-2 border-white/10 sticky top-0 z-20">
        <div className="max-w-5xl mx-auto px-6 py-4">
          {/* Top Bar */}
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => router.push('/projects')}
              className="text-white/60 hover:text-white transition-colors"
            >
              ← Cancel
            </button>
            <div className="text-white font-bold">
              Create Project
            </div>
            <div className="text-white/60 text-sm">
              Step {currentStep} of 6
            </div>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center gap-2">
            {steps.map((step, index) => {
              const isCompleted = currentStep > step.id;
              const isCurrent = currentStep === step.id;

              return (
                <div key={step.id} className="flex-1">
                  <div className="flex items-center gap-2">
                    {/* Step Circle */}
                    <button
                      onClick={() => {
                        // Allow going back to previous steps
                        if (step.id < currentStep) {
                          setCurrentStep(step.id);
                        }
                      }}
                      disabled={step.id > currentStep}
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                        isCompleted
                          ? 'bg-konekt-green text-white'
                          : isCurrent
                          ? 'bg-gradient-to-r from-konekt-green to-konekt-pink text-white scale-110'
                          : 'bg-white/10 text-white/40'
                      } ${step.id < currentStep ? 'cursor-pointer hover:opacity-80' : ''}`}
                    >
                      {isCompleted ? <Check className="w-5 h-5" /> : step.icon}
                    </button>

                    {/* Progress Line */}
                    {index < steps.length - 1 && (
                      <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-konekt-green to-konekt-pink"
                          initial={{ width: 0 }}
                          animate={{ width: isCompleted ? '100%' : '0%' }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                    )}
                  </div>

                  {/* Step Label (only show for current step on mobile) */}
                  {isCurrent && (
                    <div className="text-xs text-white/60 text-center mt-1 md:hidden">
                      {step.label}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-6 py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {currentStep === 1 && (
              <ProjectBasics
                data={{
                  name: data.name,
                  oneLiner: data.oneLiner,
                  category: data.category,
                  stage: data.stage,
                }}
                onChange={(newData) => setData({ ...data, ...newData })}
              />
            )}

            {currentStep === 2 && (
              <ProjectDescription
                data={{ description: data.description }}
                onChange={(newData) => setData({ ...data, ...newData })}
              />
            )}

            {currentStep === 3 && (
              <ProjectMedia
                data={{
                  coverImage: data.coverImage,
                  coverVideo: data.coverVideo,
                  gallery: data.gallery,
                }}
                onChange={(newData) => setData({ ...data, ...newData })}
              />
            )}

            {currentStep === 4 && (
              <ProjectTechStack
                data={{ stack: data.stack, links: data.links }}
                onChange={(newData) => setData({ ...data, ...newData })}
              />
            )}

            {currentStep === 5 && (
              <ProjectTeam
                data={{
                  lookingForHelp: data.lookingForHelp,
                  lookingFor: data.lookingFor,
                  collaborationMessage: data.collaborationMessage,
                }}
                onChange={(newData) => setData({ ...data, ...newData })}
              />
            )}

            {currentStep === 6 && (
              <ProjectSettings
                data={{
                  visibility: data.visibility,
                  allowComments: data.allowComments,
                  tags: data.tags,
                }}
                onChange={(newData) => setData({ ...data, ...newData })}
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex gap-4 mt-12">
          <button
            onClick={handleBack}
            disabled={currentStep === 1}
            className="flex-1 px-6 py-4 bg-[#151515] border-2 border-white/10 text-white rounded-xl font-bold hover:border-white/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>

          {currentStep < 6 ? (
            <button
              onClick={handleNext}
              disabled={!isStepValid()}
              className="flex-1 px-6 py-4 bg-gradient-to-r from-konekt-green to-konekt-pink text-white rounded-xl font-bold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              Next
              <ArrowRight className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!isStepValid()}
              className="flex-1 px-6 py-4 bg-gradient-to-r from-konekt-green to-konekt-pink text-white rounded-xl font-bold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Rocket className="w-5 h-5" />
              Launch Project
            </button>
          )}
        </div>

        {/* Validation Hints */}
        {!isStepValid() && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-4 bg-yellow-500/10 border-2 border-yellow-500/30 rounded-xl text-center"
          >
            <p className="text-yellow-300 text-sm">
              {currentStep === 1 && 'Please fill in all required fields'}
              {currentStep === 2 && 'Description should be at least 50 characters'}
              {currentStep === 4 && 'Please select at least one technology'}
            </p>
          </motion.div>
        )}
      </main>
    </div>
  );
}
