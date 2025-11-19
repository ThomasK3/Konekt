export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface Availability {
  hoursPerWeek: number;
  isPaid: boolean;
}

export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  school: string;
  skills: string[];
  bio: string;
  videoUrl?: string;
  avatar?: string;
  role: 'student' | 'mentor';
  lookingFor: string[];
  availability: Availability;
  badges: Badge[];
  projectIds: string[];
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

export interface ProjectRole {
  role: string;
  skills: string[];
  count: number;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  stack: string[];
  stage: 'idea' | 'mvp' | 'launched';
  lookingFor: ProjectRole[];
  teamMembers: User[];
  ownerId: string;
  createdAt: Date;
  image?: string;
}

export interface RegistrationData {
  step: number;
  name: string;
  email: string;
  school: string;
  skills: string[];
  bio: string;
  videoUrl?: string;
  lookingFor: string[];
  availability: Availability;
}

export interface Event {
  id: string;
  name: string;
  date: string;
  location: string;
  description: string;
}
