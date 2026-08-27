import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q') || 'phonk';

  try {
    // 1. Fetch live YouTube search autocomplete directly from YouTube Suggest Server
    const ytSuggestUrl = `https://suggestqueries.google.com/complete/search?client=youtube&ds=yt&q=${encodeURIComponent(
      query
    )}`;

    const suggestRes = await fetch(ytSuggestUrl, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
      },
      next: { revalidate: 300 }, // Cache 5 mins
    });

    let liveSuggestions: string[] = [];
    if (suggestRes.ok) {
      const text = await suggestRes.text();
      // Format is window.google.ac.h(["query",[["result1",0],["result2",0],...]])
      const jsonMatch = text.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        if (Array.isArray(parsed[1])) {
          liveSuggestions = parsed[1].map((item: any) => (Array.isArray(item) ? item[0] : item)).filter(Boolean);
        }
      }
    }

    // 2. Fetch live YouTube Search RSS / Feed for recent trending uploads in Phonk niche
    const ytRssUrl = `https://www.youtube.com/feeds/videos.xml?search_query=${encodeURIComponent(
      query + ' shorts'
    )}`;

    let liveRecentTitles: { title: string; link: string; author: string }[] = [];
    try {
      const rssRes = await fetch(ytRssUrl, {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        },
        next: { revalidate: 600 },
      });

      if (rssRes.ok) {
        const xml = await rssRes.text();
        const entries = xml.match(/<entry>[\s\S]*?<\/entry>/g) || [];
        liveRecentTitles = entries.slice(0, 8).map((entry) => {
          const title = entry.match(/<title>([\s\S]*?)<\/title>/)?.[1] || '';
          const link = entry.match(/<link rel="alternate" href="([\s\S]*?)"\/>/)?.[1] || '';
          const author = entry.match(/<name>([\s\S]*?)<\/name>/)?.[1] || '';
          return {
            title: title.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#39;/g, "'").replace(/&quot;/g, '"'),
            link,
            author,
          };
        });
      }
    } catch (e) {
      console.warn('YouTube RSS fetch error:', e);
    }

    return NextResponse.json({
      success: true,
      source: 'live_youtube_server',
      timestamp: Date.now(),
      query,
      liveSuggestions,
      liveRecentTitles,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        source: 'fallback',
        error: error.message,
        liveSuggestions: [
          `${query} 2026`,
          `${query} edit`,
          `${query} slowed reverb`,
          `${query} bass boosted`,
          `${query} shorts`,
        ],
        liveRecentTitles: [],
      },
      { status: 200 }
    );
  }
}
