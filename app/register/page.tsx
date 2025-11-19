'use client';

import { useState } from 'react';
import { Step1 } from '@/components/register/Step1';
import { Step2 } from '@/components/register/Step2';
import { Step3 } from '@/components/register/Step3';
import { Step4 } from '@/components/register/Step4';
import { useUserStore } from '@/lib/store';

export default function RegisterPage() {
  const currentEvent = useUserStore((state) => state.currentEvent);
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <div className="min-h-screen bg-konekt-cream px-6 py-12">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-konekt-black mb-2">Konekt</h1>
          <p className="text-konekt-black/60">{currentEvent}</p>
        </div>

        {/* Progress bar */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm font-medium text-konekt-black">
              Krok {currentStep} ze 4
            </div>
            <div className="text-sm text-konekt-black/60">
              {currentStep === 1 && 'Základní informace'}
              {currentStep === 2 && 'Tvoje dovednosti'}
              {currentStep === 3 && 'Představ se'}
              {currentStep === 4 && 'Co hledáš?'}
            </div>
          </div>
          <div className="w-full h-2 bg-konekt-white rounded-full overflow-hidden">
            <div
              className="h-full bg-konekt-green transition-all duration-300"
              style={{ width: `${(currentStep / 4) * 100}%` }}
            />
          </div>
        </div>

        {/* Steps */}
        <div className="bg-konekt-white rounded-2xl border-2 border-konekt-black/10 p-8">
          {currentStep === 1 && <Step1 onNext={() => setCurrentStep(2)} />}
          {currentStep === 2 && (
            <Step2
              onNext={() => setCurrentStep(3)}
              onBack={() => setCurrentStep(1)}
            />
          )}
          {currentStep === 3 && (
            <Step3
              onNext={() => setCurrentStep(4)}
              onBack={() => setCurrentStep(2)}
            />
          )}
          {currentStep === 4 && <Step4 onBack={() => setCurrentStep(3)} />}
        </div>
      </div>
    </div>
  );
}
