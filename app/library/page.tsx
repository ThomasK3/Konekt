'use client';

import Link from 'next/link';
import AppLayout from '@/components/layout/AppLayout';
import { collections, getFeaturedResources, getTrendingResources, categories, getLibraryStats } from '@/lib/library-data';
import { Search, BookOpen, Star, TrendingUp, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LibraryPage() {
  const featuredCollections = collections.slice(0, 3);
  const trendingResources = getTrendingResources().slice(0, 3);
  const stats = getLibraryStats();

  return (
    <AppLayout>
      {/* Hero */}
      <div className="mb-12 text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-konekt-green to-blue-500 rounded-2xl mb-6">
          <BookOpen className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-5xl font-bold text-konekt-black dark:text-white mb-4">
          📚 Konekt Knowledge Library
        </h1>
        <p className="text-xl text-konekt-black/60 dark:text-white/70 max-w-2xl mx-auto mb-8">
          Everything you need to succeed in Czech startup scene.
          <br />Community-curated guides, resources, and documentation.
        </p>

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-konekt-black/40 dark:text-white/40" />
            <input
              type="text"
              placeholder={`Search ${stats.totalResources} resources...`}
              className="w-full pl-14 pr-4 py-4 bg-white dark:bg-[#1a1a1a] border-2 border-konekt-black/10 dark:border-white/10 rounded-xl text-lg text-konekt-black dark:text-white placeholder:text-konekt-black/40 dark:placeholder:text-white/40 focus:outline-none focus:border-konekt-green"
            />
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/library/browse">
            <button className="px-6 py-3 bg-konekt-green text-white font-bold rounded-lg hover:opacity-90 transition-opacity">
              Browse All
            </button>
          </Link>
          <Link href="/library/contribute">
            <button className="px-6 py-3 bg-white dark:bg-[#1a1a1a] border-2 border-konekt-black/10 dark:border-white/10 text-konekt-black dark:text-white font-bold rounded-lg hover:border-konekt-green transition-all">
              Submit Resource
            </button>
          </Link>
          <Link href="/library/collections">
            <button className="px-6 py-3 bg-white dark:bg-[#1a1a1a] border-2 border-konekt-black/10 dark:border-white/10 text-konekt-black dark:text-white font-bold rounded-lg hover:border-konekt-green transition-all">
              Collections
            </button>
          </Link>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-4 mb-12">
        {[
          { label: 'Resources', value: stats.totalResources },
          { label: 'Contributors', value: stats.totalContributors },
          { label: 'Collections', value: stats.totalCollections },
          { label: 'Categories', value: stats.totalCategories }
        ].map((stat, idx) => (
          <div key={idx} className="bg-white dark:bg-[#1a1a1a] rounded-xl border-2 border-konekt-black/10 dark:border-white/10 p-6 text-center">
            <div className="text-3xl font-bold text-konekt-black dark:text-white mb-1">
              {stat.value.toLocaleString()}
            </div>
            <div className="text-konekt-black/60 dark:text-white/60">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Featured Collections */}
      <div className="mb-12">
        <div className="flex items-center gap-2 mb-6">
          <Sparkles className="w-6 h-6 text-amber-500" />
          <h2 className="text-2xl font-bold text-konekt-black dark:text-white">Featured Collections</h2>
        </div>
        <div className="grid grid-cols-3 gap-6">
          {featuredCollections.map((collection) => (
            <Link key={collection.id} href={`/library/collections#${collection.id}`}>
              <motion.div
                whileHover={{ y: -4 }}
                className="bg-white dark:bg-[#1a1a1a] rounded-2xl border-2 border-konekt-black/10 dark:border-white/10 overflow-hidden hover:border-konekt-green transition-all"
              >
                <div className="aspect-video overflow-hidden">
                  <img src={collection.coverImage} alt={collection.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-konekt-black dark:text-white mb-2">{collection.title}</h3>
                  <p className="text-konekt-black/60 dark:text-white/60 mb-4 line-clamp-2">{collection.description}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-konekt-black/50 dark:text-white/50">{collection.stats.resourceCount} resources</span>
                    <div className="flex items-center gap-1 text-amber-500">
                      <Star className="w-4 h-4 fill-amber-500" />
                      <span className="font-bold">{collection.stats.rating}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-konekt-black dark:text-white mb-6">Browse by Category</h2>
        <div className="grid grid-cols-4 gap-4">
          {categories.slice(0, 8).map((cat) => (
            <Link key={cat.id} href={`/library/browse?category=${cat.id}`}>
              <div className="bg-white dark:bg-[#1a1a1a] rounded-xl border-2 border-konekt-black/10 dark:border-white/10 p-6 hover:border-konekt-green transition-all text-center">
                <div className="text-4xl mb-2">{cat.icon}</div>
                <div className="font-bold text-konekt-black dark:text-white mb-1">{cat.label}</div>
                <div className="text-sm text-konekt-black/60 dark:text-white/60">{cat.count} items</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Trending */}
      <div>
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="w-6 h-6 text-konekt-green" />
          <h2 className="text-2xl font-bold text-konekt-black dark:text-white">Trending This Week</h2>
        </div>
        <div className="space-y-4">
          {trendingResources.map((resource, idx) => (
            <Link key={resource.id} href={`/library/resource/${resource.id}`}>
              <div className="bg-white dark:bg-[#1a1a1a] rounded-xl border-2 border-konekt-black/10 dark:border-white/10 p-6 hover:border-konekt-green transition-all">
                <div className="flex items-start gap-4">
                  <div className="text-2xl font-bold text-konekt-green">▲ {resource.stats.upvotes}</div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-konekt-black dark:text-white mb-2">{resource.title}</h3>
                    <p className="text-konekt-black/70 dark:text-white/70 mb-3">{resource.description}</p>
                    <div className="flex items-center gap-4 text-sm text-konekt-black/60 dark:text-white/60">
                      <span>by {resource.author.name}</span>
                      <span>•</span>
                      <span>{resource.readTime || resource.watchTime} min {resource.type === 'video' ? 'watch' : 'read'}</span>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                        <span>{resource.stats.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
