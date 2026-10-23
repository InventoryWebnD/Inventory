"use client";

/**
 * Client-side re-export of the lucide icons used inside Server Components.
 *
 * lucide-react calls React.createContext() when its module is evaluated, which
 * Next.js forbids in Server Components ("createContext only works in Client
 * Components"). Importing icons through this "use client" boundary keeps
 * lucide-react out of the server module graph while the icons are still
 * server-rendered to HTML (no SEO impact).
 *
 * Server Components: import icons from "@/components/ui/icons".
 * Client Components: may keep importing from "lucide-react" directly.
 */
export { ArrowRight, ArrowLeft, Compass, Clock, Search } from "lucide-react";
