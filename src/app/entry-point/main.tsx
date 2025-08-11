import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "@tanstack/react-router";

import { createRoot } from "react-dom/client";

import { queryClient } from "../../shared/client/query-client.ts";
import { router } from "../../shared/client/router.ts";
import "../styles/index.css";
import "../styles/reset.css";

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>,
);
