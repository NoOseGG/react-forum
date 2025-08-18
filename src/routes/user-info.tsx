import { createFileRoute } from "@tanstack/react-router";

import { UserInfoPage } from "../pages/user-info-page";

export const Route = createFileRoute("/user-info")({
  component: RouteComponent,
});

function RouteComponent() {
  return <UserInfoPage />;
}
