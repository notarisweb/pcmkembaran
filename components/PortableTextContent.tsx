"use client";

import { PortableText } from "@portabletext/react";
import YouTubePlayer from "./YouTubePlayer";
import urlBuilder from "@sanity/image-url";
import { client } from "@/lib/sanity.client";

const builder = urlBuilder(client);
const urlFor = (source: any) => builder.image(source);

const ptComponents = {
  types: {
    image: ({ value }: any) => (
      <div style={{ margin: '2.5rem 0', textAlign: 'center' }}>
        <img src={urlFor(value).url()} alt="Gambar Artikel" style={{ borderRadius: '12px', maxWidth: '100%', height: 'auto' }} />
        {value.caption && <p style={{ fontSize: '14px', color: '#666', marginTop: '10px', fontStyle: 'italic' }}>{value.caption}</p>}
      </div>
    ),
    youtube: YouTubePlayer,
  },
  block: {
    normal: ({ children }: any) => <p style={{ marginBottom: '1.5rem', lineHeight: '1.8', fontSize: '18px', color: '#333' }}>{children}</p>,
    h2: ({ children }: any) => <h2 style={{ marginTop: '2rem', marginBottom: '1rem', color: '#004a8e', fontSize: '24px', fontWeight: 'bold' }}>{children}</h2>,
  },
};

export default function PortableTextContent({ value }: { value: any }) {
  return <PortableText value={value} components={ptComponents} />;
}