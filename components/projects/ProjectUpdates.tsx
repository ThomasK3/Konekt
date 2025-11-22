'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Heart, MessageCircle, Image as ImageIcon, Video } from 'lucide-react';
import { mockProjectUpdates } from '@/lib/projects-data';
import type { ProjectUpdate } from '@/types';

interface ProjectUpdatesProps {
  projectId: string;
}

export const ProjectUpdates = ({ projectId }: ProjectUpdatesProps) => {
  const [updates, setUpdates] = useState<ProjectUpdate[]>(
    mockProjectUpdates.filter((u) => u.projectId === projectId)
  );
  const [likedUpdates, setLikedUpdates] = useState<Set<string>>(new Set());

  const toggleLike = (updateId: string) => {
    setLikedUpdates((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(updateId)) {
        newSet.delete(updateId);
      } else {
        newSet.add(updateId);
      }
      return newSet;
    });

    // In real app, save to backend
    console.log('Toggled like for update:', updateId);
  };

  const renderContent = (content: string) => {
    return content.split('\n').map((line, i) => {
      if (line.startsWith('**') && line.endsWith('**')) {
        return (
          <h4 key={i} className="font-bold text-konekt-black mb-2">
            {line.slice(2, -2)}
          </h4>
        );
      } else if (line.startsWith('## ')) {
        return (
          <h3 key={i} className="text-lg font-bold text-konekt-black mt-4 mb-2">
            {line.slice(3)}
          </h3>
        );
      } else {
        return line ? <p key={i} className="text-konekt-black/80 mb-2">{line}</p> : <br key={i} />;
      }
    });
  };

  if (updates.length === 0) {
    return (
      <div className="bg-konekt-white rounded-2xl border-2 border-konekt-black/10 p-6">
        <h3 className="text-lg font-bold text-konekt-black mb-4">Updates & Progress</h3>
        <div className="text-center py-8">
          <Calendar className="w-12 h-12 text-konekt-black/20 mx-auto mb-2" />
          <p className="text-konekt-black/50">No updates yet</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-konekt-white rounded-2xl border-2 border-konekt-black/10 p-6">
      <h3 className="text-lg font-bold text-konekt-black mb-6">Updates & Progress</h3>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-konekt-black/10" />

        <div className="space-y-8">
          {updates.map((update, index) => {
            const isLiked = likedUpdates.has(update.id);

            return (
              <motion.div
                key={update.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative pl-16"
              >
                {/* Timeline dot */}
                <div className="absolute left-3.5 top-2 w-3 h-3 rounded-full bg-konekt-green border-4 border-white" />

                {/* Content */}
                <div className="bg-konekt-cream rounded-xl p-4">
                  {/* Date */}
                  <div className="flex items-center gap-2 text-xs text-konekt-black/50 mb-3">
                    <Calendar className="w-3 h-3" />
                    <span>
                      {new Date(update.createdAt).toLocaleDateString('cs-CZ', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>

                  {/* Update content */}
                  <div className="prose prose-sm max-w-none">
                    {renderContent(update.content)}
                  </div>

                  {/* Media */}
                  {update.media && update.media.length > 0 && (
                    <div className="grid grid-cols-2 gap-2 mt-4">
                      {update.media.map((item) => (
                        <div
                          key={item.id}
                          className="relative aspect-video rounded-lg overflow-hidden bg-konekt-black/5 border-2 border-konekt-black/10 hover:border-konekt-green/50 transition-colors cursor-pointer group"
                        >
                          {item.type === 'image' ? (
                            <img
                              src={item.url}
                              alt={item.caption || ''}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Video className="w-8 h-8 text-konekt-black/30" />
                            </div>
                          )}
                          {item.caption && (
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-konekt-black/80 to-transparent p-2">
                              <p className="text-white text-xs">{item.caption}</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center gap-4 mt-4 pt-3 border-t border-konekt-black/10">
                    <button
                      onClick={() => toggleLike(update.id)}
                      className={`flex items-center gap-1.5 text-sm transition-colors ${
                        isLiked
                          ? 'text-konekt-pink font-medium'
                          : 'text-konekt-black/50 hover:text-konekt-pink'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                      <span>{update.reactions + (isLiked ? 1 : 0)}</span>
                    </button>

                    <button className="flex items-center gap-1.5 text-sm text-konekt-black/50 hover:text-konekt-green transition-colors">
                      <MessageCircle className="w-4 h-4" />
                      <span>{update.comments}</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
