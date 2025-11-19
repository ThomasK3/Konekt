'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { Project } from '@/types';
import { Users, Bookmark, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCardSreality: React.FC<ProjectCardProps> = ({ project }) => {
  const [activeImage, setActiveImage] = useState(0);
  const images = [project.image, ...(project.gallery || [])].filter(Boolean) as string[];

  const stageLabels = {
    idea: { label: '💡 Idea', color: 'bg-konekt-pink' },
    mvp: { label: '🚀 MVP', color: 'bg-konekt-green' },
    launched: { label: '✨ Launched', color: 'bg-konekt-black' },
  };

  return (
    <div className="bg-konekt-white rounded-2xl overflow-hidden border-2 border-konekt-black/10 hover:shadow-2xl transition-all duration-300 group">
      {/* Hero Section - 60% height */}
      <div className="relative h-[320px] overflow-hidden">
        {/* Main Image */}
        <img
          src={images[activeImage]}
          alt={project.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Badge Overlays */}
        <div className="absolute top-4 left-4 flex gap-2">
          <div className={`px-3 py-1 ${stageLabels[project.stage].color} text-konekt-white rounded-full text-xs font-medium`}>
            {stageLabels[project.stage].label}
          </div>
          {project.category && (
            <div className="px-3 py-1 bg-konekt-white/90 backdrop-blur text-konekt-black rounded-full text-xs font-medium">
              {project.category}
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
              <img src={img} alt={`${project.name} ${idx + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Info Section */}
      <div className="p-5 space-y-4">
        {/* Name */}
        <div>
          <Link href={`/projects/${project.id}`} className="hover:text-konekt-green transition-colors">
            <h3 className="text-xl font-bold text-konekt-black mb-2">{project.name}</h3>
          </Link>
        </div>

        {/* Looking For - highlighted */}
        {project.lookingFor.length > 0 && (
          <div className="p-3 bg-konekt-pink/10 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-konekt-pink" />
              <span className="text-xs font-semibold text-konekt-pink uppercase tracking-wide">Hledáme</span>
            </div>
            <div className="space-y-1.5">
              {project.lookingFor.slice(0, 2).map((role, idx) => (
                <div key={idx} className="text-sm text-konekt-black/80 font-medium">
                  • {role.role} ({role.count}x)
                </div>
              ))}
              {project.lookingFor.length > 2 && (
                <div className="text-xs text-konekt-black/50">+ {project.lookingFor.length - 2} dalších rolí</div>
              )}
            </div>
          </div>
        )}

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-1.5">
          {project.stack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 bg-konekt-green/10 text-konekt-green rounded text-xs font-medium"
            >
              {tech}
            </span>
          ))}
          {project.stack.length > 4 && (
            <span className="px-2.5 py-1 text-xs text-konekt-black/40">+{project.stack.length - 4}</span>
          )}
        </div>

        {/* Description */}
        <p className="text-sm text-konekt-black/70 line-clamp-2 leading-relaxed">{project.description}</p>

        {/* Team Info */}
        <div className="flex items-center gap-2 text-xs text-konekt-black/50 pt-2 border-t border-konekt-black/5">
          <Users className="w-3.5 h-3.5" />
          <span>{project.teamMembers.length} členů týmu</span>
          <span>•</span>
          <span>Založeno {new Date(project.createdAt).toLocaleDateString('cs-CZ', { month: 'long', year: 'numeric' })}</span>
        </div>

        {/* CTA */}
        <div className="flex gap-2 pt-2">
          <Button className="flex-1" size="sm" variant="secondary">
            Mám zájem
          </Button>
          <Link href={`/projects/${project.id}`} className="flex-1">
            <Button variant="outline" className="w-full" size="sm">
              Detail projektu
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
