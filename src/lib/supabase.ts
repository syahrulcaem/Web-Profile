import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    "Supabase credentials not found. Please check your .env.local file.",
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database Types
export interface HeroContent {
  id: string;
  name: string;
  title: string;
  description: string;
  cv_link: string | null;
  email: string;
  linkedin_url: string | null;
  github_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface AboutContent {
  id: string;
  subtitle: string;
  bio_paragraph_1: string;
  bio_paragraph_2: string | null;
  bio_paragraph_3: string | null;
  image_url: string | null;
  expertise: string[];
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image_url: string | null;
  link: string | null;
  tags: string[];
  order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  order: number;
  created_at: string;
  updated_at: string;
}

export interface Skill {
  id: string;
  category_id: string;
  name: string;
  icon_name: string;
  color: string;
  order: number;
  created_at: string;
  updated_at: string;
}

// Helper Functions

/**
 * Get hero content (should only return 1 row)
 */
export async function getHeroContent(): Promise<HeroContent | null> {
  const { data, error } = await supabase
    .from("hero_content")
    .select("*")
    .single();

  if (error) {
    console.error("Error fetching hero content:", error);
    return null;
  }

  return data;
}

/**
 * Update hero content
 */
export async function updateHeroContent(
  id: string,
  updates: Partial<HeroContent>,
) {
  const { data, error } = await supabase
    .from("hero_content")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating hero content:", error);
    throw error;
  }

  return data;
}

/**
 * Get about content (should only return 1 row)
 */
export async function getAboutContent(): Promise<AboutContent | null> {
  const { data, error } = await supabase
    .from("about_content")
    .select("*")
    .single();

  if (error) {
    console.error("Error fetching about content:", error);
    return null;
  }

  return data;
}

/**
 * Update about content
 */
export async function updateAboutContent(
  id: string,
  updates: Partial<AboutContent>,
) {
  const { data, error } = await supabase
    .from("about_content")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating about content:", error);
    throw error;
  }

  return data;
}

/**
 * Get all active projects
 */
export async function getProjects(includeInactive = false): Promise<Project[]> {
  let query = supabase
    .from("projects")
    .select("*")
    .order("order", { ascending: true });

  if (!includeInactive) {
    query = query.eq("is_active", true);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching projects:", error);
    return [];
  }

  return data || [];
}

/**
 * Create a new project
 */
export async function createProject(
  project: Omit<Project, "id" | "created_at" | "updated_at">,
) {
  const { data, error } = await supabase
    .from("projects")
    .insert([project])
    .select()
    .single();

  if (error) {
    console.error("Error creating project:", error);
    throw error;
  }

  return data;
}

/**
 * Update a project
 */
export async function updateProject(id: string, updates: Partial<Project>) {
  const { data, error } = await supabase
    .from("projects")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating project:", error);
    throw error;
  }

  return data;
}

/**
 * Delete a project
 */
export async function deleteProject(id: string) {
  const { error } = await supabase.from("projects").delete().eq("id", id);

  if (error) {
    console.error("Error deleting project:", error);
    throw error;
  }
}

/**
 * Get all skill categories with their skills
 */
export async function getSkillCategories(): Promise<
  (SkillCategory & { skills: Skill[] })[]
> {
  const { data: categories, error: categoriesError } = await supabase
    .from("skill_categories")
    .select("*")
    .order("order", { ascending: true });

  if (categoriesError) {
    console.error("Error fetching skill categories:", categoriesError);
    return [];
  }

  const { data: skills, error: skillsError } = await supabase
    .from("skills")
    .select("*")
    .order("order", { ascending: true });

  if (skillsError) {
    console.error("Error fetching skills:", skillsError);
    return [];
  }

  // Group skills by category
  const categoriesWithSkills =
    categories?.map((category) => ({
      ...category,
      skills:
        skills?.filter((skill) => skill.category_id === category.id) || [],
    })) || [];

  return categoriesWithSkills;
}

/**
 * Create a new skill category
 */
export async function createSkillCategory(
  category: Omit<SkillCategory, "id" | "created_at" | "updated_at">,
) {
  const { data, error } = await supabase
    .from("skill_categories")
    .insert([category])
    .select()
    .single();

  if (error) {
    console.error("Error creating skill category:", error);
    throw error;
  }

  return data;
}

/**
 * Create a new skill
 */
export async function createSkill(
  skill: Omit<Skill, "id" | "created_at" | "updated_at">,
) {
  const { data, error } = await supabase
    .from("skills")
    .insert([skill])
    .select()
    .single();

  if (error) {
    console.error("Error creating skill:", error);
    throw error;
  }

  return data;
}

/**
 * Update a skill
 */
export async function updateSkill(id: string, updates: Partial<Skill>) {
  const { data, error } = await supabase
    .from("skills")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating skill:", error);
    throw error;
  }

  return data;
}

/**
 * Delete a skill
 */
export async function deleteSkill(id: string) {
  const { error } = await supabase.from("skills").delete().eq("id", id);

  if (error) {
    console.error("Error deleting skill:", error);
    throw error;
  }
}

/**
 * Upload an image to Supabase Storage
 */
export async function uploadImage(bucket: string, path: string, file: File) {
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, file, {
      cacheControl: "3600",
      upsert: true,
    });

  if (error) {
    console.error("Error uploading image:", error);
    throw error;
  }

  // Get public URL
  const {
    data: { publicUrl },
  } = supabase.storage.from(bucket).getPublicUrl(path);

  return publicUrl;
}

/**
 * Delete an image from Supabase Storage
 */
export async function deleteImage(bucket: string, path: string) {
  const { error } = await supabase.storage.from(bucket).remove([path]);

  if (error) {
    console.error("Error deleting image:", error);
    throw error;
  }
}

// Authentication helpers
export const auth = {
  signIn: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return data;
  },

  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  getSession: async () => {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();
    if (error) throw error;
    return session;
  },

  getUser: async () => {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();
    if (error) throw error;
    return user;
  },
};
