import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-cream text-[#251f21]">
      <div className="mx-auto max-w-[1536px] px-6 py-16 md:px-10 md:py-20">
        <Link href="/" aria-label="heytruffle home" className="inline-block">
          {/* Logo asset is cream — darken it for the light background */}
          <Image
            src="/images/heytruffle-logo.svg"
            alt="heytruffle"
            width={177}
            height={40}
            unoptimized
            className="h-9 w-auto brightness-0"
          />
        </Link>

        <p className="mt-8 max-w-[340px] font-body text-[20px] font-normal leading-[110%] text-[#251f21]">
          AI-Driven Voice Restaurant Assistants for Seamless Customer
          Interaction
        </p>

        <div className="mt-16 h-px w-full bg-[#251f21]/15" />

        <p className="mt-6 font-body text-[20px] font-normal leading-[110%] text-[#251f21]">
          © 2024 RestoHost AI. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
