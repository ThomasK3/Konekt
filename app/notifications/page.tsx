'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  MessageCircle,
  Briefcase,
  Calendar,
  Users2,
  FileText,
  Star,
  CheckCheck,
  Trash2,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import AppLayout from '@/components/layout/AppLayout';

interface Notification {
  id: string;
  type: 'message' | 'project' | 'event' | 'connection' | 'material' | 'skillMatch';
  title: string;
  description: string;
  time: Date;
  isRead: boolean;
  actionUrl?: string;
  avatar?: string;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'message',
    title: 'Jana Nováková ti poslala zprávu',
    description: 'Ahoj! Viděla jsem tvůj projekt a chtěla bych...',
    time: new Date(Date.now() - 2 * 60 * 1000), // 2 min ago
    isRead: false,
    actionUrl: '/messages',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
  },
  {
    id: '2',
    type: 'project',
    title: 'Petr Novák má zájem o tvůj projekt',
    description: '"AI Design Tool" - chce se přidat jako Frontend Developer',
    time: new Date(Date.now() - 60 * 60 * 1000), // 1 hour ago
    isRead: false,
    actionUrl: '/projects/proj1',
  },
  {
    id: '3',
    type: 'event',
    title: 'Nový event: StartupGrind Prague',
    description: 'Networking event začíná 5.12. - nezapomeň se registrovat!',
    time: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    isRead: false,
    actionUrl: '/events/event2',
  },
  {
    id: '4',
    type: 'material',
    title: 'Nový materiál v BeNextOne 2024',
    description: 'Workshop 3 - slides nahrány organizátory',
    time: new Date(Date.now() - 24 * 60 * 60 * 1000), // yesterday
    isRead: true,
    actionUrl: '/events/event1',
  },
  {
    id: '5',
    type: 'skillMatch',
    title: 'Martin Svoboda tě označil jako skill match',
    description: 'Máte společné skills: React, TypeScript',
    time: new Date(Date.now() - 24 * 60 * 60 * 1000), // yesterday
    isRead: true,
    actionUrl: '/people',
  },
  {
    id: '6',
    type: 'connection',
    title: 'Lucie Dvořáková přijala tvou žádost o spojení',
    description: 'Nyní si můžete posílat zprávy',
    time: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    isRead: true,
    actionUrl: '/messages',
  },
  {
    id: '7',
    type: 'event',
    title: 'BeNextOne 2024 začíná zítra!',
    description: 'Připomenutí: Check-in od 9:00 v Prague Congress Centre',
    time: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    isRead: true,
    actionUrl: '/events/event1',
  },
];

const notificationIcons = {
  message: MessageCircle,
  project: Briefcase,
  event: Calendar,
  connection: Users2,
  material: FileText,
  skillMatch: Star,
};

const notificationColors = {
  message: 'bg-konekt-pink/10 text-konekt-pink',
  project: 'bg-konekt-green/10 text-konekt-green',
  event: 'bg-blue-50 text-blue-600',
  connection: 'bg-purple-50 text-purple-600',
  material: 'bg-orange-50 text-orange-600',
  skillMatch: 'bg-yellow-50 text-yellow-600',
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const filteredNotifications = notifications.filter((n) =>
    filter === 'unread' ? !n.isRead : true
  );

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)));
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) return `${minutes} min`;
    if (hours < 24) return `${hours}h`;
    if (days === 1) return 'včera';
    return `před ${days} dny`;
  };

  const groupedNotifications = filteredNotifications.reduce((acc, notification) => {
    const now = new Date();
    const diff = now.getTime() - notification.time.getTime();
    const hours = diff / (1000 * 60 * 60);

    let group: string;
    if (hours < 24) group = 'Dnes';
    else if (hours < 48) group = 'Včera';
    else group = 'Starší';

    if (!acc[group]) acc[group] = [];
    acc[group].push(notification);
    return acc;
  }, {} as Record<string, Notification[]>);

  return (
    <AppLayout>
      {/* Page Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-konekt-black mb-2">🔔 Notifikace</h1>
            <p className="text-konekt-black/60">
              {unreadCount > 0
                ? `${unreadCount} nepřečten${unreadCount === 1 ? 'á' : 'ých'}`
                : 'Vše přečteno'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {unreadCount > 0 && (
              <Button onClick={markAllAsRead} variant="outline" size="sm">
                <CheckCheck className="w-4 h-4 mr-2" />
                Označit vše jako přečtené
              </Button>
            )}
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 flex gap-3">
          <button
            onClick={() => setFilter('all')}
            className={`px-5 py-2.5 rounded-full font-medium transition-all ${
              filter === 'all'
                ? 'bg-konekt-black text-konekt-white'
                : 'bg-konekt-white text-konekt-black border-2 border-konekt-black/10 hover:border-konekt-black/30'
            }`}
          >
            Vše ({notifications.length})
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={`px-5 py-2.5 rounded-full font-medium transition-all ${
              filter === 'unread'
                ? 'bg-konekt-black text-konekt-white'
                : 'bg-konekt-white text-konekt-black border-2 border-konekt-black/10 hover:border-konekt-black/30'
            }`}
          >
            Nepřečtené
            {unreadCount > 0 && (
              <span className="ml-2 px-2 py-0.5 bg-konekt-pink text-konekt-white rounded-full text-xs">
                {unreadCount}
              </span>
            )}
          </button>
        </div>

        {/* Notifications List */}
        <div className="space-y-6">
          {Object.entries(groupedNotifications).map(([group, groupNotifications]) => (
            <div key={group}>
              <h2 className="text-sm font-semibold text-konekt-black/60 mb-3">{group}</h2>
              <div className="space-y-2">
                {groupNotifications.map((notification) => {
                  const Icon = notificationIcons[notification.type];
                  return (
                    <div
                      key={notification.id}
                      className={`bg-konekt-white rounded-2xl border-2 transition-all ${
                        notification.isRead
                          ? 'border-konekt-black/10'
                          : 'border-konekt-green/30 bg-konekt-green/5'
                      }`}
                    >
                      <div className="p-4 flex gap-4">
                        {/* Icon/Avatar */}
                        <div className="flex-shrink-0">
                          {notification.avatar ? (
                            <img
                              src={notification.avatar}
                              alt=""
                              className="w-12 h-12 rounded-full object-cover"
                            />
                          ) : (
                            <div
                              className={`w-12 h-12 rounded-full flex items-center justify-center ${
                                notificationColors[notification.type]
                              }`}
                            >
                              <Icon className="w-6 h-6" />
                            </div>
                          )}
                          {!notification.isRead && (
                            <div className="w-3 h-3 bg-konekt-pink rounded-full -mt-2 ml-auto border-2 border-konekt-white" />
                          )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <h3
                            className={`font-semibold text-konekt-black mb-1 ${
                              !notification.isRead ? 'font-bold' : ''
                            }`}
                          >
                            {notification.title}
                          </h3>
                          <p className="text-sm text-konekt-black/70 mb-2">
                            {notification.description}
                          </p>
                          <div className="flex items-center gap-4">
                            <span className="text-xs text-konekt-black/50">
                              {formatTime(notification.time)}
                            </span>
                            {notification.actionUrl && (
                              <Link
                                href={notification.actionUrl}
                                onClick={() => markAsRead(notification.id)}
                                className="text-xs text-konekt-green hover:text-konekt-green/80 font-medium"
                              >
                                Zobrazit →
                              </Link>
                            )}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex-shrink-0 flex flex-col gap-2">
                          {!notification.isRead && (
                            <button
                              onClick={() => markAsRead(notification.id)}
                              className="p-2 hover:bg-konekt-cream rounded-lg transition-colors"
                              title="Označit jako přečtené"
                            >
                              <CheckCheck className="w-4 h-4 text-konekt-black/40" />
                            </button>
                          )}
                          <button
                            onClick={() => deleteNotification(notification.id)}
                            className="p-2 hover:bg-konekt-pink/10 rounded-lg transition-colors"
                            title="Smazat"
                          >
                            <Trash2 className="w-4 h-4 text-konekt-pink/60" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredNotifications.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto mb-4 bg-konekt-black/5 rounded-full flex items-center justify-center">
              <CheckCheck className="w-8 h-8 text-konekt-black/20" />
            </div>
            <h3 className="text-xl font-semibold text-konekt-black mb-2">
              {filter === 'unread' ? 'Vše přečteno!' : 'Žádné notifikace'}
            </h3>
            <p className="text-konekt-black/60">
              {filter === 'unread'
                ? 'Jsi up to date s vším důležitým'
                : 'Zatím nemáš žádné notifikace'}
            </p>
          </div>
        )}
    </AppLayout>
  );
}
