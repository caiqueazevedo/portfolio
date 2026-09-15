/**
 * Photos (see docs/higgsfield-prompts.md). `null` renders the kit's grey placeholder,
 * so the site ships before every asset exists. Flip an entry to the public path once
 * the file is in `public/media/`. Everything renders black and white with grain.
 */
export const media = {
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
