import { createFileRoute } from "@tanstack/react-router";
import LandingPage from "@/components/truevitals/LandingPage";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TrueVitals | Smarter Healthcare" },
      { name: "description", content: "TrueVitals turns medical data into clear insights, personalized care, and a healthier tomorrow." },
      { property: "og:title", content: "TrueVitals | Smarter Healthcare" },
      { property: "og:description", content: "Smarter care, clear insights, and connected health in one premium experience." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return <LandingPage />;
}
