export default function YouTubePlayer({ value }: any) {
  const { url } = value;
  if (!url) return null;

  // Logika Ekstraksi ID Video yang lebih kuat (Mendukung shorts, mobile, dan desktop)
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  const id = (match && match[2].length === 11) ? match[2] : null;

  if (!id) return null;

  const embedUrl = `https://www.youtube.com/embed/${id}`;

  return (
    <div className="youtube-player-container">
      <div className="video-wrapper shadow-2xl">
        <iframe
          src={embedUrl}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="video-iframe"
        ></iframe>
      </div>
      {/* Label disesuaikan untuk PCM Kembaran */}
      <p className="video-caption">
        VIDEO DOKUMENTASI PCM KEMBARAN
      </p>

      <style jsx>{`
        .youtube-player-container { margin: 40px 0; }
        .video-wrapper {
          position: relative;
          padding-bottom: 56.25%; /* Rasio 16:9 */
          height: 0;
          overflow: hidden;
          border-radius: 24px; /* rounded-3xl */
          border: 4px solid white;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          background: #000;
        }
        .video-iframe {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border: 0;
        }
        .video-caption {
          text-align: center;
          font-size: 10px;
          color: #94a3b8;
          margin-top: 12px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
}