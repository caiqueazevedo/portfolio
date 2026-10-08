const slugs = ["zenid", "aetherion", "pulse", "polaris", "watchtower", "claude-usage-hub"];

const covers: Record<string, string | null> = {};
for (const slug of slugs) {
  covers[slug] = `/media/covers/${slug}.png`;
  covers[`${slug}-wide`] = `/media/covers/${slug}-wide.png`;
}

export const media = {
  portrait: null as string | null,
  covers,
};
