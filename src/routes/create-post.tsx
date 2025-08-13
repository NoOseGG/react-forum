import { createFileRoute } from "@tanstack/react-router";

import { CreatePostPage } from "../pages/create-post-page/create-post-page";

export const Route = createFileRoute("/create-post")({
  component: RouteComponent,
});

function RouteComponent() {
  return <CreatePostPage />;
}
