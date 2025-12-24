/**
 * API Client for Fotopainter
 * 
 * This is a mock API client for frontend development.
 * When the backend is ready, replace mock functions with real API calls.
 */

// API_BASE_URL will be used when connecting to real backend
// const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

// Types
export interface Artwork {
  id: string;
  user_id?: string;
  original_image_url: string;
  processed_image_url?: string;
  palettes?: Palette[];
  selected_palette_id?: number;
  medium_suggestion?: {
    type: string;
    reason: string;
  };
  status: 'pending' | 'processing' | 'completed' | 'failed';
  created_at: string;
}

export interface Palette {
  id: number;
  name: string;
  colors: Array<{
    hex: string;
    name: string;
  }>;
  color_count: number;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface Order {
  id: string;
  user_id?: string;
  artwork_id: string;
  product_type: 'digital' | 'physical';
  palette_id: number;
  amount: number;
  currency: string;
  status: 'pending' | 'paid' | 'fulfilled' | 'shipped' | 'cancelled';
  download_url?: string;
  tracking_number?: string;
  created_at: string;
}

// Mock Data
const mockPalettes: Palette[] = [
  {
    id: 1,
    name: 'Vibrant',
    colors: [
      { hex: '#FF5733', name: 'Coral Red' },
      { hex: '#33FF57', name: 'Lime Green' },
      { hex: '#3357FF', name: 'Royal Blue' },
      { hex: '#FF33F5', name: 'Magenta' },
      { hex: '#F5FF33', name: 'Yellow' },
    ],
    color_count: 12,
    difficulty: 'medium',
  },
  {
    id: 2,
    name: 'Balanced',
    colors: [
      { hex: '#8B4513', name: 'Saddle Brown' },
      { hex: '#4682B4', name: 'Steel Blue' },
      { hex: '#32CD32', name: 'Lime Green' },
      { hex: '#FF6347', name: 'Tomato' },
    ],
    color_count: 8,
    difficulty: 'easy',
  },
  {
    id: 3,
    name: 'Simple',
    colors: [
      { hex: '#2F4F4F', name: 'Dark Slate Gray' },
      { hex: '#FFD700', name: 'Gold' },
      { hex: '#DC143C', name: 'Crimson' },
    ],
    color_count: 5,
    difficulty: 'easy',
  },
];

// API Functions (Mock implementations)
export const api = {
  // Upload image
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async uploadImage(_file: File): Promise<{ artwork_id: string }> {
    // Simulate upload delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      artwork_id: `artwork_${Date.now()}`,
    };
  },

  // Process image
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async processImage(_artworkId: string): Promise<{ job_id: string }> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      job_id: `job_${Date.now()}`,
    };
  },

  // Get processing status
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getProcessingStatus(_jobId: string): Promise<{
    status: 'pending' | 'processing' | 'completed' | 'failed';
    progress?: number;
  }> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Simulate progress
    const progress = Math.min(100, Math.random() * 100);
    
    return {
      status: progress < 100 ? 'processing' : 'completed',
      progress: Math.floor(progress),
    };
  },

  // Get artwork
  async getArtwork(artworkId: string): Promise<Artwork> {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return {
      id: artworkId,
      original_image_url: '/placeholder-image.jpg',
      processed_image_url: '/placeholder-processed.jpg',
      palettes: mockPalettes,
      selected_palette_id: 1,
      medium_suggestion: {
        type: 'acrylic',
        reason: 'Bright colors work well with acrylic paints',
      },
      status: 'completed',
      created_at: new Date().toISOString(),
    };
  },

  // Create order
  async createOrder(data: {
    artwork_id: string;
    product_type: 'digital' | 'physical';
    palette_id: number;
  }): Promise<Order> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      id: `order_${Date.now()}`,
      artwork_id: data.artwork_id,
      product_type: data.product_type,
      palette_id: data.palette_id,
      amount: data.product_type === 'digital' ? 19.99 : 49.99,
      currency: 'USD',
      status: 'pending',
      created_at: new Date().toISOString(),
    };
  },

  // Submit contact form
  async submitContact(data: {
    name: string;
    email: string;
    message: string;
  }): Promise<{ success: boolean }> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    console.log('Contact form submitted:', data);
    
    return { success: true };
  },
};

