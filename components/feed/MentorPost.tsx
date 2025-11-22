'use client';

import { useState } from 'react';
import { Heart, MessageCircle, Share2, BadgeCheck, ExternalLink, Play } from 'lucide-react';
import type { MentorPost, Mentor } from '@/types';
import { Button } from '@/components/ui/Button';

interface MentorPostProps {
  post: MentorPost;
  mentor: Mentor;
  isFollowing?: boolean;
  onFollow?: (mentorId: string) => void;
  onMessage?: (mentorId: string) => void;
  onLike?: (postId: string) => void;
}

export const MentorPostCard: React.FC<MentorPostProps> = ({
  post,
  mentor,
  isFollowing = false,
  onFollow,
  onMessage,
  onLike,
}) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);

  const handleLike = () => {
    if (onLike) onLike(post.id);
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (hours < 24) return `před ${hours}h`;
    if (days === 1) return 'včera';
    return `před ${days} dny`;
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) return `${(num / 1000).toFixed(1)}k`;
    return num.toString();
  };

  return (
    <div className="bg-konekt-white rounded-2xl border-2 border-konekt-black/10 overflow-hidden hover:shadow-lg transition-shadow">
      {/* Post Header */}
      <div className="p-5 border-b border-konekt-black/5">
        <div className="flex items-start justify-between mb-4">
          <div className="flex gap-3">
            {/* Avatar */}
            <img
              src={mentor.avatar || 'https://via.placeholder.com/56'}
              alt={mentor.name}
              className="w-14 h-14 rounded-full object-cover border-2 border-konekt-green/20"
            />

            {/* Info */}
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <h3 className="font-bold text-konekt-black">{mentor.name}</h3>
                {mentor.isVerified && (
                  <BadgeCheck className="w-5 h-5 text-konekt-green fill-konekt-green/20" />
                )}
              </div>
              <p className="text-sm text-konekt-black/70">
                {mentor.role} @ {mentor.company}
              </p>
              <p className="text-xs text-konekt-black/50 mt-0.5">{formatTime(post.createdAt)}</p>
            </div>
          </div>

          {/* Follow/Message Buttons */}
          {!isFollowing && onFollow && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => onFollow(mentor.id)}
              className="flex-shrink-0"
            >
              Sledovat
            </Button>
          )}
        </div>

        {/* Post Content */}
        <div>
          {post.title && (
            <h2 className="text-lg font-bold text-konekt-black mb-3">{post.title}</h2>
          )}
          <p className="text-konekt-black/80 whitespace-pre-wrap leading-relaxed">
            {post.content}
          </p>
        </div>
      </div>

      {/* Media Section */}
      {post.media && (
        <div className="border-b border-konekt-black/5">
          {post.media.type === 'image' && (
            <img
              src={post.media.url}
              alt="Post media"
              className="w-full max-h-[400px] object-cover"
            />
          )}

          {post.media.type === 'video' && (
            <div className="relative">
              <img
                src={post.media.thumbnail}
                alt="Video thumbnail"
                className="w-full max-h-[400px] object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm">
                <div className="w-16 h-16 bg-konekt-white rounded-full flex items-center justify-center">
                  <Play className="w-8 h-8 text-konekt-green ml-1" />
                </div>
              </div>
            </div>
          )}

          {post.media.type === 'link' && post.media.linkPreview && (
            <a
              href={post.media.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-4 hover:bg-konekt-cream/50 transition-colors"
            >
              {post.media.linkPreview.image && (
                <img
                  src={post.media.linkPreview.image}
                  alt={post.media.linkPreview.title}
                  className="w-full h-48 object-cover rounded-lg mb-3"
                />
              )}
              <div className="flex items-start gap-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-konekt-black mb-1 line-clamp-2">
                    {post.media.linkPreview.title}
                  </h3>
                  <p className="text-sm text-konekt-black/60 line-clamp-2">
                    {post.media.linkPreview.description}
                  </p>
                </div>
                <ExternalLink className="w-5 h-5 text-konekt-black/40 flex-shrink-0" />
              </div>
            </a>
          )}
        </div>
      )}

      {/* Engagement Stats */}
      <div className="px-5 py-3 border-b border-konekt-black/5 flex items-center justify-between text-sm text-konekt-black/60">
        <div className="flex items-center gap-4">
          <span>{formatNumber(likeCount)} likes</span>
          <span>{formatNumber(post.comments)} komentářů</span>
        </div>
        <span>{formatNumber(post.shares)} sdílení</span>
      </div>

      {/* Action Buttons */}
      <div className="px-5 py-3 flex items-center justify-around border-b border-konekt-black/5">
        <button
          onClick={handleLike}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            liked
              ? 'text-konekt-pink bg-konekt-pink/10'
              : 'text-konekt-black/70 hover:bg-konekt-cream'
          }`}
        >
          <Heart className={`w-5 h-5 ${liked ? 'fill-konekt-pink' : ''}`} />
          <span className="font-medium text-sm">Like</span>
        </button>

        <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-konekt-black/70 hover:bg-konekt-cream transition-colors">
          <MessageCircle className="w-5 h-5" />
          <span className="font-medium text-sm">Komentář</span>
        </button>

        <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-konekt-black/70 hover:bg-konekt-cream transition-colors">
          <Share2 className="w-5 h-5" />
          <span className="font-medium text-sm">Sdílet</span>
        </button>
      </div>

      {/* CTA Section */}
      {!isFollowing && onMessage && (
        <div className="px-5 py-4 bg-konekt-cream/30">
          <div className="flex items-center gap-3">
            <Button
              size="sm"
              variant="secondary"
              onClick={() => onMessage(mentor.id)}
              className="flex-1"
            >
              Poslat zprávu
            </Button>
            {onFollow && (
              <Button
                size="sm"
                onClick={() => onFollow(mentor.id)}
                className="flex-1"
              >
                Sledovat
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="px-5 py-3 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs text-konekt-green bg-konekt-green/10 px-3 py-1 rounded-full font-medium"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};
