import { NextResponse } from "next/server";

// Mock data for Facebook posts
const MOCK_POSTS = [
  {
    id: "post1",
    content: "Introducing our latest brush cutter model with enhanced cutting efficiency and reduced vibration. Perfect for tackling overgrown areas with ease! #AWEMachinery #BrushCutter",
    imageUrl: "/social/placeholder-facebook-1.jpg",
    likes: 145,
    comments: 23,
    shares: 12,
    publishedAt: "2024-03-10T14:30:00Z",
  },
  {
    id: "post2",
    content: "Mr. Jitender Walia demonstrating our power tiller at the Agri Expo 2024. Come visit us at Hall 3, Booth 42 to see it in action! #AgriExpo2024 #PowerTillers",
    imageUrl: "/social/placeholder-facebook-2.jpg",
    likes: 210,
    comments: 45,
    shares: 32,
    publishedAt: "2024-03-05T10:15:00Z",
  },
  {
    id: "post3",
    content: "Customer spotlight: Meet Rajesh from Punjab who has increased his productivity by 40% using AWE manual hand seeders. We're proud to support Indian farmers! #CustomerSuccess #AgriTech",
    imageUrl: "/social/placeholder-facebook-3.jpg",
    likes: 178,
    comments: 18,
    shares: 15,
    publishedAt: "2024-02-28T16:45:00Z",
  },
];

export async function GET() {
  // In a real implementation, this would fetch data from the Facebook Graph API
  
  // Example of how this might work with the real Facebook Graph API:
  // const accessToken = process.env.FACEBOOK_ACCESS_TOKEN;
  // const pageId = process.env.FACEBOOK_PAGE_ID;
  // const limit = 3;
  // 
  // const response = await fetch(
  //   `https://graph.facebook.com/v18.0/${pageId}/posts?fields=id,message,created_time,attachments{media},likes.summary(true),comments.summary(true),shares&limit=${limit}&access_token=${accessToken}`
  // );
  // 
  // const data = await response.json();
  // 
  // const posts = data.data.map((post) => ({
  //   id: post.id,
  //   content: post.message || "",
  //   imageUrl: post.attachments?.data[0]?.media?.image?.src || null,
  //   likes: post.likes?.summary?.total_count || 0,
  //   comments: post.comments?.summary?.total_count || 0,
  //   shares: post.shares?.count || 0,
  //   publishedAt: post.created_time,
  // }));
  
  // For now, just return the mock data
  return NextResponse.json({ posts: MOCK_POSTS });
} 