import { NextResponse } from "next/server";

// Mock data for YouTube videos (fallback if API fails)
const MOCK_VIDEOS = [
  {
    id: "video1",
    title: "AWE Premium Brush Cutter in Action: Field Demonstration",
    description: "Watch our premium brush cutter tackle tough vegetation with ease. See how our product outperforms the competition in real field tests.",
    thumbnailUrl: "/social/placeholder-video-1.jpg",
    publishedAt: "2023-12-15T10:30:00Z",
    viewCount: "1.2K"
  },
  {
    id: "video2",
    title: "How to Choose the Right Chainsaw for Your Farm: AWE Guide",
    description: "Mr. Jitender Walia explains how to select the perfect chainsaw for your specific farming needs, with detailed comparisons and demonstrations.",
    thumbnailUrl: "/social/placeholder-video-2.jpg",
    publishedAt: "2024-01-20T14:45:00Z",
    viewCount: "856"
  },
  {
    id: "video3",
    title: "AWE Power Tiller: Transforming Small Farm Productivity",
    description: "See how our power tillers are helping small farmers across India increase their productivity and reduce manual labor.",
    thumbnailUrl: "/social/placeholder-video-3.jpg",
    publishedAt: "2024-02-10T09:15:00Z",
    viewCount: "2.5K"
  },
];

export async function GET() {
  try {
    const apiKey = process.env.YOUTUBE_API_KEY;
    const channelId = process.env.YOUTUBE_CHANNEL_ID || 'UCXXXXXXXXXXXXXXXXXX'; // Default placeholder channel ID
    const maxResults = 6;
    
    // Check if API key is available
    if (!apiKey) {
      console.log('YouTube API key not found. Using mock data.');
      return NextResponse.json({ videos: MOCK_VIDEOS });
    }
    
    // First, fetch the most recent videos from the channel
    const searchResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet&order=date&maxResults=${maxResults}&type=video`,
      { next: { revalidate: 3600 } } // Cache for 1 hour
    );
    
    if (!searchResponse.ok) {
      throw new Error(`YouTube search API failed with status: ${searchResponse.status}`);
    }
    
    const searchData = await searchResponse.json();
    
    // Extract video IDs for the statistics request
    const videoIds = searchData.items.map((item: any) => item.id.videoId).join(',');
    
    // Fetch video statistics (view counts, likes, etc.)
    const statsResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?key=${apiKey}&id=${videoIds}&part=statistics`,
      { next: { revalidate: 3600 } }
    );
    
    if (!statsResponse.ok) {
      throw new Error(`YouTube statistics API failed with status: ${statsResponse.status}`);
    }
    
    const statsData = await statsResponse.json();
    
    // Create a map of video ID to statistics for easy lookup
    const statsMap = new Map();
    statsData.items.forEach((item: any) => {
      statsMap.set(item.id, item.statistics);
    });
    
    // Format view count
    const formatViewCount = (count: number): string => {
      if (count >= 1000000) {
        return `${(count / 1000000).toFixed(1)}M`;
      } else if (count >= 1000) {
        return `${(count / 1000).toFixed(1)}K`;
      }
      return count.toString();
    };
    
    // Combine the data
    const videos = searchData.items.map((item: any) => {
      const stats = statsMap.get(item.id.videoId) || {};
      const viewCount = stats.viewCount ? formatViewCount(parseInt(stats.viewCount, 10)) : "0";
      
      return {
        id: item.id.videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnailUrl: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.default?.url,
        publishedAt: item.snippet.publishedAt,
        viewCount,
      };
    });
    
    return NextResponse.json({ videos });
  } catch (error) {
    console.error('Error fetching YouTube videos:', error);
    // Fallback to mock data in case of any API errors
    return NextResponse.json({ 
      videos: MOCK_VIDEOS,
      error: 'Failed to fetch real YouTube data. Using mock data instead.'
    });
  }
} 