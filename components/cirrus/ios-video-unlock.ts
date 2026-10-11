/**
 * iOS will not paint seeks on a video that has never played. play() then pause()
 * on mount, retry on the first touch, and re-arm after every load() — otherwise
 * the first chapter works and every later one silently freezes.
 */
export function armIosVideoUnlock(video: HTMLVideoElement) {
  let unlocked = false;

  const unlock = () => {
    const attempt = video.play();
    if (!attempt) return;
    attempt
      .then(() => {
        video.pause();
        unlocked = true;
      })
      .catch(() => {
        unlocked = false;
      });
  };

  const onFirstTouch = () => {
    if (!unlocked) unlock();
  };

  const onLoadStart = () => {
    unlocked = false;
    unlock();
  };

  unlock();
  document.addEventListener("touchstart", onFirstTouch, { passive: true });
  video.addEventListener("loadstart", onLoadStart);

  return () => {
    document.removeEventListener("touchstart", onFirstTouch);
    video.removeEventListener("loadstart", onLoadStart);
  };
}
