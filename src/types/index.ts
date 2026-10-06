import { ReactNode } from "react";

export interface ApiResponse {
  success: boolean;
  error?: string;
  detail?: string;
}

export interface VideoResponse extends ApiResponse {
  video_url?: string;
  title?: string;
  thumbnail?: string;
  author?: string;
  quality?: string;
  available_qualities?: QualityOption[];
}

export interface QualityOption {
  quality: string;
  url: string;
}

export interface TikTokResponse extends ApiResponse {
  title?: string;
  author?: string;
  video_url?: string;
  images?: string[];
  type?: "video" | "image";
}

export interface TwitterResponse extends VideoResponse {
  available_qualities?: QualityOption[];
}

export type FacebookResponse = VideoResponse;

export type InstagramResponse = VideoResponse;

export type ThreadsResponse = VideoResponse;

export type Platform =
  | "tiktok"
  | "facebook"
  | "instagram"
  | "twitter"
  | "threads";

export interface PlatformInfo {
  id: Platform;
  name: string;
  icon: ReactNode;
  color: string;
  description: string;
  domains: string[];
}
