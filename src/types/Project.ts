/**
 * Interface representing a project in the portfolio
 */
export interface Project {
  /**
   * Unique identifier for the project
   */
  id: string;
  
  /**
   * Project title
   */
  title: string;
  
  /**
   * Detailed project description
   */
  description: string;
  
  /**
   * Path to the project image
   */
  image: string;
  
  /**
   * Array of technology tags used in the project
   */
  tags?: string[];
  
  /**
   * URL to the project (demo, repository, etc.)
   */
  link: string;
}

