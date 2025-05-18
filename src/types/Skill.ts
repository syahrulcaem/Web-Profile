import type { IconType } from 'react-icons';

/**
 * Interface representing a skill in the portfolio
 */
export interface Skill {
  /**
   * Unique identifier for the skill
   */
  id: string;
  
  /**
   * Display name of the skill
   */
  name: string;
  
  /**
   * Icon component from react-icons library
   */
  icon: IconType;
  
  /**
   * Optional category the skill belongs to
   */
  category?: string;
  
  /**
   * Optional color for the skill icon (hex code)
   */
  color?: string;
}

/**
 * Interface representing a category of skills
 */
export interface SkillCategory {
  /**
   * Unique identifier for the category
   */
  id: string;
  
  /**
   * Display title of the category
   */
  title: string;
  
  /**
   * Array of skills in this category
   */
  skills: Skill[];
}

