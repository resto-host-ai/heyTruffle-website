const REB2B_KEY = process.env.NEXT_PUBLIC_REB2B_KEY;

export default function Reb2b() {
  if (!REB2B_KEY) return null;

  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `!function(key){if(window.reb2b)return;window.reb2b={loaded:true};var s=document.createElement("script");s.async=true;s.src="https://ddwl4m2hdecbv.cloudfront.net/b/"+key+"/"+key+".js.gz";document.getElementsByTagName("script")[0].parentNode.insertBefore(s,document.getElementsByTagName("script")[0]);}(${JSON.stringify(REB2B_KEY)});`,
      }}
    />
  );
}
