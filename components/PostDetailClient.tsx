'use client'

import ViewCounter from "./ViewCounter"
import ShareButtons from "./ShareButtons"

export default function PostDetailClient({ slug, shareUrl, title }: { slug: string, shareUrl: string, title: string }) {
  if (!slug) return null;
  return (
    <div className="pcm-client-header-container">
      <ViewCounter slug={slug} />
      
      <div className="pcm-premium-share-dashboard">
        <div className="pcm-label-tooltip">
           <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" style={{marginRight:'8px'}}><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
           Bagikan
        </div>
        <ShareButtons shareUrl={shareUrl} postTitle={title} />
      </div>
    </div>
  )
}