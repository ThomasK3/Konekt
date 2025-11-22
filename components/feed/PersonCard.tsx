'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { User } from '@/types';
import { MapPin, Clock, MessageCircle, Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface PersonCardProps {
  person: User;
}

export const PersonCard: React.FC<PersonCardProps> = ({ person }) => {
  const [activeImage, setActiveImage] = useState(0);
  const images = [person.mainImage, ...(person.gallery || [])].filter(Boolean) as string[];

  return (
    <div className="bg-konekt-white rounded-2xl overflow-hidden border-2 border-konekt-black/10 hover:shadow-2xl transition-all duration-300 group">
      {/* Hero Section - 60% height */}
      <div className="relative h-[320px] overflow-hidden">
        {/* Main Image */}
        <img
          src={images[activeImage]}
          alt={person.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Badge Overlays */}
        <div className="absolute top-4 left-4 flex gap-2">
          {person.isOnline && (
            <div className="px-3 py-1 bg-konekt-green text-konekt-white rounded-full text-xs font-medium flex items-center gap-1.5">
              <div className="w-2 h-2 bg-konekt-white rounded-full animate-pulse" />
              Online
            </div>
          )}
          {person.projectIds.length > 0 && (
            <div className="px-3 py-1 bg-konekt-pink text-konekt-white rounded-full text-xs font-medium">
              {person.projectIds.length} projekt{person.projectIds.length > 1 && 'y'}
            </div>
          )}
        </div>

        {/* Quick Actions (visible on hover) */}
        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="w-10 h-10 bg-konekt-white/90 backdrop-blur rounded-full flex items-center justify-center hover:bg-konekt-white transition-colors">
            <Bookmark className="w-5 h-5 text-konekt-black" />
          </button>
        </div>

        {/* Gradient Overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      {/* Thumbnail Gallery */}
      {images.length > 1 && (
        <div className="px-4 py-3 flex gap-2 overflow-x-auto scrollbar-hide border-b border-konekt-black/5">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveImage(idx)}
              className={`flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                activeImage === idx
                  ? 'border-konekt-green scale-105'
                  : 'border-transparent hover:border-konekt-black/20'
              }`}
            >
              <img src={img} alt={`${person.name} ${idx + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Info Section */}
      <div className="p-5 space-y-4">
        {/* Name & Role */}
        <div>
          <div className="flex items-start justify-between mb-1">
            <Link href={`/profile/${person.username}`} className="hover:text-konekt-green transition-colors">
              <h3 className="text-xl font-bold text-konekt-black">{person.name}</h3>
            </Link>
            {person.badges.length > 0 && (
              <span className="text-lg" title={person.badges[0].description}>
                {person.badges[0].icon}
              </span>
            )}
          </div>
          <div className="flex items-center gap-3 text-sm text-konekt-black/60">
            <span>{person.school}</span>
            {person.location && (
              <>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{person.location}</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Looking For */}
        {person.lookingFor.length > 0 && (
          <div className="flex items-center gap-2 text-sm">
            <span className="text-konekt-black/60">Hledá:</span>
            <div className="flex flex-wrap gap-1.5">
              {person.lookingFor.slice(0, 2).map((role) => (
                <span
                  key={role}
                  className="px-2 py-0.5 bg-konekt-pink/10 text-konekt-pink rounded text-xs font-medium"
                >
                  {role}
                </span>
              ))}
              {person.lookingFor.length > 2 && (
                <span className="text-xs text-konekt-black/40">+{person.lookingFor.length - 2}</span>
              )}
            </div>
          </div>
        )}

        {/* Skills */}
        <div className="flex flex-wrap gap-1.5">
          {person.skills.slice(0, 4).map((skill) => (
            <span
              key={skill}
              className="px-2.5 py-1 bg-konekt-green/10 text-konekt-green rounded text-xs font-medium"
            >
              {skill}
            </span>
          ))}
          {person.skills.length > 4 && (
            <span className="px-2.5 py-1 text-xs text-konekt-black/40">+{person.skills.length - 4}</span>
          )}
        </div>

        {/* Bio */}
        <p className="text-sm text-konekt-black/70 line-clamp-2 leading-relaxed">{person.bio}</p>

        {/* Metadata */}
        <div className="flex items-center gap-4 pt-2 text-xs text-konekt-black/50 border-t border-konekt-black/5">
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>{person.availability.hoursPerWeek}h/týden</span>
          </div>
          <span>•</span>
          <span>{person.availability.isPaid ? 'Placené' : 'Projekt'}</span>
        </div>

        {/* CTA */}
        <div className="flex gap-2 pt-2">
          <Button className="flex-1 flex items-center justify-center gap-2" size="sm">
            <MessageCircle className="w-4 h-4" />
            Poslat zprávu
          </Button>
          <Link href={`/profile/${person.username}`} className="flex-1">
            <Button variant="outline" className="w-full" size="sm">
              Zobrazit profil
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
