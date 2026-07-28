"use client";

import { useState } from "react";
import DemoAssistant from "@/components/demo/DemoAssistant";

/** Search + "Hear it live" bar that opens the live demo assistant, mirroring
 *  the home hero's behaviour. */
export default function DemoSearchBar() {
  const [query, setQuery] = useState("");
  const [demoOpen, setDemoOpen] = useState(false);

  return (
    <>
      {/* Same bar as the home hero — sizes, radius, blur and the chevron
          are kept identical so the two read as one component. Only the text
          colour differs: this one sits on dark cards, so the input text is
          cream instead of the hero's #251f21. Shown at every width, again
          like the hero. */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setDemoOpen(true);
        }}
        className="flex h-[54px] w-full max-w-[500px] items-center overflow-hidden rounded-[73.26px] border border-white/40 bg-[#f6f3ec]/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.45),0_12px_34px_rgba(0,0,0,0.18)] backdrop-blur-lg sm:h-[58px]"
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for your restaurant"
          aria-label="Search for your restaurant"
          className="h-full min-w-0 flex-1 bg-transparent pl-5 pr-2 font-body text-[15px] font-normal leading-[110%] text-cream outline-none placeholder:text-cream/70 sm:pl-7 sm:pr-4 sm:text-[16px]"
        />
        <button
          type="submit"
          className="flex h-full shrink-0 items-center justify-center gap-1.5 rounded-full bg-brand-orange px-4 font-body text-[15px] font-bold leading-[110%] text-[#f6f3ec] transition-all duration-300 btn-grad btn-grad-orange hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_12px_34px_rgba(239,114,0,0.55)] sm:gap-3 sm:px-8 sm:text-[16px]"
        >
          Hear it live
          <svg
            width="8"
            height="17"
            viewBox="0 0 19 40"
            fill="none"
            stroke="currentColor"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
            className="shrink-0 sm:-translate-y-px"
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
