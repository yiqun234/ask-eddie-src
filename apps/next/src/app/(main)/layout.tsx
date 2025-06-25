"use client";

import * as React from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const isSmallScreen = useMediaQuery("(max-width: 768px)");

  const finalIsCollapsed = isSmallScreen || isCollapsed;

  return (
    <div className={cn("grid min-h-screen w-full", finalIsCollapsed ? "grid-cols-[64px_1fr]" : "grid-cols-[240px_1fr]")}>
      <Sidebar isCollapsed={finalIsCollapsed} />
      <div className="relative flex flex-col overflow-hidden">
        {!isSmallScreen && (
          <div className="absolute top-1/2 -translate-y-1/2 -left-3 z-10">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-full"
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              {isCollapsed ? <ChevronsRight className="h-4 w-4" /> : <ChevronsLeft className="h-4 w-4" />}
            </Button>
          </div>
        )}
        <main className="flex-1 p-6 bg-slate-50 overflow-y-hidden">{children}</main>
      </div>
    </div>
  );
} 