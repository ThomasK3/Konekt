'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import AppLayout from '@/components/layout/AppLayout';
import {
  getMentorById,
  getReviewsByMentor,
  getRatingBreakdown
} from '@/lib/mentor-data';
import {
  Star,
  MapPin,
  Globe,
  Calendar,
  MessageCircle,
  Heart,
  Briefcase,
  GraduationCap,
  Trophy,
  ExternalLink,
  ThumbsUp,
  Clock,
  CheckCircle
} from 'lucide-react';
import { motion } from 'framer-motion';

type Tab = 'about' | 'expertise' | 'availability' | 'reviews' | 'content';

export default function MentorProfilePage() {
  const params = useParams();
  const mentorId = params.id as string;
  const mentor = getMentorById(mentorId);
  const [activeTab, setActiveTab] = useState<Tab>('about');
  const [showBookingModal, setShowBookingModal] = useState(false);

  if (!mentor) {
    return (
      <AppLayout>
        <div className="text-center py-20">
          <h1 className="text-2xl font-bold text-konekt-black dark:text-white">
            Mentor not found
          </h1>
        </div>
      </AppLayout>
    );
  }

  const reviews = getReviewsByMentor(mentorId);
  const ratingBreakdown = getRatingBreakdown(mentorId);

  const tabs: { value: Tab; label: string }[] = [
    { value: 'about', label: 'About' },
    { value: 'expertise', label: 'Expertise' },
    { value: 'availability', label: 'Availability' },
    { value: 'reviews', label: 'Reviews' },
    { value: 'content', label: 'Content' }
  ];

  return (
    <AppLayout>
      {/* Hero Section */}
      <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl border-2 border-konekt-black/10 dark:border-white/10 overflow-hidden mb-8">
        {/* Cover Photo */}
        <div className="h-48 overflow-hidden">
          <img
            src={mentor.coverPhoto}
            alt="Cover"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Profile Info */}
        <div className="p-8">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            {/* Avatar */}
            <div className="relative">
              <img
                src={mentor.photo}
                alt={mentor.name}
                className="w-32 h-32 rounded-2xl border-4 border-white dark:border-[#1a1a1a] shadow-lg object-cover"
              />
              <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-konekt-green rounded-full border-4 border-white dark:border-[#1a1a1a] flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
            </div>

            {/* Info */}
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-konekt-black dark:text-white mb-2">
                {mentor.name}
              </h1>
              <p className="text-xl text-konekt-black/70 dark:text-white/70 mb-2">
                {mentor.title} @ {mentor.company}
              </p>
              <div className="flex flex-wrap items-center gap-4 text-konekt-black/60 dark:text-white/60 mb-4">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{mentor.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Globe className="w-4 h-4" />
                  <span>{mentor.languages.join(', ')}</span>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1 text-amber-500">
                  <Star className="w-5 h-5 fill-amber-500" />
                  <span className="text-xl font-bold">{mentor.rating}</span>
                  <span className="text-konekt-black/60 dark:text-white/60">
                    ({mentor.reviewCount} reviews)
                  </span>
                </div>
                <span className="text-konekt-black/60 dark:text-white/60">
                  • {mentor.sessionsCompleted} sessions completed
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setShowBookingModal(true)}
                  className="px-6 py-3 bg-konekt-green text-white font-bold rounded-xl hover:opacity-90 transition-opacity flex items-center gap-2"
                >
                  <Calendar className="w-5 h-5" />
                  Book Session
                </button>
                <button className="px-6 py-3 bg-konekt-cream dark:bg-white/10 text-konekt-black dark:text-white font-bold rounded-xl hover:bg-konekt-green hover:text-white transition-all flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  Message
                </button>
                <button className="px-6 py-3 bg-konekt-cream dark:bg-white/10 text-konekt-black dark:text-white font-bold rounded-xl hover:bg-konekt-green hover:text-white transition-all flex items-center gap-2">
                  <Heart className="w-5 h-5" />
                  Follow
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl border-2 border-konekt-black/10 dark:border-white/10 overflow-hidden mb-8">
        <div className="flex overflow-x-auto border-b border-konekt-black/10 dark:border-white/10">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`px-6 py-4 font-bold whitespace-nowrap transition-all ${
                activeTab === tab.value
                  ? 'text-konekt-green border-b-2 border-konekt-green'
                  : 'text-konekt-black/60 dark:text-white/60 hover:text-konekt-black dark:hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-8">
          {/* ABOUT TAB */}
          {activeTab === 'about' && (
            <div className="space-y-8">
              {/* About */}
              <div>
                <h2 className="text-2xl font-bold text-konekt-black dark:text-white mb-4">
                  About {mentor.name.split(' ')[0]}
                </h2>
                <p className="text-konekt-black/70 dark:text-white/70 whitespace-pre-line">
                  {mentor.bio}
                </p>
              </div>

              {/* What I Can Help With */}
              <div className="border-t border-konekt-black/10 dark:border-white/10 pt-8">
                <h3 className="text-xl font-bold text-konekt-black dark:text-white mb-4">
                  What I Can Help With
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {mentor.canHelpWith.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-2 text-konekt-black dark:text-white"
                    >
                      <CheckCircle className="w-5 h-5 text-konekt-green flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Background */}
              <div className="border-t border-konekt-black/10 dark:border-white/10 pt-8">
                <h3 className="text-xl font-bold text-konekt-black dark:text-white mb-6">
                  Background
                </h3>
                <div className="space-y-6">
                  {mentor.experience.map((exp, idx) => (
                    <div key={idx} className="flex gap-4">
                      <div className="w-12 h-12 bg-konekt-green/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Briefcase className="w-6 h-6 text-konekt-green" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-konekt-black dark:text-white">
                          {exp.title} @ {exp.company}
                        </h4>
                        <p className="text-sm text-konekt-black/60 dark:text-white/60 mb-2">
                          {exp.period} • {exp.location}
                        </p>
                        <p className="text-konekt-black/70 dark:text-white/70">
                          {exp.description}
                        </p>
                      </div>
                    </div>
                  ))}

                  {mentor.education.map((edu, idx) => (
                    <div key={idx} className="flex gap-4">
                      <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <GraduationCap className="w-6 h-6 text-blue-500" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-konekt-black dark:text-white">
                          {edu.school}
                        </h4>
                        <p className="text-sm text-konekt-black/60 dark:text-white/60">
                          {edu.degree} • {edu.period}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Achievements */}
              {mentor.achievements && mentor.achievements.length > 0 && (
                <div className="border-t border-konekt-black/10 dark:border-white/10 pt-8">
                  <h3 className="text-xl font-bold text-konekt-black dark:text-white mb-4">
                    Achievements & Recognition
                  </h3>
                  <ul className="space-y-2">
                    {mentor.achievements.map((achievement, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-konekt-black dark:text-white"
                      >
                        <Trophy className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Social & Links */}
              <div className="border-t border-konekt-black/10 dark:border-white/10 pt-8">
                <h3 className="text-xl font-bold text-konekt-black dark:text-white mb-4">
                  Social & Links
                </h3>
                <div className="flex flex-wrap gap-3">
                  {mentor.social.linkedin && (
                    <a
                      href={`https://${mentor.social.linkedin}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-konekt-cream dark:bg-white/10 text-konekt-black dark:text-white rounded-lg hover:bg-konekt-green hover:text-white transition-all flex items-center gap-2"
                    >
                      <ExternalLink className="w-4 h-4" />
                      LinkedIn
                    </a>
                  )}
                  {mentor.social.twitter && (
                    <a
                      href={`https://twitter.com/${mentor.social.twitter.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-konekt-cream dark:bg-white/10 text-konekt-black dark:text-white rounded-lg hover:bg-konekt-green hover:text-white transition-all flex items-center gap-2"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Twitter
                    </a>
                  )}
                  {mentor.social.blog && (
                    <a
                      href={`https://${mentor.social.blog}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-konekt-cream dark:bg-white/10 text-konekt-black dark:text-white rounded-lg hover:bg-konekt-green hover:text-white transition-all flex items-center gap-2"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Blog
                    </a>
                  )}
                  {mentor.social.website && (
                    <a
                      href={`https://${mentor.social.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-konekt-cream dark:bg-white/10 text-konekt-black dark:text-white rounded-lg hover:bg-konekt-green hover:text-white transition-all flex items-center gap-2"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Company
                    </a>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* EXPERTISE TAB */}
          {activeTab === 'expertise' && (
            <div className="space-y-8">
              {/* Primary Skills */}
              <div>
                <h2 className="text-2xl font-bold text-konekt-black dark:text-white mb-6">
                  Primary Skills
                </h2>
                <div className="space-y-6">
                  {mentor.primarySkills.map((skill, idx) => (
                    <div key={idx} className="bg-konekt-cream dark:bg-white/5 rounded-xl p-6">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-xl font-bold text-konekt-black dark:text-white">
                          {skill.name}
                        </h3>
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-5 h-5 ${
                                i < skill.rating
                                  ? 'fill-amber-500 text-amber-500'
                                  : 'text-konekt-black/20 dark:text-white/20'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-konekt-black/70 dark:text-white/70 mb-4">
                        {skill.description}
                      </p>
                      <div className="flex gap-4 text-sm text-konekt-black/60 dark:text-white/60">
                        <span>{skill.yearsExperience} years experience</span>
                        <span>•</span>
                        <span>{skill.projectsCompleted}+ projects</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Secondary Skills */}
              {mentor.secondarySkills && mentor.secondarySkills.length > 0 && (
                <div className="border-t border-konekt-black/10 dark:border-white/10 pt-8">
                  <h2 className="text-2xl font-bold text-konekt-black dark:text-white mb-6">
                    Secondary Skills
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {mentor.secondarySkills.map((skill, idx) => (
                      <div key={idx} className="bg-konekt-cream dark:bg-white/5 rounded-xl p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-bold text-konekt-black dark:text-white">
                            {skill.name}
                          </h3>
                          <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < skill.rating
                                    ? 'fill-amber-500 text-amber-500'
                                    : 'text-konekt-black/20 dark:text-white/20'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-konekt-black/70 dark:text-white/70">
                          {skill.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Industries & Tools */}
              <div className="border-t border-konekt-black/10 dark:border-white/10 pt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-bold text-konekt-black dark:text-white mb-4">
                    Industries
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {mentor.industries.map((industry, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 bg-konekt-green/10 text-konekt-green rounded-lg text-sm font-medium"
                      >
                        {industry}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-konekt-black dark:text-white mb-4">
                    Tools & Platforms
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {mentor.tools.map((tool, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 bg-blue-500/10 text-blue-500 rounded-lg text-sm font-medium"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* AVAILABILITY TAB */}
          {activeTab === 'availability' && (
            <div className="space-y-8">
              <h2 className="text-2xl font-bold text-konekt-black dark:text-white">
                Book a Session with {mentor.name.split(' ')[0]}
              </h2>

              {/* Session Types */}
              <div className="space-y-4">
                {mentor.sessionTypes.map((sessionType, idx) => (
                  <div
                    key={idx}
                    className="bg-konekt-cream dark:bg-white/5 rounded-xl p-6 flex items-start justify-between"
                  >
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-konekt-black dark:text-white mb-2">
                        {sessionType.type === 'intro' && '💬 INTRO CALL'}
                        {sessionType.type === 'focused' && '🎯 FOCUSED SESSION'}
                        {sessionType.type === 'package' && '📦 PACKAGE: 4 SESSIONS'}
                        <span className="ml-3 text-sm font-normal text-konekt-black/60 dark:text-white/60">
                          ({sessionType.duration} min{sessionType.type === 'package' && ' each'})
                        </span>
                        {sessionType.price === 0 && (
                          <span className="ml-3 px-2 py-1 bg-konekt-green text-white text-xs font-bold rounded">
                            FREE
                          </span>
                        )}
                      </h3>
                      <p className="text-konekt-black/70 dark:text-white/70 mb-4">
                        {sessionType.description}
                      </p>
                    </div>
                    <button
                      onClick={() => setShowBookingModal(true)}
                      className="px-6 py-2 bg-konekt-green text-white font-bold rounded-lg hover:opacity-90 transition-opacity whitespace-nowrap"
                    >
                      Book →
                    </button>
                  </div>
                ))}
              </div>

              {/* Available Times */}
              <div className="border-t border-konekt-black/10 dark:border-white/10 pt-8">
                <h3 className="text-xl font-bold text-konekt-black dark:text-white mb-6">
                  Available Times (This Week)
                </h3>
                <div className="space-y-6">
                  {mentor.availability.slice(0, 2).map((avail, idx) => {
                    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                    const date = new Date();
                    date.setDate(date.getDate() + (avail.dayOfWeek - date.getDay() + 7) % 7);
                    const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

                    return (
                      <div key={idx}>
                        <h4 className="font-bold text-konekt-black dark:text-white mb-3">
                          {days[avail.dayOfWeek]}, {dateStr}
                        </h4>
                        <div className="flex flex-wrap gap-3">
                          {avail.slots.map((slot, slotIdx) => (
                            <button
                              key={slotIdx}
                              onClick={() => setShowBookingModal(true)}
                              className="px-6 py-3 bg-white dark:bg-[#0a0a0a] border-2 border-konekt-black/10 dark:border-white/10 rounded-lg font-medium text-konekt-black dark:text-white hover:border-konekt-green hover:bg-konekt-green hover:text-white transition-all"
                            >
                              {slot}
                            </button>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-6 text-center">
                  <button className="text-konekt-green font-bold hover:underline">
                    View More Dates →
                  </button>
                </div>
              </div>

              {/* Can't find time */}
              <div className="border-t border-konekt-black/10 dark:border-white/10 pt-8 text-center">
                <p className="text-konekt-black/60 dark:text-white/60 mb-4">
                  📅 Can't find a time that works?
                </p>
                <button className="px-6 py-3 bg-konekt-cream dark:bg-white/10 text-konekt-black dark:text-white font-bold rounded-lg hover:bg-konekt-green hover:text-white transition-all">
                  Request Custom Time
                </button>
              </div>
            </div>
          )}

          {/* REVIEWS TAB */}
          {activeTab === 'reviews' && (
            <div className="space-y-8">
              {/* Rating Overview */}
              <div className="bg-konekt-cream dark:bg-white/5 rounded-xl p-8">
                <div className="flex items-center gap-8 mb-6">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-konekt-black dark:text-white mb-2">
                      {mentor.rating}
                    </div>
                    <div className="flex gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-6 h-6 ${
                            i < Math.floor(mentor.rating)
                              ? 'fill-amber-500 text-amber-500'
                              : 'text-konekt-black/20 dark:text-white/20'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-konekt-black/60 dark:text-white/60">
                      Based on {mentor.reviewCount} reviews
                    </p>
                  </div>

                  <div className="flex-1 space-y-2">
                    {[5, 4, 3, 2, 1].map((stars) => {
                      const count = ratingBreakdown[stars as keyof typeof ratingBreakdown];
                      const percentage = mentor.reviewCount > 0 ? (count / mentor.reviewCount) * 100 : 0;

                      return (
                        <div key={stars} className="flex items-center gap-3">
                          <span className="text-sm font-medium text-konekt-black dark:text-white w-16">
                            {stars} stars:
                          </span>
                          <div className="flex-1 h-2 bg-konekt-black/10 dark:bg-white/10 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-amber-500 rounded-full"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <span className="text-sm text-konekt-black/60 dark:text-white/60 w-20">
                            {count} ({Math.round(percentage)}%)
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Reviews List */}
              <div>
                <h2 className="text-2xl font-bold text-konekt-black dark:text-white mb-6">
                  Recent Reviews
                </h2>
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div
                      key={review.id}
                      className="bg-white dark:bg-[#0a0a0a] rounded-xl border-2 border-konekt-black/10 dark:border-white/10 p-6"
                    >
                      <div className="flex items-start gap-4 mb-4">
                        <img
                          src={review.reviewerAvatar}
                          alt={review.reviewerName}
                          className="w-12 h-12 rounded-full"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <h4 className="font-bold text-konekt-black dark:text-white">
                                {review.reviewerName}
                              </h4>
                              <p className="text-sm text-konekt-black/60 dark:text-white/60">
                                {review.createdAt.toLocaleDateString('en-US', {
                                  month: 'short',
                                  day: 'numeric',
                                  year: 'numeric'
                                })}
                              </p>
                            </div>
                            <div className="flex gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-5 h-5 ${
                                    i < review.rating
                                      ? 'fill-amber-500 text-amber-500'
                                      : 'text-konekt-black/20 dark:text-white/20'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-konekt-black/80 dark:text-white/80 mb-3">
                            "{review.comment}"
                          </p>
                          <div className="flex items-center gap-4 text-sm text-konekt-black/60 dark:text-white/60">
                            <span>Session: {review.sessionTopic}</span>
                            <span>•</span>
                            <span>{review.sessionDuration} min</span>
                          </div>
                          <button className="mt-3 text-sm text-konekt-black/60 dark:text-white/60 hover:text-konekt-green flex items-center gap-1">
                            <ThumbsUp className="w-4 h-4" />
                            Helpful ({review.helpfulCount})
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* CONTENT TAB */}
          {activeTab === 'content' && (
            <div className="space-y-8">
              <h2 className="text-2xl font-bold text-konekt-black dark:text-white">
                {mentor.name.split(' ')[0]}'s Insights & Content
              </h2>

              {/* Posts */}
              {mentor.posts && mentor.posts.length > 0 ? (
                <div>
                  <h3 className="text-xl font-bold text-konekt-black dark:text-white mb-6">
                    Recent Posts
                  </h3>
                  <div className="space-y-6">
                    {mentor.posts.map((post) => (
                      <div
                        key={post.id}
                        className="bg-white dark:bg-[#0a0a0a] rounded-xl border-2 border-konekt-black/10 dark:border-white/10 p-6 hover:border-konekt-green transition-all"
                      >
                        <div className="flex items-start gap-3 mb-3">
                          {post.type === 'article' ? '📝' : '🎥'}
                          <h4 className="flex-1 text-xl font-bold text-konekt-black dark:text-white">
                            {post.title}
                          </h4>
                        </div>
                        <p className="text-sm text-konekt-black/60 dark:text-white/60 mb-3">
                          Posted {post.postedAt.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                          {' • '}
                          {post.type === 'article' ? `${post.readTime} min read` : `${post.watchTime} min watch`}
                        </p>
                        <p className="text-konekt-black/70 dark:text-white/70 mb-4">
                          {post.content}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-konekt-black/60 dark:text-white/60">
                          <button className="hover:text-konekt-green flex items-center gap-1">
                            Read More →
                          </button>
                          <span>👁️ {post.views} views</span>
                          <span>❤️ {post.likes}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-konekt-black/60 dark:text-white/60">
                  No posts yet
                </div>
              )}

              {/* Speaking & Events */}
              {mentor.speaking && mentor.speaking.length > 0 && (
                <div className="border-t border-konekt-black/10 dark:border-white/10 pt-8">
                  <h3 className="text-xl font-bold text-konekt-black dark:text-white mb-6">
                    Speaking & Events
                  </h3>
                  <div className="space-y-4">
                    {mentor.speaking.map((speaking, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 bg-konekt-cream dark:bg-white/5 rounded-lg p-4"
                      >
                        <span className="text-2xl">🎤</span>
                        <div>
                          <h4 className="font-bold text-konekt-black dark:text-white">
                            {speaking.event}
                          </h4>
                          <p className="text-konekt-black/70 dark:text-white/70">
                            "{speaking.title}"
                          </p>
                          <p className="text-sm text-konekt-black/60 dark:text-white/60">
                            {speaking.date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Booking Modal (simple placeholder) */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl border-2 border-konekt-black/10 dark:border-white/10 max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8">
            <h2 className="text-2xl font-bold text-konekt-black dark:text-white mb-6">
              Book Session with {mentor.name}
            </h2>
            <p className="text-konekt-black/60 dark:text-white/60 mb-6">
              Booking functionality coming soon! You would select a time, topic, and provide your contact information.
            </p>
            <button
              onClick={() => setShowBookingModal(false)}
              className="w-full py-3 bg-konekt-green text-white font-bold rounded-lg hover:opacity-90 transition-opacity"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </AppLayout>
  );
}
