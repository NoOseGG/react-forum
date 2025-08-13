import { createFileRoute } from "@tanstack/react-router";

import { UserAccountPage } from "../pages/user-account-page";

export const Route = createFileRoute("/user-account")({
  component: RouteComponent,
});

function RouteComponent() {
  return <UserAccountPage />;
}
