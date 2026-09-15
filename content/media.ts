/**
 * Generated assets (see docs/higgsfield-prompts.md). `null` renders the built-in
 * placeholder, so the site ships before every asset exists. Flip an entry to the
 * public path once the file is in `public/media/`.
 */
export type HeroVideo = { webm: string; mp4: string; poster: string };

export const media = {
  heroVideo: null as HeroVideo | null,
  portrait: null as string | null,
  covers: {
    zenid: null,
    "zenid-wide": null,
    aetherion: null,
    pulse: null,
    polaris: null,
    watchtower: null,
    "claude-usage-hub": null,
  } as Record<string, string | null>,
};
