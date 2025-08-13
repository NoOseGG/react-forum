import { createFileRoute } from "@tanstack/react-router";

import { UsersPage } from "../pages/users-page/users-page";

export const Route = createFileRoute("/users")({
  component: RouteComponent,
});

function RouteComponent() {
  return <UsersPage />;
}
