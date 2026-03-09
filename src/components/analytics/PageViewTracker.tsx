"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { insertPageView, isCmsConfigured } from "@/lib/cms-client";

const SESSION_KEY = "ethiodox_session_id";

function generateSessionId() {
  return `${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

export default function PageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.toString();

  useEffect(() => {
    if (!isCmsConfigured() || !pathname) return;
    if (pathname.startsWith("/admin") || pathname.startsWith("/sanctuary")) return;

    const storedSession = localStorage.getItem(SESSION_KEY);
    const sessionId = storedSession ?? generateSessionId();
    if (!storedSession) {
      localStorage.setItem(SESSION_KEY, sessionId);
    }

    const path = query ? `${pathname}?${query}` : pathname;

    insertPageView({
      path,
      session_id: sessionId,
      referrer: document.referrer || null,
      user_agent: navigator.userAgent || null,
    }).catch(() => {
      // Keep analytics fire-and-forget so navigation never blocks.
    });
  }, [pathname, query]);

  return null;
}
