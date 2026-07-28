"use client";

import { useState } from "react";
import DemoAssistant from "@/components/demo/DemoAssistant";

/** Button that opens the live demo assistant (the "Search for your restaurant"
 *  call flow). Lets server components trigger the demo without going client. */
export default function TryDemoButton({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={className}>
        {children}
      </button>
      <DemoAssistant
        open={open}
        initialQuery=""
        onClose={() => setOpen(false)}
      />
    </>
  );
}
