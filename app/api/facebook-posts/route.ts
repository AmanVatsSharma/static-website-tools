import { NextResponse } from "next/server";

// Mock data for Facebook posts (fallback if API fails)
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
  try {
    const accessToken = process.env.FACEBOOK_ACCESS_TOKEN;
    const pageId = process.env.FACEBOOK_PAGE_ID || '000000000000000'; // Default placeholder page ID
    const limit = 6;
    
    // Check if access token is available
    if (!accessToken) {
      console.log('Facebook access token not found. Using mock data.');
      return NextResponse.json({ posts: MOCK_POSTS });
    }
    
    // Fetch posts from the Facebook Graph API
    const response = await fetch(
      `https://graph.facebook.com/v18.0/${pageId}/posts?fields=id,message,created_time,attachments{media},likes.summary(true),comments.summary(true),shares&limit=${limit}&access_token=${accessToken}`,
      { next: { revalidate: 3600 } } // Cache for 1 hour
    );
    
    if (!response.ok) {
      throw new Error(`Facebook Graph API failed with status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!data.data || !Array.isArray(data.data)) {
      throw new Error('Invalid response format from Facebook API');
    }
    
    // Process and format the Facebook posts
    const posts = data.data.map((post: any) => {
      // Get the image URL if available
      let imageUrl = null;
      try {
        if (post.attachments && 
            post.attachments.data && 
            post.attachments.data[0] && 
            post.attachments.data[0].media && 
            post.attachments.data[0].media.image) {
          imageUrl = post.attachments.data[0].media.image.src;
        }
      } catch (e) {
        console.error('Error extracting image URL:', e);
      }
      
      // Get social metrics with fallbacks to 0
      const likes = post.likes?.summary?.total_count || 0;
      const comments = post.comments?.summary?.total_count || 0;
      const shares = post.shares?.count || 0;
      
      return {
        id: post.id,
        content: post.message || "Visit our page to see this post!",
        imageUrl,
        likes,
        comments,
        shares,
        publishedAt: post.created_time,
      };
    });
    
    return NextResponse.json({ posts });
  } catch (error) {
    console.error('Error fetching Facebook posts:', error);
    // Fallback to mock data in case of any API errors
    return NextResponse.json({ 
      posts: MOCK_POSTS,
      error: 'Failed to fetch real Facebook data. Using mock data instead.'
    });
  }
} 