import { 
  profiles, skills, projects, contacts,
  type Profile, type InsertProfile,
  type Skill, type InsertSkill,
  type Project, type InsertProject,
  type Contact, type InsertContact
} from "@shared/schema";

export interface IStorage {
  // Profile methods
  getProfile(): Promise<Profile | undefined>;
  createProfile(profile: InsertProfile): Promise<Profile>;
  updateProfile(profile: Partial<InsertProfile>): Promise<Profile>;

  // Skills methods
  getSkills(): Promise<Skill[]>;
  createSkill(skill: InsertSkill): Promise<Skill>;

  // Projects methods
  getProjects(): Promise<Project[]>;
  getFeaturedProjects(): Promise<Project[]>;
  createProject(project: InsertProject): Promise<Project>;

  // Contact methods
  createContact(contact: InsertContact): Promise<Contact>;
  getContacts(): Promise<Contact[]>;
}

export class MemStorage implements IStorage {
  private profiles: Map<number, Profile>;
  private skills: Map<number, Skill>;
  private projects: Map<number, Project>;
  private contacts: Map<number, Contact>;
  private currentProfileId: number;
  private currentSkillId: number;
  private currentProjectId: number;
  private currentContactId: number;

  constructor() {
    this.profiles = new Map();
    this.skills = new Map();
    this.projects = new Map();
    this.contacts = new Map();
    this.currentProfileId = 1;
    this.currentSkillId = 1;
    this.currentProjectId = 1;
    this.currentContactId = 1;

    // Initialize with sample data
    this.initializeSampleData();
  }

  private initializeSampleData() {
    // Create default profile
    const defaultProfile: Profile = {
      id: 1,
      name: "Alex Chen",
      title: "Full Stack Developer & UI/UX Designer",
      bio: "I create beautiful, functional web applications that solve real-world problems. With 5+ years of experience in modern web technologies, I help businesses build their digital presence.",
      email: "alex.chen@email.com",
      phone: "+1 (555) 123-4567",
      location: "San Francisco, CA",
      education: "B.S. Computer Science\nUniversity of California, Berkeley",
      currentRole: "Senior Full Stack Developer\nTech Innovations Inc.",
      profileImageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400"
    };
    this.profiles.set(1, defaultProfile);

    // Create default skills
    const defaultSkills: Skill[] = [
      { id: 1, category: "Frontend", name: "React/Next.js", level: "Expert", percentage: 92 },
      { id: 2, category: "Frontend", name: "TypeScript", level: "Advanced", percentage: 85 },
      { id: 3, category: "Frontend", name: "Tailwind CSS", level: "Expert", percentage: 92 },
      { id: 4, category: "Backend", name: "Node.js", level: "Expert", percentage: 85 },
      { id: 5, category: "Backend", name: "Python", level: "Advanced", percentage: 80 },
      { id: 6, category: "Backend", name: "PostgreSQL", level: "Advanced", percentage: 80 },
      { id: 7, category: "Tools", name: "Git/GitHub", level: "Expert", percentage: 92 },
      { id: 8, category: "Tools", name: "Docker", level: "Advanced", percentage: 80 },
      { id: 9, category: "Tools", name: "AWS", level: "Intermediate", percentage: 60 },
    ];
    defaultSkills.forEach(skill => this.skills.set(skill.id, skill));
    this.currentSkillId = 10;

    // Create default projects
    const defaultProjects: Project[] = [
      {
        id: 1,
        title: "E-commerce Dashboard",
        description: "A comprehensive admin dashboard for managing online stores with real-time analytics and inventory management.",
        imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
        technologies: ["React", "Node.js", "MongoDB"],
        liveUrl: "#",
        codeUrl: "#",
        featured: 1
      },
      {
        id: 2,
        title: "Fitness Tracker App",
        description: "Mobile fitness application with workout tracking, progress analytics, and social features for motivation.",
        imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
        technologies: ["React Native", "Firebase", "Redux"],
        liveUrl: "#",
        codeUrl: "#",
        featured: 1
      },
      {
        id: 3,
        title: "Task Management System",
        description: "Collaborative project management tool with kanban boards, team collaboration, and deadline tracking.",
        imageUrl: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
        technologies: ["Vue.js", "Express", "MySQL"],
        liveUrl: "#",
        codeUrl: "#",
        featured: 1
      }
    ];
    defaultProjects.forEach(project => this.projects.set(project.id, project));
    this.currentProjectId = 4;
  }

  async getProfile(): Promise<Profile | undefined> {
    return Array.from(this.profiles.values())[0];
  }

  async createProfile(insertProfile: InsertProfile): Promise<Profile> {
    const id = this.currentProfileId++;
    const profile: Profile = { ...insertProfile, id };
    this.profiles.set(id, profile);
    return profile;
  }

  async updateProfile(profileData: Partial<InsertProfile>): Promise<Profile> {
    const existingProfile = Array.from(this.profiles.values())[0];
    if (!existingProfile) {
      throw new Error("No profile found to update");
    }
    const updatedProfile: Profile = { ...existingProfile, ...profileData };
    this.profiles.set(existingProfile.id, updatedProfile);
    return updatedProfile;
  }

  async getSkills(): Promise<Skill[]> {
    return Array.from(this.skills.values());
  }

  async createSkill(insertSkill: InsertSkill): Promise<Skill> {
    const id = this.currentSkillId++;
    const skill: Skill = { ...insertSkill, id };
    this.skills.set(id, skill);
    return skill;
  }

  async getProjects(): Promise<Project[]> {
    return Array.from(this.projects.values());
  }

  async getFeaturedProjects(): Promise<Project[]> {
    return Array.from(this.projects.values()).filter(project => project.featured === 1);
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const id = this.currentProjectId++;
    const project: Project = { ...insertProject, id };
    this.projects.set(id, project);
    return project;
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = this.currentContactId++;
    const contact: Contact = { 
      ...insertContact, 
      id, 
      createdAt: new Date().toISOString() 
    };
    this.contacts.set(id, contact);
    return contact;
  }

  async getContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values());
  }
}

export const storage = new MemStorage();
