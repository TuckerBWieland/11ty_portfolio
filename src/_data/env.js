// Expose the PostHog key to templates at build time
module.exports = {
  POSTHOG_KEY: process.env.POSTHOG_KEY || "",
};
