const fs=require('fs'),path=require('path');
const css=fs.readFileSync('app/globals.css','utf8')+fs.readFileSync('app/dashboard/dashboard.module.css','utf8');
const files=[];
(function walk(d){for(const e of fs.readdirSync(d,{withFileTypes:true})){if(['node_modules','.next','.git'].includes(e.name))continue;const p=path.join(d,e.name);e.isDirectory()?walk(p):/\.(jsx?)$/.test(e.name)&&files.push(p);}})('.');
const counts={};
for(const f of files){const s=fs.readFileSync(f,'utf8');const re=/className\s*=\s*(?:"([^"]*)"|`([^`]*)`|\{`([^`]*)`\})/g;let m;while((m=re.exec(s))){for(const t of (m[1]||m[2]||m[3]||'').split(/\s+/)){if(!/^(hover:|focus:|group-hover:|disabled:|placeholder:|data-active:|dark:)?(bg|text|border|divide)-/.test(t))continue;if(!/(white|black|slate|gray|green|emerald|red|blue|yellow|orange|purple|\[#)/.test(t))continue;counts[t]=(counts[t]||0)+1;}}}
const esc=t=>t.replace(/[\[\]\/#!:%().,+]/g,c=>'\\'+c);
const lightish=[];
for(const t of Object.keys(counts)){
  if(/^(text-white|text-slate-300|text-gray-300|text-emerald-100|text-emerald-200|border-white\/|bg-white\/\[|bg-black|bg-blue-400|bg-\[#08a515\]|bg-\[#142B45\]|bg-\[#35C77A\]|text-\[#6EE7A5\]|text-\[#35C77A\]|bg-\[#35C77A\]\/|hover:bg-\[#|focus:border-|dark:|bg-current|text-\[#142B45\]\.|bg-sidebar|text-sidebar|bg-foreground|fill-foreground)/.test(t)) continue;
  if(!/^(bg|text|border|divide)-/.test(t.replace(/^[a-z-]+:/,''))) continue;
  const e=esc(t);
  if(!css.includes(e)) lightish.push(t);
}
console.log('UNHANDLED:'); console.log([...new Set(lightish)].sort().join('\n'));
