import { createFileRoute } from "@tanstack/react-router";

import { PostInfoPage } from "../pages/post-info-page";

export const Route = createFileRoute("/post-info")({
  component: RouteComponent,
});

function RouteComponent() {
  return <PostInfoPage />;
}
