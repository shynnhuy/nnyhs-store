"use client";

import { FC, PropsWithChildren, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const QueryProvider: FC<PropsWithChildren> = ({ children }) => {
  const [client] = useState(new QueryClient());

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};
