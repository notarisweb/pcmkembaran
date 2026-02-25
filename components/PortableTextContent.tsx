"use client";

import { PortableText } from "@portabletext/react";
import YouTubePlayer from "./YouTubePlayer";
import urlBuilder from "@sanity/image-url";
import { client } from "@/lib/sanity.client";

const builder = urlBuilder(client);
function urlFor(source: any) {
  return builder.image(source);
}

const ptComponents = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref) return null;
      return (
        <div className="content-image-container">
          <img
            src={urlFor(value).fit('max').auto('format').url()}
            alt={value.alt || "Gambar Konten"}
            className="content-image"
          />
          {value.caption && <p className="image-caption">{value.caption}</p>}
        </div>
      );
    },
    youtube: YouTubePlayer, 
  },
  block: {
    normal: ({ children }: any) => <p className="article-p">{children}</p>,
    h2: ({ children }: any) => <h2 className="article-h2">{children}</h2>,
  },
};

export default function PortableTextContent({ value }: { value: any }) {
  return <PortableText value={value} components={ptComponents} />;
}