"use client";

import { useEffect } from "react";
import { addRecentConcept } from "@/lib/recent";

interface RecentTrackerProps {
  id: string;
  tech: string;
  slug: string;
  title: string;
}

export default function RecentTracker({
  id,
  tech,
  slug,
  title,
}: RecentTrackerProps) {
  useEffect(() => {
    addRecentConcept({ id, tech, slug, title });
  }, [id, tech, slug, title]);

  return null;
}
