'use client';

import { Card } from '@/components/ui/Card';
import { Users } from 'lucide-react';
import type { Channel } from '@/types';

interface ChannelsListProps {
  channels: Channel[];
}

export const ChannelsList: React.FC<ChannelsListProps> = ({ channels }) => {
  return (
    <div className="space-y-3">
      <h2 className="text-lg font-bold text-konekt-black px-2">Channels</h2>
      {channels.map((channel) => (
        <Card key={channel.id} hover className="!p-4">
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center text-konekt-white font-bold"
              style={{ backgroundColor: channel.color }}
            >
              {channel.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-konekt-black truncate">
                {channel.name}
              </h3>
              <div className="flex items-center gap-1 text-xs text-konekt-black/60">
                <Users className="w-3 h-3" />
                <span>{channel.memberCount} členů</span>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};
