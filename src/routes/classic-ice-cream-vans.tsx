import { createFileRoute, redirect } from "@tanstack/react-router";

// Keep the old website's URL working.
export const Route = createFileRoute("/classic-ice-cream-vans")({
  beforeLoad: () => {
    throw redirect({ to: "/our-ice-cream-vans", statusCode: 301 });
  },
});
