'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Upload, Image, Video, X, Plus } from 'lucide-react';
import { Input } from '@/components/ui/Input';

interface ProjectMediaProps {
  data: {
    coverImage?: string;
    coverVideo?: string;
    gallery: Array<{ id: string; type: 'image' | 'video'; url: string; caption?: string }>;
  };
  onChange: (data: any) => void;
}

export const ProjectMedia = ({ data, onChange }: ProjectMediaProps) => {
  const [newGalleryUrl, setNewGalleryUrl] = useState('');
  const [newGalleryType, setNewGalleryType] = useState<'image' | 'video'>('image');

  const addToGallery = () => {
    if (!newGalleryUrl) return;

    const newItem = {
      id: `media-${Date.now()}`,
      type: newGalleryType,
      url: newGalleryUrl,
      caption: '',
    };

    onChange({
      ...data,
      gallery: [...data.gallery, newItem],
    });

    setNewGalleryUrl('');
  };

  const removeFromGallery = (id: string) => {
    onChange({
      ...data,
      gallery: data.gallery.filter((item) => item.id !== id),
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-3">Show your project</h2>
        <p className="text-white/60">Add images and videos to bring it to life</p>
      </div>

      {/* Cover Image */}
      <div>
        <label className="block text-sm font-medium text-white mb-2">
          Cover Image (16:9 recommended)
        </label>
        <div className="bg-[#151515] border-2 border-dashed border-white/20 rounded-xl p-6 hover:border-konekt-green/50 transition-colors">
          {data.coverImage ? (
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <img src={data.coverImage} alt="Cover" className="w-full h-full object-cover" />
              <button
                onClick={() => onChange({ ...data, coverImage: '' })}
                className="absolute top-2 right-2 p-2 bg-red-500 rounded-lg hover:bg-red-600 transition-colors"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>
          ) : (
            <div className="text-center">
              <Upload className="w-12 h-12 text-white/30 mx-auto mb-3" />
              <Input
                placeholder="Paste image URL (e.g., https://images.unsplash.com/...)"
                value={data.coverImage || ''}
                onChange={(e) => onChange({ ...data, coverImage: e.target.value })}
              />
            </div>
          )}
        </div>
      </div>

      {/* Cover Video (optional) */}
      <div>
        <label className="block text-sm font-medium text-white mb-2">
          Cover Video (YouTube/Vimeo) - Optional
        </label>
        <Input
          placeholder="e.g., https://youtube.com/watch?v=..."
          value={data.coverVideo || ''}
          onChange={(e) => onChange({ ...data, coverVideo: e.target.value })}
          icon={Video}
        />
        <div className="text-xs text-white/40 mt-1">
          Video will be shown alongside the cover image
        </div>
      </div>

      {/* Gallery */}
      <div>
        <label className="block text-sm font-medium text-white mb-2">
          Gallery (Screenshots, Demos)
        </label>

        {/* Add to Gallery */}
        <div className="bg-[#151515] border-2 border-white/10 rounded-xl p-4 mb-4">
          <div className="flex gap-3 mb-3">
            <button
              onClick={() => setNewGalleryType('image')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                newGalleryType === 'image'
                  ? 'bg-konekt-green text-white'
                  : 'bg-white/5 text-white/60 hover:bg-white/10'
              }`}
            >
              <Image className="w-4 h-4 inline mr-2" />
              Image
            </button>
            <button
              onClick={() => setNewGalleryType('video')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                newGalleryType === 'video'
                  ? 'bg-konekt-green text-white'
                  : 'bg-white/5 text-white/60 hover:bg-white/10'
              }`}
            >
              <Video className="w-4 h-4 inline mr-2" />
              Video
            </button>
          </div>

          <div className="flex gap-2">
            <Input
              placeholder={`Paste ${newGalleryType} URL...`}
              value={newGalleryUrl}
              onChange={(e) => setNewGalleryUrl(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addToGallery();
                }
              }}
            />
            <button
              onClick={addToGallery}
              disabled={!newGalleryUrl}
              className="px-4 py-2 bg-konekt-green text-white rounded-lg hover:bg-konekt-green/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Gallery Grid */}
        {data.gallery.length > 0 ? (
          <div className="grid grid-cols-2 gap-3">
            {data.gallery.map((item) => (
              <motion.div
                key={item.id}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="relative aspect-video bg-[#151515] border-2 border-white/10 rounded-xl overflow-hidden group"
              >
                {item.type === 'image' ? (
                  <img src={item.url} alt={item.caption || ''} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Video className="w-8 h-8 text-white/40" />
                  </div>
                )}
                <button
                  onClick={() => removeFromGallery(item.id)}
                  className="absolute top-2 right-2 p-2 bg-red-500 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-[#151515] border-2 border-dashed border-white/10 rounded-xl">
            <Image className="w-12 h-12 text-white/20 mx-auto mb-2" />
            <p className="text-white/40 text-sm">No gallery items yet</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};
