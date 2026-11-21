const fs=require('fs'),path=require('path');
const dir='.next/dev/static/chunks';
for(const f of fs.readdirSync(dir).filter(f=>f.endsWith('.css'))){
  const c=fs.readFileSync(path.join(dir,f),'utf8');
  if(!c.includes('142B45')) continue;
  console.log('FILE',f,c.length);
  const needles=['text-\\[\\#142B45\\]','bg-white\\/95','bg-slate-50\\/80','border-slate-200\\/80','data-active\\:bg-emerald-50','hover\\:bg-slate-50','bg-white\\/80','divide-gray-100'];
  for(const n of needles){const i=c.indexOf(n);console.log('==',n,i>=0?JSON.stringify(c.slice(i,i+120)):'NOT FOUND');}
  break;
}
