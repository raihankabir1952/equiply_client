const fs=require('fs'),path=require('path');
const css=fs.readFileSync('app/globals.css','utf8')+fs.readFileSync('app/dashboard/dashboard.module.css','utf8');
const files=[];
(function walk(d){for(const e of fs.readdirSync(d,{withFileTypes:true})){if(['node_modules','.next','.git'].includes(e.name))continue;const p=path.join(d,e.name);e.isDirectory()?walk(p):/\.(jsx?)$/.test(e.name)&&files.push(p);}})('.');
const counts={};
for(const f of files){const s=fs.readFileSync(f,'utf8');const re=/["'`]([^"'`\n]*)["'`]/g;let m;while((m=re.exec(s))){for(const t of m[1].split(/\s+/)){if(!/^(hover:|focus:|group-hover:|disabled:|placeholder:|data-active:)?(bg|text|border|divide|fill|stroke)-\[#/.test(t))continue;counts[t]=(counts[t]||0)+1;}}}
const esc=t=>t.replace(/[\[\]\/#!:%().,+]/g,c=>'\\'+c);
for(const t of Object.keys(counts).sort()){if(!css.includes(esc(t)))console.log('MISSING',t);}
console.log('done');
