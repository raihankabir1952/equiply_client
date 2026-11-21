const pages=['/','/login','/register','/equipment','/about','/contact','/dashboard/customer','/dashboard/admin/users','/payment/cancel','/not-found-test'];
(async()=>{
for(const p of pages){
  try{
    const r=await fetch('http://localhost:3000'+p,{redirect:'manual'});
    const html=await r.text();
    const checks={
      status:r.status,
      themeScript:html.includes('equiply-theme'),
      toggle:html.includes('Switch to dark mode'),
      darkLogo:html.includes('footerlogo.png'),
      hydrationErr:/hydration|Hydration failed/i.test(html),
      errorOverlay:html.includes('__next_error__')||html.includes('nextjs__container_errors'),
    };
    console.log(p,JSON.stringify(checks));
  }catch(e){console.log(p,'FETCH ERROR',e.message)}
}
})();
