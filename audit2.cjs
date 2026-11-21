const fs=require('fs'),path=require('path');
const css=fs.readFileSync('app/globals.css','utf8')+fs.readFileSync('app/dashboard/dashboard.module.css','utf8');
const files=[];
(function walk(d){for(const e of fs.readdirSync(d,{withFileTypes:true})){if(['node_modules','.next','.git'].includes(e.name))continue;const p=path.join(d,e.name);e.isDirectory()?walk(p):/\.(jsx?)$/.test(e.name)&&files.push(p);}})('.');
const counts={};
for(const f of files){const s=fs.readFileSync(f,'utf8');const re=/["'`]([^"'`\n]*)["'`]/g;let m;while((m=re.exec(s))){for(const t of m[1].split(/\s+/)){if(!/^(hover:|focus:|group-hover:|disabled:|placeholder:|data-active:)?(bg|text|border|divide)-/.test(t))continue;if(!/(white|black|slate|gray|green|emerald|red|blue|yellow|orange|purple|\[#)/.test(t))continue;if(t.length>60)continue;counts[t]=(counts[t]||0)+1;}}}
const esc=t=>t.replace(/[\[\]\/#!:%().,+]/g,c=>'\\'+c);
const out=[];
for(const t of Object.keys(counts)){
  if(/^(text-white|text-slate-300|text-gray-300|text-emerald-100|text-emerald-200|border-white|bg-white\/\[|bg-black|bg-blue-400|bg-\[#08a515\]|bg-\[#142B45\]|bg-\[#35C77A\]|text-\[#6EE7A5\]|text-\[#35C77A\]|bg-\[#35C77A\]\/|hover:bg-\[#|focus:border-|bg-current|bg-sidebar|text-sidebar|bg-foreground|fill-foreground|border-\[#35C77A\]|hover:border-\[#35C77A\]|group-hover:bg-\[#35C77A\]|group-hover:text-\[#35C77A\]|group-hover:text-white|hover:bg-green-600|bg-blue-600|hover:bg-blue-700|hover:bg-white|hover:text-white|hover:text-\[#35C77A\]|text-\[#142B45\]|text-\[#23995A\])/.test(t)) continue;
  if(!/^(bg|text|border|divide)-/.test(t.replace(/^[a-z-]+:/,''))) continue;
  if(css.includes(esc(t))) continue;
  out.push(t);
}
console.log([...new Set(out)].sort().join('\n'));
