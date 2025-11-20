import React from 'react';
import type { MBTIPersonality, BigFivePersonality, StrengthsFinder, SocialIntegration, WorkPreferences } from '@/types';
import { Linkedin, Github, Twitter, Globe, Clock, MessageSquare, Briefcase } from 'lucide-react';

interface MBTIBadgeProps {
  mbti: MBTIPersonality;
}

export const MBTIBadge: React.FC<MBTIBadgeProps> = ({ mbti }) => {
  return (
    <div className="bg-konekt-pink/10 border-2 border-konekt-pink/20 rounded-xl p-4">
      <div className="flex items-center gap-3 mb-2">
        <div className="px-4 py-2 bg-konekt-pink text-konekt-white rounded-lg font-bold text-lg">
          {mbti.type}
        </div>
        <div>
          <h4 className="font-bold text-konekt-black">{mbti.name}</h4>
          <p className="text-xs text-konekt-black/50">16 Personalities</p>
        </div>
      </div>
      <p className="text-sm text-konekt-black/70">{mbti.description}</p>
    </div>
  );
};

interface BigFiveBarsProps {
  bigFive: BigFivePersonality;
}

export const BigFiveBars: React.FC<BigFiveBarsProps> = ({ bigFive }) => {
  const traits = [
    { name: 'Openness', value: bigFive.openness, color: 'bg-konekt-green' },
    { name: 'Conscientiousness', value: bigFive.conscientiousness, color: 'bg-konekt-pink' },
    { name: 'Extraversion', value: bigFive.extraversion, color: 'bg-yellow-500' },
    { name: 'Agreeableness', value: bigFive.agreeableness, color: 'bg-blue-500' },
    { name: 'Neuroticism', value: bigFive.neuroticism, color: 'bg-purple-500' },
  ];

  return (
    <div className="bg-konekt-white border-2 border-konekt-black/10 rounded-xl p-4 space-y-4">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-bold text-konekt-black">Big Five Personality</h4>
        <span className="text-xs text-konekt-black/50">Based on OCEAN model</span>
      </div>

      {traits.map((trait) => (
        <div key={trait.name}>
          <div className="flex justify-between text-sm mb-1">
            <span className="font-medium text-konekt-black">{trait.name}</span>
            <span className="text-konekt-black/60">{trait.value}%</span>
          </div>
          <div className="w-full h-2 bg-konekt-cream rounded-full overflow-hidden">
            <div
              className={`h-full ${trait.color} transition-all`}
              style={{ width: `${trait.value}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

interface StrengthsTagsProps {
  strengthsFinder: StrengthsFinder;
}

export const StrengthsTags: React.FC<StrengthsTagsProps> = ({ strengthsFinder }) => {
  return (
    <div className="bg-konekt-green/10 border-2 border-konekt-green/20 rounded-xl p-4">
      <div className="mb-3">
        <h4 className="font-bold text-konekt-black">Top 5 Strengths</h4>
        <p className="text-xs text-konekt-black/50">CliftonStrengths Assessment</p>
      </div>
      <div className="flex flex-wrap gap-2">
        {strengthsFinder.strengths.map((strength, idx) => (
          <div
            key={strength}
            className="px-4 py-2 bg-konekt-green text-konekt-white rounded-full font-medium text-sm flex items-center gap-2"
          >
            <span className="w-6 h-6 bg-konekt-white text-konekt-green rounded-full flex items-center justify-center text-xs font-bold">
              {idx + 1}
            </span>
            {strength}
          </div>
        ))}
      </div>
    </div>
  );
};

interface SocialIntegrationsProps {
  integrations: SocialIntegration[];
}

export const SocialIntegrations: React.FC<SocialIntegrationsProps> = ({ integrations }) => {
  const getIcon = (platform: string) => {
    switch (platform) {
      case 'linkedin':
        return <Linkedin className="w-5 h-5" />;
      case 'github':
        return <Github className="w-5 h-5" />;
      case 'twitter':
        return <Twitter className="w-5 h-5" />;
      case 'portfolio':
        return <Globe className="w-5 h-5" />;
      default:
        return <Globe className="w-5 h-5" />;
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'linkedin':
        return 'bg-blue-600 text-white';
      case 'github':
        return 'bg-gray-800 text-white';
      case 'twitter':
        return 'bg-sky-500 text-white';
      case 'portfolio':
        return 'bg-konekt-green text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="bg-konekt-white border-2 border-konekt-black/10 rounded-xl p-4">
      <h4 className="font-bold text-konekt-black mb-4">Připojené účty</h4>
      <div className="space-y-3">
        {integrations.map((integration) => (
          <a
            key={integration.platform}
            href={integration.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-3 p-3 rounded-lg ${getPlatformColor(integration.platform)} hover:opacity-90 transition-opacity`}
          >
            {getIcon(integration.platform)}
            <div className="flex-1">
              <div className="font-medium capitalize">{integration.platform}</div>
              {integration.username && (
                <div className="text-xs opacity-80">@{integration.username}</div>
              )}
            </div>
            {integration.metadata && (
              <div className="text-sm opacity-90">
                {integration.metadata.repositories && `${integration.metadata.repositories} repos`}
                {integration.metadata.followers && `${integration.metadata.followers} followers`}
                {integration.metadata.jobTitle && integration.metadata.jobTitle}
              </div>
            )}
          </a>
        ))}
      </div>
    </div>
  );
};

interface WorkPreferencesCardProps {
  preferences: WorkPreferences;
}

export const WorkPreferencesCard: React.FC<WorkPreferencesCardProps> = ({ preferences }) => {
  const getCommunicationIcon = (pref: string) => {
    switch (pref) {
      case 'slack':
        return '💬';
      case 'email':
        return '📧';
      case 'whatsapp':
        return '💚';
      case 'discord':
        return '🎮';
      default:
        return '💬';
    }
  };

  const getWorkHoursLabel = (hours: string) => {
    switch (hours) {
      case 'morning':
        return '🌅 Morning person';
      case 'night':
        return '🌙 Night owl';
      case 'flexible':
        return '⏰ Flexible';
      default:
        return hours;
    }
  };

  const getWorkStyleLabel = (style: string) => {
    switch (style) {
      case 'remote':
        return '🏠 Remote';
      case 'hybrid':
        return '🔀 Hybrid';
      case 'office':
        return '🏢 Office';
      default:
        return style;
    }
  };

  return (
    <div className="bg-konekt-white border-2 border-konekt-black/10 rounded-xl p-4">
      <h4 className="font-bold text-konekt-black mb-4">Work Preferences</h4>

      <div className="space-y-3">
        <div>
          <div className="text-xs text-konekt-black/50 mb-1">Timezone</div>
          <div className="flex items-center gap-2 text-sm text-konekt-black font-medium">
            <Clock className="w-4 h-4" />
            {preferences.timezone}
          </div>
        </div>

        <div>
          <div className="text-xs text-konekt-black/50 mb-1">Communication</div>
          <div className="flex flex-wrap gap-2">
            {preferences.communicationPreferences.map((pref) => (
              <span
                key={pref}
                className="px-3 py-1 bg-konekt-cream rounded-full text-sm font-medium capitalize"
              >
                {getCommunicationIcon(pref)} {pref}
              </span>
            ))}
          </div>
        </div>

        <div>
          <div className="text-xs text-konekt-black/50 mb-1">Work hours</div>
          <div className="text-sm text-konekt-black font-medium">
            {getWorkHoursLabel(preferences.workHours)}
          </div>
        </div>

        <div>
          <div className="text-xs text-konekt-black/50 mb-1">Work style</div>
          <div className="text-sm text-konekt-black font-medium">
            {getWorkStyleLabel(preferences.workStyle)}
          </div>
        </div>
      </div>
    </div>
  );
};
