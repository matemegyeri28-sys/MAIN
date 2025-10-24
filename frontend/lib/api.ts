import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export const api = axios.create({
  baseURL: API_BASE_URL
});

export async function fetcher<T>(url: string): Promise<T> {
  const response = await api.get<T>(url);
  return response.data;
}

export interface ContentSource {
  id: number;
  url: string;
  title?: string;
  description?: string;
  extracted_text?: string;
  extracted_images: string[];
  meta: Record<string, unknown>;
}

export interface CreativeAsset {
  id: number;
  type: 'text' | 'image' | 'video';
  headline: string;
  body: string;
  call_to_action?: string;
  context: Record<string, unknown>;
  source: ContentSource;
}

export interface DashboardSummary {
  total_sources: number;
  total_creatives: number;
  pending_posts: number;
  posted_this_month: number;
}
