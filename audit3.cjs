const fs=require('fs'),path=require('path');
const css=fs.readFileSync('app/globals.css','utf8')+fs.readFileSync('app/dashboard/dashboard.module.css','utf8');
const files=[];
(function walk(d){for(const e of fs.readdirSync(d,{withFileTypes:true})){if(['node_modules','.next','.git'].includes(e.name))continue;const p=path.join(d,e.name);e.isDirectory()?walk(p):/\.(jsx?)$/.test(e.name)&&files.push(p);}})('.');
const counts={};
for(const f of files){const s=fs.readFileSync(f,'utf8');const re=/["'`]([^"'`\n]*)["'`]/g;let m;while((m=re.exec(s))){for(const t of m[1].split(/\s+/)){if(t.length>70)continue;if(!/^(hover:|focus:|group-hover:|disabled:|placeholder:|data-active:)?(bg|text|border|divide|fill|stroke)-([a-z]+)-(50|100|200|300|400|500|600|700|800|900|950)(\/[0-9]+)?$/.test(t))continue;counts[t]=(counts[t]||0)+1;}}}
const esc=t=>t.replace(/[\[\]\/#!:%().,+]/g,c=>'\\'+c);
const handled=['text-white','text-slate-300','text-gray-300','text-emerald-100','text-emerald-200','text-slate-200','fill-slate-200','bg-red-500','bg-red-600','hover:bg-green-600','bg-blue-600','hover:bg-blue-700','hover:bg-white','hover:text-white','border-slate-400','text-cyan-600'];
const out=[];
for(const t of Object.keys(counts)){
  if(handled.includes(t))continue;
  if(css.includes(esc(t)))continue;
  out.push(t);
}
console.log([...new Set(out)].sort().join('\n'));
