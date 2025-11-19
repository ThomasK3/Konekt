export interface User {
  id: string;
  name: string;
  email: string;
  school: string;
  skills: string[];
  bio: string;
  videoUrl?: string;
  avatar?: string;
  role: 'student' | 'mentor';
}

export interface Channel {
  id: string;
  name: string;
  event: string;
  description: string;
  memberCount: number;
  image?: string;
  color: string;
}

export interface Post {
  id: string;
  author: User;
  content: string;
  channel: Channel;
  createdAt: Date;
  likes: number;
  comments: number;
  image?: string;
}

export interface Mentor {
  id: string;
  name: string;
  role: string;
  company: string;
  expertise: string[];
  bio: string;
  avatar?: string;
  connectionReason?: string;
}

export interface RegistrationData {
  step: number;
  name: string;
  email: string;
  school: string;
  skills: string[];
  bio: string;
  videoUrl?: string;
}

export interface Event {
  id: string;
  name: string;
  date: string;
  location: string;
  description: string;
}
