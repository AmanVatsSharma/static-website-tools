import { NextResponse } from "next/server";

// Mock data for YouTube videos
const MOCK_VIDEOS = [
  {
    id: "video1",
    title: "AWE Premium Brush Cutter in Action: Field Demonstration",
    description: "Watch our premium brush cutter tackle tough vegetation with ease. See how our product outperforms the competition in real field tests.",
    thumbnailUrl: "/social/placeholder-video-1.jpg",
    publishedAt: "2023-12-15T10:30:00Z",
  },
  {
    id: "video2",
    title: "How to Choose the Right Chainsaw for Your Farm: AWE Guide",
    description: "Mr. Jitender Walia explains how to select the perfect chainsaw for your specific farming needs, with detailed comparisons and demonstrations.",
    thumbnailUrl: "/social/placeholder-video-2.jpg",
    publishedAt: "2024-01-20T14:45:00Z",
  },
  {
    id: "video3",
    title: "AWE Power Tiller: Transforming Small Farm Productivity",
    description: "See how our power tillers are helping small farmers across India increase their productivity and reduce manual labor.",
    thumbnailUrl: "/social/placeholder-video-3.jpg",
    publishedAt: "2024-02-10T09:15:00Z",
  },
  {
    id: "video4",
    title: "Customer Testimonial: AWE Manual Hand Seeder Success Story",
    description: "Hear from real farmers who have transformed their planting process using AWE's manual hand seeders, saving time and improving crop yield.",
    thumbnailUrl: "/social/placeholder-video-4.jpg",
    publishedAt: "2024-03-05T11:20:00Z",
  },
];

export async function GET() {
  // In a real implementation, this would fetch data from the YouTube API
  // using the YouTube Data API v3
  
  // Example of how this might work with the real YouTube API:
  // const apiKey = process.env.YOUTUBE_API_KEY;
  // const channelId = process.env.YOUTUBE_CHANNEL_ID;
  // const maxResults = 4;
  // 
  // const response = await fetch(
  //   `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=${maxResults}`
  // );
  // 
  // const data = await response.json();
  // 
  // const videos = data.items.map((item) => ({
  //   id: item.id.videoId,
  //   title: item.snippet.title,
  //   description: item.snippet.description,
  //   thumbnailUrl: item.snippet.thumbnails.high.url,
  //   publishedAt: item.snippet.publishedAt,
  // }));
  
  // For now, just return the mock data
  return NextResponse.json({ videos: MOCK_VIDEOS });
} 