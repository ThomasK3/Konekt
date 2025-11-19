'use client';

import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import type { Mentor } from '@/types';

interface MentorCardProps {
  mentor: Mentor;
}

export const MentorCard: React.FC<MentorCardProps> = ({ mentor }) => {
  return (
    <Card className="space-y-4">
      {/* Avatar & Name */}
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 rounded-full bg-konekt-pink flex items-center justify-center text-konekt-white font-semibold">
          {mentor.name.charAt(0)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-konekt-black">{mentor.name}</div>
          <div className="text-sm text-konekt-black/60">{mentor.role}</div>
          <div className="text-xs text-konekt-black/40">{mentor.company}</div>
        </div>
      </div>

      {/* Bio */}
      <p className="text-sm text-konekt-black/70">{mentor.bio}</p>

      {/* Skills */}
      <div className="flex flex-wrap gap-1">
        {mentor.expertise.slice(0, 3).map((skill) => (
          <span
            key={skill}
            className="px-2 py-1 bg-konekt-cream text-xs text-konekt-black/70 rounded"
          >
            {skill}
          </span>
        ))}
      </div>

      {/* Connection reason */}
      {mentor.connectionReason && (
        <div className="text-xs text-konekt-green bg-konekt-green/10 px-3 py-2 rounded-lg">
          💡 {mentor.connectionReason}
        </div>
      )}

      {/* CTA */}
      <Button variant="outline" size="sm" className="w-full">
        Připojit
      </Button>
    </Card>
  );
};
