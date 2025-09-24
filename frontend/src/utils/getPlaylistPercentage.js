export function getPlaylistPercentage(playlist) {
    const totalDurationSeconds = playlist.videos.reduce((acc, video) => acc + video.durationSeconds, 0);
    const watchedTimeSeconds = playlist.videos.reduce((acc, video) => acc + video.watchedTimeSeconds, 0);
    return Math.round((watchedTimeSeconds / totalDurationSeconds) * 100);
}