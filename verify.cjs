const fs=require('fs'),path=require('path');
const dir='.next/static/chunks';
const files=fs.readdirSync(dir).filter(f=>f.endsWith('.css'));
const all=files.map(f=>fs.readFileSync(path.join(dir,f),'utf8')).join('\n');
console.log('css bytes',all.length);
for(const n of ['.dark .bg-white','--eq-surface','.dark .text-\\[\\#142B45\\]','.theme-icon-dark','data-active\\:bg-emerald-50[data-active]','from-white.via-','[data-sonner-toaster][data-sonner-theme]','recharts-cartesian-axis-tick']){
  console.log(n, all.includes(n));
}
const html=fs.readFileSync('.next/server/app/index.html','utf8');
const i=html.indexOf('equiply-theme');
console.log('script in html:', i>0, i>0?html.slice(i-80,i+120):'');
console.log('html dark class attr present:', /<html[^>]*>/.test(html), html.slice(0,200));
