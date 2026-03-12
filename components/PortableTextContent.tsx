"use client";

import { PortableText } from "@portabletext/react";
import YouTubePlayer from "./YouTubePlayer";
import urlBuilder from "@sanity/image-url";
import { client } from "@/lib/sanity.client";
import Image from "next/image"; // Optimasi Gambar

const builder = urlBuilder(client);
const urlFor = (source: any) => builder.image(source);

const ptComponents = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref) return null;

      return (
        <figure className="my-10 text-center">
          <div className="relative w-full overflow-hidden rounded-2xl shadow-md" style={{ aspectRatio: '16/9' }}>
            <Image
              // Mengambil URL gambar dengan lebar maksimal 800px agar efisien
              src={urlFor(value).width(800).url()}
              alt={value.alt || "Gambar Artikel PCM Kembaran"}
              fill
              sizes="(max-width: 768px) 100vw, 800px"
              className="object-cover transition-transform duration-500 hover:scale-105"
              loading="lazy"
            />
          </div>
          {value.caption && (
            <figcaption className="mt-4 text-sm text-slate-500 italic font-medium">
              — {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
    youtube: ({ value }: any) => (
      <div className="my-10 rounded-2xl overflow-hidden shadow-lg">
        <YouTubePlayer value={value} />
      </div>
    ),
  },
  block: {
    normal: ({ children }: any) => (
      <p className="article-p">{children}</p>
    ),
    h2: ({ children }: any) => (
      <h2 className="article-h2">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="article-h3">{children}</h3>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="article-quote">{children}</blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => <ul className="article-list-bullet">{children}</ul>,
    number: ({ children }: any) => <ol className="article-list-number">{children}</ol>,
  },
};

export default function PortableTextContent({ value }: { value: any }) {
  return (
    <>
      <div className="portable-text-wrapper">
        <PortableText value={value} components={ptComponents} />
      </div>

      <style jsx>{`
        .portable-text-wrapper {
          font-family: var(--font-plus-jakarta), sans-serif;
        }
        .article-p {
          margin-bottom: 1.8rem;
          line-height: 1.85;
          font-size: 18px;
          color: #334155;
        }
        .article-h2 {
          margin-top: 3rem;
          margin-bottom: 1.2rem;
          color: #004a8e;
          font-size: 28px;
          font-weight: 800;
          letter-spacing: -0.02em;
        }
        .article-h3 {
          margin-top: 2.5rem;
          margin-bottom: 1rem;
          color: #1e293b;
          font-size: 22px;
          font-weight: 700;
        }
        .article-quote {
          border-left: 5px solid #ffc107;
          padding: 10px 25px;
          margin: 2.5rem 0;
          font-style: italic;
          background: #f8fafc;
          border-radius: 0 15px 15px 0;
          color: #475569;
          font-size: 19px;
        }
        .article-list-bullet {
          margin-bottom: 1.8rem;
          padding-left: 1.5rem;
          list-style-type: disc;
          color: #334155;
        }
        .article-list-bullet li {
          margin-bottom: 0.5rem;
        }
        @media (max-width: 640px) {
          .article-p { font-size: 17px; line-height: 1.75; }
          .article-h2 { font-size: 24px; }
        }
      `}</style>
    </>
  );
}