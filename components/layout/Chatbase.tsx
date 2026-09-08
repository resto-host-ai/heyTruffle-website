import Script from "next/script";

export default function Chatbase() {
  return (
    <Script
      id="chatbase-embed"
      dangerouslySetInnerHTML={{
        __html: `(function(){if(!window.chatbase||window.chatbase("getState")!=="initialized"){window.chatbase=(...arguments)=>{if(!window.chatbase.q){window.chatbase.q=[]}window.chatbase.q.push(arguments)};window.chatbase=new Proxy(window.chatbase,{get(target,prop){if(prop==="q"){return target.q}return(...args)=>target(prop,...args)}})}const inject=function(){if(document.getElementById("GDgK1sO_xarB5eMmrjMsj"))return;const script=document.createElement("script");script.src="https://www.chatbase.co/embed.min.js";script.id="GDgK1sO_xarB5eMmrjMsj";script.domain="www.chatbase.co";document.body.appendChild(script)};const schedule=function(){const touch=window.matchMedia("(max-width: 767px), (hover: none) and (pointer: coarse)").matches;window.setTimeout(function(){if(typeof window.requestIdleCallback==="function"){window.requestIdleCallback(inject,{timeout:15000})}else{inject()}},touch?15000:4000)};if(document.readyState==="complete"){schedule()}else{window.addEventListener("load",schedule,{once:true})}})();`,
      }}
    />
  );
}
