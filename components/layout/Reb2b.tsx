const REB2B_KEY = process.env.NEXT_PUBLIC_REB2B_KEY;

/**
 * reb2b visitor-identification pixel.
 *
 * Stays an inline script in the server HTML (so tag-verification tools that
 * fetch the page without executing JS still see it), but the injection is now
 * scheduled for browser idle time after `load` instead of running the instant
 * the parser reaches it. Its loader pulls ddwl4m2hdecbv.cloudfront.net, which
 * in turn pulls b-code.liadm.com/lc2.js — 53KB of third-party JavaScript that
 * Lighthouse measured as the single largest non-first-party item on the page,
 * arriving while the hero was still painting. An identity ping is just as
 * valid once the page is interactive.
 *
 * Kept as a hand-rolled inline snippet rather than lib/whenIdle.ts: this is
 * not a React component tree, it's a vendor snippet that must run without
 * hydration, so it carries its own three-line scheduler.
 */
export default function Reb2b() {
  if (!REB2B_KEY) return null;

  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `!function(key){function load(){if(window.reb2b)return;window.reb2b={loaded:true};var s=document.createElement("script");s.async=true;s.src="https://ddwl4m2hdecbv.cloudfront.net/b/"+key+"/"+key+".js.gz";document.getElementsByTagName("script")[0].parentNode.insertBefore(s,document.getElementsByTagName("script")[0]);}function idle(){window.requestIdleCallback?window.requestIdleCallback(load,{timeout:2000}):setTimeout(load,1);}document.readyState==="complete"?idle():window.addEventListener("load",idle,{once:true});}(${JSON.stringify(REB2B_KEY)});`,
      }}
    />
  );
}
