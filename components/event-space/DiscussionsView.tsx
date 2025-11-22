'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Hash, Heart, Reply, Send, Smile, Paperclip, Mic } from 'lucide-react';
import { generalMessages, type Message } from '@/lib/event-space-data';
import { Textarea } from '@/components/ui/Textarea';

interface DiscussionsViewProps {
  channelId: string;
}

export const DiscussionsView = ({ channelId }: DiscussionsViewProps) => {
  const [messages, setMessages] = useState<Message[]>(generalMessages);
  const [newMessage, setNewMessage] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);

  const formatTime = (timestamp: Date) => {
    return new Intl.DateTimeFormat('cs-CZ', {
      hour: '2-digit',
      minute: '2-digit',
    }).format(timestamp);
  };

  const handleSend = () => {
    if (!newMessage.trim()) return;
    // In real app, send to backend
    console.log('Sending message:', newMessage);
    setNewMessage('');
    setReplyingTo(null);
  };

  const MessageItem = ({ message, isReply = false }: { message: Message; isReply?: boolean }) => {
    const [showReplies, setShowReplies] = useState(true);

    return (
      <div className={`group ${isReply ? 'ml-12 mt-2' : ''}`}>
        <div className="flex gap-3 hover:bg-white/[0.02] p-2 -mx-2 rounded">
          {/* Avatar */}
          <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-semibold flex-shrink-0">
            {message.author.name.charAt(0)}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Author & Time */}
            <div className="flex items-center gap-2 mb-1">
              <span className="font-semibold text-white text-sm">
                {message.author.name}
              </span>
              <span className="text-white/40 text-xs">{formatTime(message.timestamp)}</span>
              {message.isPinned && (
                <span className="text-xs px-2 py-0.5 bg-indigo-600/20 text-indigo-400 rounded">
                  Pinned
                </span>
              )}
            </div>

            {/* Message Text */}
            <div className="text-white/90 text-sm mb-2 leading-relaxed">
              {message.content}
            </div>

            {/* Reactions */}
            {message.reactions && message.reactions.length > 0 && (
              <div className="flex items-center gap-2 mb-2">
                {message.reactions.map((reaction) => (
                  <button
                    key={reaction.emoji}
                    className="px-2 py-1 bg-white/5 hover:bg-white/10 rounded text-xs flex items-center gap-1 transition-colors"
                  >
                    <span>{reaction.emoji}</span>
                    <span className="text-white/70">{reaction.count}</span>
                  </button>
                ))}
                <button className="p-1 opacity-0 group-hover:opacity-100 text-white/40 hover:text-white/70 transition-all">
                  <Smile className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
              {!isReply && (
                <button
                  onClick={() => setReplyingTo(message.id)}
                  className="text-white/40 hover:text-white/70 text-xs flex items-center gap-1 transition-colors"
                >
                  <Reply className="w-3 h-3" />
                  <span>Reply</span>
                  {message.replies && message.replies.length > 0 && (
                    <span className="ml-1 text-white/60">({message.replies.length})</span>
                  )}
                </button>
              )}
              <button className="text-white/40 hover:text-white/70 text-xs transition-colors">
                <Heart className="w-3 h-3 inline mr-1" />
                React
              </button>
            </div>

            {/* Replies */}
            {message.replies && message.replies.length > 0 && showReplies && (
              <div className="mt-3 space-y-2">
                {message.replies.map((reply) => (
                  <MessageItem key={reply.id} message={reply} isReply />
                ))}
              </div>
            )}

            {/* Reply Input */}
            {replyingTo === message.id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-3"
              >
                <div className="flex gap-2">
                  <Textarea
                    placeholder="Write a reply..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    rows={2}
                    className="flex-1 bg-[#1a1a1a] border-white/10 text-white"
                  />
                  <button
                    onClick={handleSend}
                    className="px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full">
      {/* Channel Header */}
      <div className="border-b border-white/5 p-4">
        <div className="flex items-center gap-2 mb-1">
          <Hash className="w-5 h-5 text-white/60" />
          <h2 className="text-white font-bold text-lg">{channelId}</h2>
        </div>
        <p className="text-white/60 text-sm">
          General discussions about BeNextOne 2024 • 234 members • 12 online
        </p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Date Divider */}
        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-white/40 text-xs font-semibold">Today 09:00</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        {messages.map((message) => (
          <MessageItem key={message.id} message={message} />
        ))}

        {/* Yesterday Divider */}
        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-white/40 text-xs font-semibold">Yesterday</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        <button className="w-full text-indigo-400 hover:text-indigo-300 text-sm py-2 transition-colors">
          Load more messages...
        </button>
      </div>

      {/* Message Input */}
      <div className="border-t border-white/5 p-4">
        <div className="relative">
          <Textarea
            placeholder="Type a message... (Markdown supported)"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            rows={3}
            className="bg-[#1a1a1a] border-white/10 text-white pr-24"
          />
          <div className="absolute bottom-3 right-3 flex items-center gap-2">
            <button className="p-1 text-white/40 hover:text-white/70 transition-colors">
              <Smile className="w-5 h-5" />
            </button>
            <button className="p-1 text-white/40 hover:text-white/70 transition-colors">
              <Paperclip className="w-5 h-5" />
            </button>
            <button className="p-1 text-white/40 hover:text-white/70 transition-colors">
              <Mic className="w-5 h-5" />
            </button>
            <button
              onClick={handleSend}
              disabled={!newMessage.trim()}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-600/50 disabled:cursor-not-allowed text-white rounded-lg transition-colors flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span className="text-sm font-medium">Send</span>
            </button>
          </div>
        </div>
        <div className="text-white/40 text-xs mt-2">
          Press Enter to send, Shift+Enter for new line
        </div>
      </div>
    </div>
  );
};
