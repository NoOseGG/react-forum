import { createFileRoute } from "@tanstack/react-router";

import { FavouritePostsPage } from "../pages/favourite-page/favourite-posts-page";

export const Route = createFileRoute("/favourite")({
  component: RouteComponent,
});

function RouteComponent() {
  return <FavouritePostsPage />;
}
