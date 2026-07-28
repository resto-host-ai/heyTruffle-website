import Script from "next/script";

// Microsoft Clarity — dedicated project for heytruffle, so recordings and
// heatmaps stay separate from the RestoHost site (which shares the same account
// but uses its own project). Loaded once from the root layout so it runs on
// every route.
const CLARITY_ID = "xtjkj1o17u";

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
