import { createFileRoute, redirect } from "@tanstack/react-router";

// Keep the old website's URL working.
export const Route = createFileRoute("/our-gallery")({
  beforeLoad: () => {
    throw redirect({ to: "/gallery", statusCode: 301 });
  },
});
