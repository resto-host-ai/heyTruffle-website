import Script from "next/script";

const REB2B_KEY = process.env.NEXT_PUBLIC_REB2B_KEY;

/**
 * Reb2b — B2B visitor identification.
 *
 * `lazyOnload` (idle time, after the load event) rather than a bare inline
 * <script>. As an inline tag this executed the moment the parser reached it,
 * mid-load, and its first act is to inject a second script from CloudFront,
 * which in turn pulls b-code.liadm.com/lc2.js — 53 KiB of third-party code that
 * Lighthouse attributed 20.3 KiB of unused JavaScript and 17.8 KiB of legacy
 * polyfills to, all of it parsed and run while the browser was still trying to
 * paint the hero. None of that work has anything to do with what the visitor
 * sees, so it has no business on the critical path.
 *
 * Identification itself is unaffected: the script still loads on every page
 * view, just after the page is usable. The only visitor it can now miss is one
 * who leaves before the browser goes idle — a bounce that fast would not have
 * produced a usable session anyway.
 */
export default function Reb2b() {
  if (!REB2B_KEY) return null;

  return (
    <Script
      id="reb2b"
      strategy="lazyOnload"
      dangerouslySetInnerHTML={{
        __html: `!function(key){if(window.reb2b)return;window.reb2b={loaded:true};var s=document.createElement("script");s.async=true;s.src="https://ddwl4m2hdecbv.cloudfront.net/b/"+key+"/"+key+".js.gz";document.getElementsByTagName("script")[0].parentNode.insertBefore(s,document.getElementsByTagName("script")[0]);}(${JSON.stringify(REB2B_KEY)});`,
      }}
    />
  );
}
