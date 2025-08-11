import { Outlet, createRootRoute } from "@tanstack/react-router";

import * as React from "react";

import { RootLayout } from "../widgets/root-layout";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return <RootLayout />;
}
