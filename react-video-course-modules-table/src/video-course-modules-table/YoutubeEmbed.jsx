export function YoutubeEmbed ({ embedId, timestamp, mute }) {
  const queryParams = new URLSearchParams({ autoplay: 1 });

  if (timestamp) {
    queryParams.append('start', timestamp);
  }

  if (mute) {
    queryParams.append('mute', 1);
  }

  return (
    <div className="embed-responsive embed-responsive-16by9">
      <iframe
        title="The Great Mr. Astley"
        width="853"
        height="480"
        src={ `https://www.youtube.com/embed/${embedId}?${queryParams.toString()}` }
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
