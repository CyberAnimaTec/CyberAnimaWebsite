import { projects, contacts, type Project, type InsertProject, type Contact, type InsertContact } from "@shared/schema";

export interface IStorage {
  // Projects
  getAllProjects(): Promise<Project[]>;
  getProjectsByCategory(category: string): Promise<Project[]>;
  getFeaturedProjects(): Promise<Project[]>;
  getProject(id: number): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  updateProjectViews(id: number): Promise<void>;
  
  // Contacts
  createContact(contact: InsertContact): Promise<Contact>;
  getAllContacts(): Promise<Contact[]>;
}

export class MemStorage implements IStorage {
  private projects: Map<number, Project>;
  private contacts: Map<number, Contact>;
  private currentProjectId: number;
  private currentContactId: number;

  constructor() {
    this.projects = new Map();
    this.contacts = new Map();
    this.currentProjectId = 1;
    this.currentContactId = 1;
    
    // Seed with sample projects
    this.seedProjects();
  }

  private seedProjects() {
    const sampleProjects: InsertProject[] = [
      {
        title: "Nebula Dreams",
        description: "An interactive digital artwork exploring the beauty of cosmic formations through generative algorithms and particle systems.",
        category: "art",
        type: "Digital Art",
        imageUrl: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        tags: ["Digital Art", "Generative", "Interactive"],
        year: 2024,
        featured: true,
        externalUrl: "/projects/nebula-dreams"
      },
      {
        title: "Asteroid Runner",
        description: "A fast-paced indie game where players navigate through dangerous asteroid fields while collecting cosmic resources.",
        category: "game",
        type: "Indie Game",
        imageUrl: "https://pixabay.com/get/g76f13d8fbb647e07bb5c8acc78d4246e4647d2a5632a87fe7d705dc1aa71678a61f3282f7bb4543814c559c5291266d4a7ac264c6a237e5cac8caf5d7b949daa_1280.jpg",
        tags: ["Unity", "C#", "Action", "Retro"],
        year: 2024,
        featured: true,
        downloadUrl: "/games/asteroid-runner",
        downloads: 5700,
        rating: 4
      },
      {
        title: "Quantum Sculptures",
        description: "A series of 3D rendered sculptures exploring quantum mechanics through abstract geometric forms and cosmic materials.",
        category: "art",
        type: "3D Art",
        imageUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        tags: ["3D", "Blender", "Abstract", "Physics"],
        year: 2024,
        featured: true,
        externalUrl: "/gallery/quantum-sculptures"
      },
      {
        title: "Cosmic Meditation",
        description: "Digital painting exploring inner space through cosmic themes and meditative visuals.",
        category: "art",
        type: "Digital Art",
        imageUrl: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        tags: ["Digital Painting", "Meditation", "Space"],
        year: 2024,
        featured: false
      },
      {
        title: "Station Alpha",
        description: "3D architectural visualization of a futuristic space station with detailed interior design.",
        category: "art",
        type: "3D Render",
        imageUrl: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        tags: ["Architecture", "3D", "Futuristic"],
        year: 2023,
        featured: false
      },
      {
        title: "Energy Flow",
        description: "Interactive particle system demonstrating energy patterns and flow dynamics.",
        category: "interactive",
        type: "Interactive",
        imageUrl: "https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        tags: ["WebGL", "Particles", "Interactive"],
        year: 2024,
        featured: false,
        externalUrl: "/interactive/energy-flow"
      }
    ];

    sampleProjects.forEach(project => {
      this.createProject(project);
    });
  }

  async getAllProjects(): Promise<Project[]> {
    return Array.from(this.projects.values()).sort((a, b) => b.year - a.year);
  }

  async getProjectsByCategory(category: string): Promise<Project[]> {
    return Array.from(this.projects.values())
      .filter(project => project.category === category)
      .sort((a, b) => b.year - a.year);
  }

  async getFeaturedProjects(): Promise<Project[]> {
    return Array.from(this.projects.values())
      .filter(project => project.featured)
      .sort((a, b) => b.year - a.year);
  }

  async getProject(id: number): Promise<Project | undefined> {
    return this.projects.get(id);
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const id = this.currentProjectId++;
    const project: Project = { 
      ...insertProject, 
      id,
      views: 0,
      downloads: insertProject.downloadUrl ? 0 : 0,
      rating: 0
    };
    this.projects.set(id, project);
    return project;
  }

  async updateProjectViews(id: number): Promise<void> {
    const project = this.projects.get(id);
    if (project) {
      project.views += 1;
      this.projects.set(id, project);
    }
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

  async getAllContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values()).sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }
}

export const storage = new MemStorage();
