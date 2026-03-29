"use client";

import { HydrationBoundary, type DehydratedState } from "@tanstack/react-query";
import type { ReactNode } from "react";

interface Props {
  state: DehydratedState;
  children: ReactNode;
}

export default function Hydration({ state, children }: Props) {
  return <HydrationBoundary state={state}>{children}</HydrationBoundary>;
}