'use client';

import { Card } from '@/components/ui/Card';
import { Heart, MessageCircle } from 'lucide-react';
import type { Post } from '@/types';

interface PostCardProps {
  post: Post;
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const formatDate = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

    if (diffHours < 1) return 'před chvílí';
    if (diffHours < 24) return `před ${diffHours}h`;
    return `před ${Math.floor(diffHours / 24)}d`;
  };

  return (
    <Card className="space-y-4">
      {/* Author */}
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 rounded-full bg-konekt-green flex items-center justify-center text-konekt-white font-semibold">
          {post.author.name.charAt(0)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-konekt-black">{post.author.name}</div>
          <div className="text-sm text-konekt-black/60">{post.author.bio}</div>
          <div className="text-xs text-konekt-black/40 mt-1">
            {formatDate(post.createdAt)} • {post.channel.name}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="text-konekt-black whitespace-pre-line leading-relaxed">
        {post.content}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-6 pt-2 border-t border-konekt-black/10">
        <button className="flex items-center gap-2 text-konekt-black/60 hover:text-konekt-pink transition-colors">
          <Heart className="w-5 h-5" />
          <span className="text-sm font-medium">{post.likes}</span>
        </button>
        <button className="flex items-center gap-2 text-konekt-black/60 hover:text-konekt-green transition-colors">
          <MessageCircle className="w-5 h-5" />
          <span className="text-sm font-medium">{post.comments}</span>
        </button>
      </div>
    </Card>
  );
};
