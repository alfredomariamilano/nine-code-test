function send(req, res) {
  const shows = req.body.payload || null;
  let filteredShows;

  if (shows && shows.length > 0) {
    // filters the shows with drm and at least 1 episode
    filteredShows = shows.filter(show => {
      return show.drm && show.episodeCount > 0;
    })
      // returns a new array with only the specified values
      .map(show => {
        return {
          image: show.image.showImage,
          slug: show.slug,
          title: show.title
        };
      });
    // Checks if there are any matching results
    if (filteredShows.length <= 0) {
      return res.status(404).json({error: 'Could not find any matching results.'});
    }
    return res.status(200).json({response: filteredShows});
  }
  return res.status(400).json({
    error: 'Could not decode request: JSON parsing failed'
  });
}

module.exports = {
  send
};
