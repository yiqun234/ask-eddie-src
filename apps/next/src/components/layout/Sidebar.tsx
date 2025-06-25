"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Archive, Gauge, BookOpen, Landmark, PenLine, File, Sparkles, Circle, Briefcase, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isCollapsed: boolean;
}

const counselorNavItems = [
  { href: "/dashboard", icon: Gauge, label: "Dashboard" },
  { href: "/student-directory", icon: Archive, label: "Student Directory" },
  { href: "/matriculation", icon: BookOpen, label: "Matriculation" },
  { href: "/rec-tracker", icon: Circle, label: "RecLetter" },
  { href: "/ask-eddie", icon: Sparkles, label: "Ask Eddie" },
];

const studentNavItems = [
    { href: "/student-dashboard", icon: Gauge, label: "Dashboard" },
    { href: "/college-builder", icon: Landmark, label: "College builder" },
    { href: "/essay-expert", icon: PenLine, label: "EssayXpert" },
    { href: "/resume", icon: File, label: "Resume" },
];


export function Sidebar({ isCollapsed }: SidebarProps) {
  const pathname = usePathname();

  return (
    <div className={"border-r bg-white flex flex-col transition-all duration-300"}>
      <div className={cn("flex h-full max-h-screen flex-col items-center", isCollapsed ? "px-1" : "px-4")}>
        <div className="flex h-[60px] w-full items-center justify-center border-b">
          <Link href="/" className="flex items-center gap-2 font-semibold" title="Ask Eddie">
            {isCollapsed ? <Briefcase className="h-6 w-6" /> : <Image src="/logo.png" alt="Ask Eddie Logo" width={120} height={32} />}
          </Link>
        </div>
        <div className="flex-1 overflow-y-auto w-full py-4">
          <nav className="grid items-start gap-2.5 text-sm font-bold">
            <span className={cn("py-3 text-black", isCollapsed ? "sr-only" : "text-center")}>Counselor View</span>
            {counselorNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                title={isCollapsed ? item.label : undefined}
                className={cn(
                    "flex items-center gap-2 rounded-lg py-3 text-slate-600 transition-all hover:bg-slate-100 hover:text-slate-900",
                    isCollapsed ? "justify-center px-0" : "px-4",
                    pathname === item.href && "bg-blue-50"
                )}
              >
                <item.icon className={cn("h-5 w-5", item.href === "/ask-eddie" && "text-[#3596DF]")} />
                <span className={cn(isCollapsed && "sr-only")}>{item.label}</span>
              </Link>
            ))}
            <div className="border-t border-slate-300"></div>
            <span className={cn("py-3 text-black", isCollapsed ? "sr-only" : "text-center")}>Student View</span>
             {studentNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                title={isCollapsed ? item.label : undefined}
                className={cn(
                    "flex items-center gap-2 rounded-lg py-3 text-slate-600 transition-all hover:bg-slate-100 hover:text-slate-900 mx-4",
                    isCollapsed ? "justify-center px-0" : "px-2",
                    pathname === item.href && "bg-blue-50"
                )}
              >
                <item.icon className="h-5 w-5" />
                <span className={cn(isCollapsed && "sr-only")}>{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-auto w-full py-4">
            <div className={cn(
                "flex h-11 w-full items-center gap-3 rounded-lg border border-[#F1F1F1]",
                isCollapsed ? "justify-center px-2" : "px-2"
            )}>
                <Image src="/counselor-avatar.png" alt="Counselor" width={28} height={28} className="rounded-full" />
                <span className={cn("font-medium", isCollapsed && "sr-only")}>Counselor Na...</span>
                <LogOut className={cn("h-4 w-4 ml-auto text-slate-500", isCollapsed && "sr-only")} />
            </div>
        </div>
      </div>
    </div>
  );
} 