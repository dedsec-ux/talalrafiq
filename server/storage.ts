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
      name: "Talal Rafiq",
      title: "Mobile App Developer",
      bio: "Passionate Flutter developer crafting innovative mobile experiences. Specialized in cross-platform app development with expertise in Firebase integration, AI/ML implementation, and secure data handling. Currently building cutting-edge solutions from e-commerce platforms to health-tech applications.",
      email: "talalrafiq06@gmail.com",
      phone: "+92 313-5143069",
      location: "Multi Garden B-17, Islamabad",
      education: "BS Software Engineering\nSS-CASE-IT, Islamabad\n7th Semester (2021 - Ongoing)\n\nFCS Pre Engineering\nCadet College Attock (2019 - 2021)\n\nMatric\nAl-Sadiq Public Secondary School, Attock City (2017 - 2019)",
      currentRole: "Independent Mobile App Developer\nFreelance Flutter Development",
      profileImageUrl: "/attached_assets/F1139420-CC1B-4111-9D9C-3673BB72DDD2_1749393529210.jpg"
    };
    this.profiles.set(1, defaultProfile);

    // Create default skills
    const defaultSkills: Skill[] = [
      { id: 1, category: "Mobile", name: "Flutter & Dart", level: "Expert", percentage: 95 },
      { id: 2, category: "Mobile", name: "Android SDK", level: "Advanced", percentage: 85 },
      { id: 3, category: "Mobile", name: "iOS Development", level: "Intermediate", percentage: 70 },
      { id: 4, category: "Mobile", name: "Cross-Platform Dev", level: "Expert", percentage: 90 },
      { id: 5, category: "Mobile", name: "Native Features", level: "Advanced", percentage: 80 },
      { id: 6, category: "Backend", name: "Firebase", level: "Expert", percentage: 90 },
      { id: 7, category: "Backend", name: "SupaBase", level: "Advanced", percentage: 85 },
      { id: 8, category: "Backend", name: "AWS", level: "Intermediate", percentage: 70 },
      { id: 9, category: "Backend", name: "API Integration", level: "Expert", percentage: 90 },
      { id: 10, category: "Game Dev", name: "Flame Engine", level: "Intermediate", percentage: 70 },
      { id: 11, category: "AI/ML", name: "AI Model Integration", level: "Intermediate", percentage: 70 },
      { id: 12, category: "AI/ML", name: "Machine Learning", level: "Advanced", percentage: 80 },
      { id: 13, category: "AI/ML", name: "Deep Learning", level: "Intermediate", percentage: 75 },
      { id: 14, category: "AI/ML", name: "Natural Language Processing", level: "Intermediate", percentage: 70 },
      { id: 15, category: "AI/ML", name: "Computer Vision", level: "Intermediate", percentage: 70 },
      { id: 16, category: "Tools", name: "Git & VS Code", level: "Expert", percentage: 95 },
      { id: 17, category: "Tools", name: "Figma", level: "Intermediate", percentage: 65 },
      { id: 18, category: "Tools", name: "VS Code Extensions", level: "Expert", percentage: 90 },
      { id: 19, category: "Tools", name: "GitFlow", level: "Advanced", percentage: 85 },
      { id: 20, category: "Skills", name: "Problem Solving", level: "Expert", percentage: 95 },
      { id: 21, category: "Skills", name: "Communication", level: "Advanced", percentage: 85 },
      { id: 22, category: "Skills", name: "Teamwork", level: "Advanced", percentage: 80 },
      { id: 23, category: "Skills", name: "Time Management", level: "Intermediate", percentage: 75 },
      { id: 24, category: "Skills", name: "Creativity", level: "Expert", percentage: 90 },
    ];
    defaultSkills.forEach(skill => this.skills.set(skill.id, skill));
    this.currentSkillId = 25;

    // Create default projects
    const defaultProjects: Project[] = [
      {
        id: 1,
        title: "Windows LMS",
        description: "Developed a Windows-based Flutter application, featuring a custom quiz generation model and integrated plagiarism detection. The system allows teachers to create and manage quizzes, while students can attempt them online with results tracked in real time. Built using Flutter, Dart, SupaBase and Firebase.",
        imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        technologies: ["Flutter", "Dart", "SupaBase", "Firebase"],
        liveUrl: null,
        codeUrl: null,
        featured: 1
      },
      {
        id: 2,
        title: "E-commerce Mobile App",
        description: "Developed a Flutter-based Android application that allows users to upload and sell items such as clothes, jewelry, and more across multiple categories. The app enables product browsing, item listing, and order placement. Includes a fully functional admin panel for managing listings and real-time order tracking.",
        imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        technologies: ["Flutter", "Dart", "Firebase", "Admin Panel"],
        liveUrl: null,
        codeUrl: null,
        featured: 1
      },
      {
        id: 3,
        title: "Skin Cancer Mobile App",
        description: "Developed a Flutter-based Android application that uses a trained AI model to help users detect potential skin cancer by analyzing uploaded images. The app provides preliminary results and allows users to connect with available doctors for consultation via an in-app chat feature.",
        imageUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        technologies: ["Flutter", "AI/ML", "Chat Feature", "Admin Panel"],
        liveUrl: null,
        codeUrl: null,
        featured: 1
      },
      {
        id: 4,
        title: "StegoCrypt Mobile App",
        description: "Developed a Flutter-based steganography app for secure data concealment, featuring a cyberpunk neon-glitch UI. Implemented AES-GCM encryption, PBKDF2 key derivation, and LSB steganography to embed/decrypt messages in images. Included three modes, a dynamic splash screen, and a copyable ciphertext feature.",
        imageUrl: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        technologies: ["Flutter", "Encryption", "Steganography", "Cyberpunk UI"],
        liveUrl: null,
        codeUrl: null,
        featured: 1
      },
      {
        id: 5,
        title: "Blocky Hero Saga",
        description: "Currently developing a 2D arcade-style game using Flutter with the Flame game engine and Tiled for level design. The game is inspired by Snow Bros, featuring player controls, enemy interactions, scoring mechanics, and custom-built levels.",
        imageUrl: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        technologies: ["Flutter", "Flame Engine", "Tiled", "Game Development"],
        liveUrl: null,
        codeUrl: null,
        featured: 0
      }
    ];
    defaultProjects.forEach(project => this.projects.set(project.id, project));
    this.currentProjectId = 6;
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
