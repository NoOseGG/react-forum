import { createFileRoute } from "@tanstack/react-router";

import { PostPage } from "../pages/posts-page";

export const Route = createFileRoute("/posts")({
  component: RouteComponent,
});

function RouteComponent() {
  return <PostPage />;
}
