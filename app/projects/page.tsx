'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeInUp, fadeIn, fastStaggerContainer, fastStaggerItem } from '@/lib/animations';
import { ProjectCardSreality } from '@/components/feed/ProjectCardSreality';
import { mockProjects } from '@/lib/mock-data';
import { Search, X, Sparkles } from 'lucide-react';
import AppLayout from '@/components/layout/AppLayout';

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>([]);
  const [selectedStages, setSelectedStages] = useState<string[]>([]);
  const [showLookingForOnly, setShowLookingForOnly] = useState(false);

  const allTechnologies = Array.from(new Set(mockProjects.flatMap((p) => p.stack))).sort();

  const filteredProjects = mockProjects.filter((project) => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        project.name.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.stack.some((tech) => tech.toLowerCase().includes(query)) ||
        project.category?.toLowerCase().includes(query);
      if (!matchesSearch) return false;
    }

    if (selectedTechnologies.length > 0) {
      const hasTech = selectedTechnologies.some((tech) => project.stack.includes(tech));
      if (!hasTech) return false;
    }

    if (selectedStages.length > 0) {
      if (!selectedStages.includes(project.stage)) return false;
    }

    if (showLookingForOnly && project.lookingFor.length === 0) return false;

    return true;
  });

  const toggleTechnology = (tech: string) => {
    setSelectedTechnologies((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]
    );
  };

  const toggleStage = (stage: string) => {
    setSelectedStages((prev) =>
      prev.includes(stage) ? prev.filter((s) => s !== stage) : [...prev, stage]
    );
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedTechnologies([]);
    setSelectedStages([]);
    setShowLookingForOnly(false);
  };

  const hasActiveFilters =
    searchQuery || selectedTechnologies.length > 0 || selectedStages.length > 0 || showLookingForOnly;

  const stageLabels = {
    idea: { label: '💡 Idea', color: 'bg-konekt-pink' },
    mvp: { label: '🚀 MVP', color: 'bg-konekt-green' },
    launched: { label: '✨ Launched', color: 'bg-konekt-black' },
  };

  return (
    <AppLayout>
      <div className="flex gap-6">
        {/* Filters Sidebar */}
        <aside className="w-72 flex-shrink-0 space-y-4">
          {/* Search */}
          <div className="bg-konekt-white rounded-2xl border-2 border-konekt-black/10 p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-konekt-black/40" />
              <input
                type="text"
                placeholder="Hledat projekty..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-konekt-cream border-2 border-konekt-black/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-konekt-green focus:border-transparent"
              />
            </div>
          </div>

          {/* Looking For Filter */}
          <div className="bg-konekt-white rounded-2xl border-2 border-konekt-black/10 p-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={showLookingForOnly}
                onChange={(e) => setShowLookingForOnly(e.target.checked)}
                className="w-5 h-5 rounded accent-konekt-pink"
              />
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-konekt-pink" />
                <span className="font-medium text-konekt-black">Hledají lidi</span>
              </div>
            </label>
          </div>

          {/* Stage Filter */}
          <div className="bg-konekt-white rounded-2xl border-2 border-konekt-black/10 overflow-hidden">
            <div className="p-4 border-b border-konekt-black/10 flex items-center justify-between">
              <h3 className="font-bold text-konekt-black">Fáze projektu</h3>
              {selectedStages.length > 0 && (
                <span className="text-xs bg-konekt-green text-konekt-white px-2 py-1 rounded-full">
                  {selectedStages.length}
                </span>
              )}
            </div>
            <div className="p-3">
              <div className="space-y-1">
                {Object.entries(stageLabels).map(([stage, { label, color }]) => (
                  <button
                    key={stage}
                    onClick={() => toggleStage(stage)}
                    className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-colors flex items-center gap-2 ${
                      selectedStages.includes(stage)
                        ? 'bg-konekt-green text-konekt-white font-medium'
                        : 'hover:bg-konekt-cream text-konekt-black/70'
                    }`}
                  >
                    {!selectedStages.includes(stage) && (
                      <span className={`w-2 h-2 rounded-full ${color}`} />
                    )}
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Technologies Filter */}
          <div className="bg-konekt-white rounded-2xl border-2 border-konekt-black/10 overflow-hidden">
            <div className="p-4 border-b border-konekt-black/10 flex items-center justify-between">
              <h3 className="font-bold text-konekt-black">Tech Stack</h3>
              {selectedTechnologies.length > 0 && (
                <span className="text-xs bg-konekt-green text-konekt-white px-2 py-1 rounded-full">
                  {selectedTechnologies.length}
                </span>
              )}
            </div>
            <div className="p-3 max-h-64 overflow-y-auto">
              <div className="space-y-1">
                {allTechnologies.map((tech) => (
                  <button
                    key={tech}
                    onClick={() => toggleTechnology(tech)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      selectedTechnologies.includes(tech)
                        ? 'bg-konekt-green text-konekt-white font-medium'
                        : 'hover:bg-konekt-cream text-konekt-black/70'
                    }`}
                  >
                    {tech}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="w-full bg-konekt-white border-2 border-konekt-black/10 rounded-2xl p-4 font-medium text-konekt-black/70 hover:bg-konekt-cream hover:text-konekt-black transition-colors flex items-center justify-center gap-2"
            >
              <X className="w-5 h-5" />
              Vymazat filtry
            </button>
          )}
        </aside>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <motion.div
            className="mb-6 flex items-end justify-between"
            initial={fadeInUp.initial}
            animate={fadeInUp.animate}
            exit={fadeInUp.exit}
          >
            <div>
              <h1 className="text-3xl font-bold text-konekt-black mb-2">Projekty</h1>
              <p className="text-konekt-black/60">
                {filteredProjects.length} {filteredProjects.length === 1 ? 'projekt' : 'projektů'} nalezeno
              </p>
            </div>

            {/* Active Filters Summary */}
            {hasActiveFilters && (
              <div className="flex flex-wrap gap-2 justify-end max-w-md">
                {selectedTechnologies.map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-konekt-green text-konekt-white rounded-full text-sm font-medium"
                  >
                    {tech}
                    <button onClick={() => toggleTechnology(tech)} className="hover:opacity-70">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
                {selectedStages.map((stage) => (
                  <span
                    key={stage}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-konekt-pink text-konekt-white rounded-full text-sm font-medium"
                  >
                    {stageLabels[stage as keyof typeof stageLabels].label}
                    <button onClick={() => toggleStage(stage)} className="hover:opacity-70">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
                {showLookingForOnly && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-konekt-pink/20 text-konekt-pink border border-konekt-pink/30 rounded-full text-sm font-medium">
                    <Sparkles className="w-3 h-3" />
                    Hledají lidi
                    <button onClick={() => setShowLookingForOnly(false)} className="hover:opacity-70">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
              </div>
            )}
          </motion.div>

          {/* Projects Grid */}
          <motion.div
            className="grid grid-cols-1 xl:grid-cols-2 gap-6"
            variants={fastStaggerContainer}
            initial="initial"
            animate="animate"
          >
            {filteredProjects.map((project) => (
              <motion.div key={project.id} variants={fastStaggerItem}>
                <ProjectCardSreality project={project} />
              </motion.div>
            ))}
          </motion.div>

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <div className="w-16 h-16 mx-auto mb-4 bg-konekt-black/5 rounded-full flex items-center justify-center">
                <Search className="w-8 h-8 text-konekt-black/20" />
              </div>
              <h3 className="text-xl font-semibold text-konekt-black mb-2">
                Žádné projekty nenalezeny
              </h3>
              <p className="text-konekt-black/60 mb-4">
                Zkuste upravit své filtry nebo vyhledávací dotaz
              </p>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-konekt-green text-konekt-white rounded-xl font-medium hover:bg-konekt-green/90 transition-colors"
                >
                  <X className="w-5 h-5" />
                  Vymazat filtry
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
