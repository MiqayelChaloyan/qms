# QMS Pad laboratory film assets

Four all-intra H.264 push-in films rendered from Unsplash laboratory stills
(hero: lab aisle, emerge: pipetting, cabin: lab team, window: microscope),
plus posters and inline photos (chip-*.jpg, lab-scientist.jpg).

Encode with every frame a keyframe so scroll scrubbing stays smooth:

```bash
ffmpeg -i in.mp4 -an -c:v libx264 -preset slow -crf 26 \
  -g 1 -pix_fmt yuv420p -movflags +faststart out.mp4
```
