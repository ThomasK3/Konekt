'use client';

import { useState } from 'react';
import { mockConversations, mockMessages, mockUsers } from '@/lib/mock-data';
import { useUserStore } from '@/lib/store';
import { MessageCircle, Paperclip, Send, Video, Phone, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import AppLayout from '@/components/layout/AppLayout';

export default function MessagesPage() {
  const { user } = useUserStore();
  const [activeConversationId, setActiveConversationId] = useState<string | null>(
    mockConversations[0]?.id || null
  );
  const [messageInput, setMessageInput] = useState('');

  const activeConversation = mockConversations.find((c) => c.id === activeConversationId);
  const conversationMessages = mockMessages.filter((m) => m.conversationId === activeConversationId);

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;
    console.log('Sending message:', messageInput);
    setMessageInput('');
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));

    if (hours < 24) {
      return date.toLocaleTimeString('cs-CZ', { hour: '2-digit', minute: '2-digit' });
    } else if (hours < 48) {
      return 'Včera';
    } else {
      return date.toLocaleDateString('cs-CZ', { day: 'numeric', month: 'short' });
    }
  };

  return (
    <AppLayout>
      <div className="h-[calc(100vh-160px)] flex gap-0 -mx-6 rounded-2xl overflow-hidden border-2 border-white/10">
        {/* Left Panel - Conversations List */}
        <div className="w-full md:w-96 bg-[#1a1a1a] border-r border-white/10 flex flex-col">
          {/* Header */}
          <div className="p-5 border-b border-white/10">
            <h2 className="text-xl font-bold text-white mb-1">Zprávy</h2>
            <p className="text-sm text-white/60">
              {mockConversations.filter((c) => c.unreadCount > 0).length} nepřečtené konverzace
            </p>
          </div>

          {/* Conversations List */}
          <div className="flex-1 overflow-y-auto">
            {mockConversations.length === 0 ? (
              <div className="p-8 text-center">
                <MessageCircle className="w-12 h-12 mx-auto mb-3 text-white/20" />
                <p className="text-white/60">Zatím nemáte žádné zprávy</p>
              </div>
            ) : (
              <div className="divide-y divide-konekt-black/5">
                {mockConversations.map((conversation) => {
                  const participant = conversation.participants[0];
                  const isActive = conversation.id === activeConversationId;

                  return (
                    <button
                      key={conversation.id}
                      onClick={() => setActiveConversationId(conversation.id)}
                      className={`w-full p-4 text-left hover:bg-[#151515]/50 transition-colors ${
                        isActive ? 'bg-konekt-green/5 border-l-4 border-konekt-green' : ''
                      }`}
                    >
                      <div className="flex gap-3">
                        {/* Avatar */}
                        <div className="relative flex-shrink-0">
                          <img
                            src={participant.avatar || participant.mainImage}
                            alt={participant.name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          {participant.isOnline && (
                            <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-konekt-green border-2 border-konekt-white rounded-full" />
                          )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-baseline justify-between mb-1">
                            <h3 className="font-semibold text-white truncate">
                              {participant.name}
                            </h3>
                            {conversation.lastMessage && (
                              <span className="text-xs text-white/50 ml-2 flex-shrink-0">
                                {formatTime(conversation.lastMessage.createdAt)}
                              </span>
                            )}
                          </div>

                          {/* Context Badge */}
                          {conversation.context && (
                            <div className="mb-1.5">
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-konekt-pink/10 text-konekt-pink rounded text-xs font-medium">
                                {conversation.context.type === 'event' && '🎉'}
                                {conversation.context.type === 'project' && '💼'}
                                {conversation.context.type === 'discovery' && '🔍'}
                                {conversation.context.name}
                              </span>
                            </div>
                          )}

                          {/* Last Message Preview */}
                          {conversation.lastMessage && (
                            <p
                              className={`text-sm truncate ${
                                conversation.unreadCount > 0
                                  ? 'text-white font-medium'
                                  : 'text-white/60'
                              }`}
                            >
                              {conversation.lastMessage.content}
                            </p>
                          )}
                        </div>

                        {/* Unread Badge */}
                        {conversation.unreadCount > 0 && (
                          <div className="flex-shrink-0 w-6 h-6 bg-konekt-green text-konekt-white rounded-full flex items-center justify-center text-xs font-bold">
                            {conversation.unreadCount}
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right Panel - Chat Window */}
        <div className="flex-1 bg-[#1a1a1a] flex flex-col">
          {activeConversation ? (
            <>
              {/* Chat Header */}
              <div className="p-5 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={
                      activeConversation.participants[0].avatar ||
                      activeConversation.participants[0].mainImage
                    }
                    alt={activeConversation.participants[0].name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h2 className="font-bold text-white">
                      {activeConversation.participants[0].name}
                    </h2>
                    <div className="flex items-center gap-2 text-xs text-white/60">
                      {activeConversation.participants[0].isOnline ? (
                        <>
                          <div className="w-2 h-2 bg-konekt-green rounded-full" />
                          <span>Online</span>
                        </>
                      ) : (
                        <span>Naposledy aktivní včera</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                  <button className="w-10 h-10 hover:bg-[#151515] rounded-full flex items-center justify-center transition-colors">
                    <Phone className="w-5 h-5 text-white/60" />
                  </button>
                  <button className="w-10 h-10 hover:bg-[#151515] rounded-full flex items-center justify-center transition-colors">
                    <Video className="w-5 h-5 text-white/60" />
                  </button>
                  <button className="w-10 h-10 hover:bg-[#151515] rounded-full flex items-center justify-center transition-colors">
                    <MoreVertical className="w-5 h-5 text-white/60" />
                  </button>
                </div>
              </div>

              {/* Context Info Banner */}
              {activeConversation.context && (
                <div className="px-5 py-3 bg-konekt-pink/5 border-b border-konekt-black/5">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-white/60">Odkud se znáte:</span>
                    <span className="font-medium text-konekt-pink">
                      {activeConversation.context.type === 'event' && '🎉 Akce'}
                      {activeConversation.context.type === 'project' && '💼 Projekt'}
                      {activeConversation.context.type === 'discovery' && '🔍 Objevování'}
                      {' - '}
                      {activeConversation.context.name}
                    </span>
                  </div>
                </div>
              )}

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-[#151515]/30">
                {conversationMessages.map((message) => {
                  const isSentByUser = message.senderId === user?.id;
                  const sender = isSentByUser
                    ? user
                    : mockUsers.find((u) => u.id === message.senderId);

                  return (
                    <div
                      key={message.id}
                      className={`flex gap-3 ${isSentByUser ? 'flex-row-reverse' : ''}`}
                    >
                      {/* Avatar */}
                      {!isSentByUser && (
                        <img
                          src={sender?.avatar || sender?.mainImage}
                          alt={sender?.name}
                          className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                        />
                      )}

                      {/* Message Bubble */}
                      <div className={`flex flex-col ${isSentByUser ? 'items-end' : 'items-start'} max-w-md`}>
                        <div
                          className={`px-4 py-3 rounded-2xl ${
                            isSentByUser
                              ? 'bg-konekt-green text-konekt-white rounded-tr-sm'
                              : 'bg-[#1a1a1a] text-white rounded-tl-sm border border-white/10'
                          }`}
                        >
                          <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>

                          {/* Attachments */}
                          {message.attachments && message.attachments.length > 0 && (
                            <div className="mt-2 space-y-2">
                              {message.attachments.map((attachment, idx) => (
                                <a
                                  key={idx}
                                  href={attachment.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={`flex items-center gap-2 p-2 rounded-lg border ${
                                    isSentByUser
                                      ? 'bg-[#1a1a1a]/10 border-konekt-white/20'
                                      : 'bg-[#151515] border-white/10'
                                  } hover:opacity-80 transition-opacity`}
                                >
                                  <Paperclip className="w-4 h-4" />
                                  <span className="text-xs font-medium">{attachment.name}</span>
                                </a>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Timestamp */}
                        <span className="text-xs text-white/40 mt-1 px-1">
                          {message.createdAt.toLocaleTimeString('cs-CZ', {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-white/10 bg-[#1a1a1a]">
                <div className="flex gap-3 items-end">
                  <button className="w-10 h-10 hover:bg-[#151515] rounded-full flex items-center justify-center transition-colors flex-shrink-0">
                    <Paperclip className="w-5 h-5 text-white/60" />
                  </button>

                  <div className="flex-1 relative">
                    <textarea
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                      placeholder="Napište zprávu..."
                      rows={1}
                      className="w-full px-4 py-3 bg-[#151515] border border-white/10 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-konekt-green focus:border-transparent"
                      style={{ minHeight: '48px', maxHeight: '120px' }}
                    />
                  </div>

                  <Button
                    onClick={handleSendMessage}
                    disabled={!messageInput.trim()}
                    className="w-10 h-10 p-0 flex items-center justify-center flex-shrink-0"
                    size="sm"
                  >
                    <Send className="w-5 h-5" />
                  </Button>
                </div>
                <p className="text-xs text-white/40 mt-2 px-1">
                  Stiskněte Enter pro odeslání, Shift+Enter pro nový řádek
                </p>
              </div>
            </>
          ) : (
            // Empty State
            <div className="flex-1 flex items-center justify-center p-8">
              <div className="text-center">
                <MessageCircle className="w-16 h-16 mx-auto mb-4 text-white/20" />
                <h3 className="text-lg font-semibold text-white mb-2">
                  Vyberte konverzaci
                </h3>
                <p className="text-white/60">
                  Klikněte na konverzaci vlevo pro zobrazení zpráv
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
