import { parseStringPromise } from 'xml2js';

export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  publishedAt: string;
  viewCount?: string;
}

/**
 * Fetch YouTube videos from a channel using RSS feed (no API key required)
 * @param channelId The YouTube channel ID (e.g., "UCxxxxxxxxxx")
 * @param maxResults Maximum number of results to return
 * @returns Array of YouTube videos
 */
export async function fetchYouTubeVideosViaRSS(
  channelId: string = 'UCLIvjydRJoiDSSwe_3DfKbQ',
  maxResults: number = 6
): Promise<YouTubeVideo[]> {
  try {
    if (!channelId) {
      throw new Error("YouTube channel ID is required");
    }

    // YouTube RSS feed URL format
    const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
    
    // Fetch the RSS feed
    const response = await fetch(rssUrl, { next: { revalidate: 3600 } }); // Cache for 1 hour
    
    if (!response.ok) {
      throw new Error(`Failed to fetch YouTube RSS feed: ${response.status}`);
    }
    
    const xmlData = await response.text();
    
    // Parse the XML data
    const result = await parseStringPromise(xmlData, { explicitArray: false });
    
    if (!result.feed || !result.feed.entry) {
      return [];
    }
    
    // Normalize entries to always be an array
    const entries = Array.isArray(result.feed.entry) 
      ? result.feed.entry 
      : [result.feed.entry];
    
    // Map the entries to our video format
    const videos = entries
      .slice(0, maxResults)
      .map((entry: any) => {
        // Extract video ID from the "yt:videoId" field
        const videoId = entry['yt:videoId'];
        
        // Get the highest quality thumbnail
        const thumbnailUrl = `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;
        
        // Format the video object
        return {
          id: videoId,
          title: entry.title,
          description: entry.content ? entry.content._ : entry.summary || "",
          thumbnailUrl,
          publishedAt: entry.published,
          // We can't get view counts from RSS, so we'll leave this undefined
          viewCount: undefined
        };
      });
    
    return videos;
  } catch (error) {
    console.error('Error fetching YouTube videos via RSS:', error);
    return [];
  }
}

/**
 * Extract channel ID from a YouTube channel URL
 * @param channelUrl The YouTube channel URL (e.g., "https://www.youtube.com/@ChannelName" or "https://www.youtube.com/channel/UCxxxxxxxxxx")
 * @returns The channel ID if found, otherwise null
 */
export async function getChannelIdFromUrl(channelUrl: string): Promise<string | null> {
  try {
    if (!channelUrl) return null;
    
    // If the URL already contains a channel ID in the format /channel/UCxxxx, extract it
    if (channelUrl.includes('/channel/')) {
      const match = channelUrl.match(/\/channel\/(UC[\w-]+)/);
      return match ? match[1] : null;
    }
    
    // If the URL is in the format /@username, we need to fetch the channel page to get the ID
    if (channelUrl.includes('/@')) {
      const response = await fetch(channelUrl);
      if (!response.ok) return null;
      
      const html = await response.text();
      
      // Look for channel ID in the HTML
      const match = html.match(/"channelId":"(UC[\w-]+)"/);
      return match ? match[1] : null;
    }
    
    return null;
  } catch (error) {
    console.error('Error extracting channel ID:', error);
    return null;
  }
} 