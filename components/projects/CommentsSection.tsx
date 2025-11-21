'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Heart, Reply, Send } from 'lucide-react';
import { mockProjectComments } from '@/lib/projects-data';
import type { ProjectComment } from '@/types';
import { useUserStore } from '@/lib/store';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';

interface CommentItemProps {
  comment: ProjectComment;
  onReply: (commentId: string, content: string) => void;
  onLike: (commentId: string) => void;
  isReply?: boolean;
}

const CommentItem = ({ comment, onReply, onLike, isReply }: CommentItemProps) => {
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [liked, setLiked] = useState(false);

  const handleReply = () => {
    if (replyText.trim()) {
      onReply(comment.id, replyText);
      setReplyText('');
      setShowReplyBox(false);
    }
  };

  const handleLike = () => {
    setLiked(!liked);
    onLike(comment.id);
  };

  return (
    <div className={`${isReply ? 'ml-12' : ''}`}>
      <div className="flex gap-3">
        {/* Avatar */}
        <div className="w-10 h-10 rounded-full bg-konekt-green flex items-center justify-center text-white font-semibold flex-shrink-0">
          {comment.author.name.charAt(0)}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="bg-konekt-cream rounded-2xl rounded-tl-sm p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-semibold text-konekt-black">{comment.author.name}</span>
              <span className="text-xs text-konekt-black/40">
                {new Date(comment.createdAt).toLocaleDateString('cs-CZ', {
                  day: 'numeric',
                  month: 'short',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            </div>
            <p className="text-konekt-black/80">{comment.content}</p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4 mt-2 px-2">
            <button
              onClick={handleLike}
              className={`flex items-center gap-1 text-xs transition-colors ${
                liked ? 'text-konekt-pink font-medium' : 'text-konekt-black/50 hover:text-konekt-pink'
              }`}
            >
              <Heart className={`w-3 h-3 ${liked ? 'fill-current' : ''}`} />
              <span>{comment.reactions + (liked ? 1 : 0)}</span>
            </button>

            {!isReply && (
              <button
                onClick={() => setShowReplyBox(!showReplyBox)}
                className="flex items-center gap-1 text-xs text-konekt-black/50 hover:text-konekt-green transition-colors"
              >
                <Reply className="w-3 h-3" />
                <span>Reply</span>
              </button>
            )}
          </div>

          {/* Reply Box */}
          <AnimatePresence>
            {showReplyBox && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-3"
              >
                <div className="flex gap-2">
                  <Textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Write a reply..."
                    rows={2}
                    className="flex-1"
                  />
                  <Button onClick={handleReply} size="sm" className="self-end">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Nested Replies */}
          {comment.replies && comment.replies.length > 0 && (
            <div className="mt-3 space-y-3">
              {comment.replies.map((reply) => (
                <CommentItem
                  key={reply.id}
                  comment={reply}
                  onReply={onReply}
                  onLike={onLike}
                  isReply
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

interface CommentsSectionProps {
  projectId: string;
  allowComments?: boolean;
}

export const CommentsSection = ({ projectId, allowComments = true }: CommentsSectionProps) => {
  const user = useUserStore((state) => state.user);
  const [comments, setComments] = useState<ProjectComment[]>(
    mockProjectComments.filter((c) => c.projectId === projectId)
  );
  const [newCommentText, setNewCommentText] = useState('');

  const handleAddComment = () => {
    if (!newCommentText.trim() || !user) return;

    const newComment: ProjectComment = {
      id: `comment-${Date.now()}`,
      projectId,
      authorId: user.id,
      author: user,
      content: newCommentText,
      createdAt: new Date(),
      reactions: 0,
    };

    setComments([...comments, newComment]);
    setNewCommentText('');

    // In real app, save to backend
    console.log('Added comment:', newComment);
  };

  const handleReply = (commentId: string, content: string) => {
    if (!user) return;

    const newReply: ProjectComment = {
      id: `reply-${Date.now()}`,
      projectId,
      authorId: user.id,
      author: user,
      content,
      createdAt: new Date(),
      reactions: 0,
    };

    setComments((prev) =>
      prev.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            replies: [...(comment.replies || []), newReply],
          };
        }
        return comment;
      })
    );

    // In real app, save to backend
    console.log('Added reply:', newReply);
  };

  const handleLike = (commentId: string) => {
    // In real app, save to backend
    console.log('Liked comment:', commentId);
  };

  if (!allowComments) {
    return (
      <div className="bg-konekt-white rounded-2xl border-2 border-konekt-black/10 p-6 text-center">
        <MessageCircle className="w-12 h-12 text-konekt-black/20 mx-auto mb-2" />
        <p className="text-konekt-black/50">Comments are disabled for this project</p>
      </div>
    );
  }

  return (
    <div className="bg-konekt-white rounded-2xl border-2 border-konekt-black/10 p-6">
      <div className="flex items-center gap-2 mb-6">
        <MessageCircle className="w-5 h-5 text-konekt-black" />
        <h3 className="text-lg font-bold text-konekt-black">
          Comments ({comments.reduce((sum, c) => sum + 1 + (c.replies?.length || 0), 0)})
        </h3>
      </div>

      {/* New Comment Box */}
      {user ? (
        <div className="mb-6">
          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-full bg-konekt-green flex items-center justify-center text-white font-semibold flex-shrink-0">
              {user.name.charAt(0)}
            </div>
            <div className="flex-1">
              <Textarea
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
                placeholder="Add a comment..."
                rows={3}
                className="mb-2"
              />
              <Button
                onClick={handleAddComment}
                disabled={!newCommentText.trim()}
                size="sm"
                className="bg-gradient-to-r from-konekt-green to-konekt-pink text-white"
              >
                <Send className="w-4 h-4 mr-2" />
                Post Comment
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="mb-6 p-4 bg-konekt-cream rounded-xl text-center">
          <p className="text-konekt-black/60">Sign in to leave a comment</p>
        </div>
      )}

      {/* Comments List */}
      <div className="space-y-6">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              onReply={handleReply}
              onLike={handleLike}
            />
          ))
        ) : (
          <div className="text-center py-8">
            <MessageCircle className="w-12 h-12 text-konekt-black/20 mx-auto mb-2" />
            <p className="text-konekt-black/50">No comments yet. Be the first to comment!</p>
          </div>
        )}
      </div>
    </div>
  );
};
