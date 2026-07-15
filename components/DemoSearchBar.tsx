"use client";

import { useState } from "react";
import DemoAssistant from "@/components/DemoAssistant";

/** Search + "Live Demo" bar that opens the live demo assistant, mirroring the
 *  home hero's behaviour. */
export default function DemoSearchBar() {
  const [query, setQuery] = useState("");
  const [demoOpen, setDemoOpen] = useState(false);

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setDemoOpen(true);
        }}
        className="flex h-[64px] w-full max-w-[559px] items-center overflow-hidden rounded-[73.26px] border border-white/40 bg-[#f6f3ec]/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.45),0_12px_34px_rgba(0,0,0,0.18)] backdrop-blur-lg sm:h-[74px]"
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for your restaurant"
          aria-label="Search for your restaurant"
          className="h-full min-w-0 flex-1 bg-transparent pl-6 pr-3 font-body text-[20px] font-normal leading-[110%] text-cream outline-none placeholder:text-cream/70 sm:pl-[38px] sm:pr-4"
        />
        <button
          type="submit"
          className="flex h-full shrink-0 items-center justify-center gap-2 rounded-full bg-brand-orange px-6 font-body text-[20px] font-bold leading-[110%] text-cream transition-colors hover:bg-[#d96700] sm:gap-4 sm:px-[44px]"
        >
          Live Demo
          <svg
            width="13"
            height="27"
            viewBox="0 0 19 40"
            fill="none"
            stroke="currentColor"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
            className="shrink-0"
          >
            <path d="M3 4l13 16-13 16" />
          </svg>
        </button>
      </form>

      <DemoAssistant
        open={demoOpen}
        initialQuery={query}
        onClose={() => setDemoOpen(false)}
      />
    </>
  );
}
