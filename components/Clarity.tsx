import Script from "next/script";

// Microsoft Clarity — same account as the RestoHost site (project "resto-host").
// Session recordings + heatmaps. Loaded once from the root layout so it runs on
// every route.
const CLARITY_ID = "umimfwu6lv";

export default function Clarity() {
  return (
    <Script id="clarity-init" strategy="afterInteractive">{`
      (function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
      })(window, document, "clarity", "script", "${CLARITY_ID}");
    `}</Script>
  );
}
