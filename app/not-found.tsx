import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-8rem)] flex flex-col items-center justify-center px-4 py-16 text-center">
      <div className="max-w-md mx-auto space-y-6">
        <div className="w-16 h-16 rounded-none border border-border bg-[#fbfbfa] bg-logo shadow-hard-xs flex items-center justify-center mx-auto p-2">
          <Image
            src="/icons/logo.png"
            alt="WebnD Logo"
            width={48}
            height={48}
            className="w-full h-full object-contain"
          />
        </div>

        <div className="space-y-2">
          <h1 className="font-serif text-3xl sm:text-4xl font-normal tracking-tight text-foreground">
            Page Not Found
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            The concept or technology you requested could not be found. It may have been renamed or does not exist yet.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/learn">
            <Button className="w-full sm:w-auto gap-2">
              <ArrowLeft className="w-4 h-4" />
              <span>Browse Technologies</span>
            </Button>
          </Link>
          <Link href="/">
            <Button variant="outline" className="w-full sm:w-auto">
              Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
