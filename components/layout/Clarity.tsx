import Script from "next/script";

// Microsoft Clarity — same account as the RestoHost site (project "resto-host").
// Session recordings + heatmaps. Loaded once from the root layout so it runs on
// every route.
const CLARITY_ID = "umimfwu6lv";

export default function Clarity() {
  return (
    /* lazyOnload: Clarity's tag (~35KB + continuous recording CPU) was
       loading right in the hydration window on every route — on phones it
       competed with the app's own chunks exactly when INP is measured.
       Analytics can afford to start after the page is idle. */
    <Script id="clarity-init" strategy="lazyOnload">{`
      (function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
      })(window, document, "clarity", "script", "${CLARITY_ID}");
    `}</Script>
  );
}
