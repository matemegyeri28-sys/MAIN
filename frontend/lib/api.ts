import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export const api = axios.create({
  baseURL: API_BASE_URL
});

export function setAccessToken(token: string | null) {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common.Authorization;
  }
}

export async function fetcher<T>(url: string): Promise<T> {
  const response = await api.get<T>(url);
  return response.data;
}

export interface UserProfile {
  id: number;
  email: string;
  full_name: string;
  company?: string | null;
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

export interface ConnectedAccount {
  id: number;
  platform: string;
  account_handle: string;
  active: boolean;
  profile_metadata: Record<string, unknown>;
}

export interface SubscriptionPlan {
  id: number;
  name: string;
  price_monthly: number;
  price_yearly: number;
  description: string;
  features: string[];
}

export interface Subscription {
  id: number;
  status: 'active' | 'canceled' | 'trialing' | 'past_due';
  started_at: string;
  ends_at?: string | null;
  auto_renew: boolean;
  plan: SubscriptionPlan;
}

export interface TokenResponse {
  access_token: string;
  token_type: string;
  user: UserProfile;
}

export async function login(email: string, password: string) {
  const payload = new URLSearchParams({ username: email, password });
  const response = await api.post<TokenResponse>('/auth/login', payload, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  });
  return response.data;
}

export async function registerUser(data: { email: string; full_name: string; password: string; company?: string }) {
  const response = await api.post<UserProfile>('/auth/register', data);
  return response.data;
}
