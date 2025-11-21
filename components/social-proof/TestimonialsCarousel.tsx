'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { mockTestimonials } from '@/lib/social-proof-data';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

export const TestimonialsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % mockTestimonials.length);
    }, 8000); // Auto-rotate every 8 seconds

    return () => clearInterval(interval);
  }, []);

  const next = () => setCurrentIndex((prev) => (prev + 1) % mockTestimonials.length);
  const prev = () =>
    setCurrentIndex((prevIndex) => (prevIndex - 1 + mockTestimonials.length) % mockTestimonials.length);

  const testimonial = mockTestimonials[currentIndex];

  return (
    <div className="bg-konekt-white rounded-3xl border-2 border-konekt-black/10 p-8 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-konekt-green/10 to-konekt-pink/10 rounded-full blur-3xl" />

      <div className="relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-konekt-black mb-2">💬 What People Say</h2>
          <p className="text-konekt-black/60">Real stories from our community</p>
        </div>

        {/* Testimonial Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="text-center"
          >
            {/* Stars */}
            <div className="flex justify-center gap-1 mb-6">
              {Array.from({ length: testimonial.rating }).map((_, i) => (
                <Star key={i} className="w-6 h-6 text-yellow-500 fill-yellow-500" />
              ))}
            </div>

            {/* Quote */}
            <blockquote className="text-2xl font-medium text-konekt-black mb-8 max-w-3xl mx-auto leading-relaxed">
              "{testimonial.quote}"
            </blockquote>

            {/* Author */}
            <div className="flex items-center justify-center gap-4">
              <img
                src={testimonial.avatar}
                alt={testimonial.author}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="text-left">
                <div className="font-bold text-konekt-black text-lg">{testimonial.author}</div>
                <div className="text-konekt-black/60">
                  {testimonial.role} @ {testimonial.company}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={prev}
            className="p-3 bg-konekt-cream hover:bg-konekt-black/10 rounded-full transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-konekt-black" />
          </button>

          {/* Dots */}
          <div className="flex gap-2">
            {mockTestimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? 'bg-konekt-green w-6'
                    : 'bg-konekt-black/20 hover:bg-konekt-black/40'
                }`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="p-3 bg-konekt-cream hover:bg-konekt-black/10 rounded-full transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-konekt-black" />
          </button>
        </div>
      </div>
    </div>
  );
};
