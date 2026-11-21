const fs=require('fs'),path=require('path');
const files=[];
(function walk(d){for(const e of fs.readdirSync(d,{withFileTypes:true})){if(['node_modules','.next','.git'].includes(e.name))continue;const p=path.join(d,e.name);e.isDirectory()?walk(p):/\.(jsx?|css)$/.test(e.name)&&files.push(p);}})('.');
for(const f of files){const s=fs.readFileSync(f,'utf8');const re=/className\s*=\s*(?:"([^"]*)"|`([^`]*)`|\{`([^`]*)`\})/g;let m;while((m=re.exec(s))){const toks=(m[1]||m[2]||m[3]||'').split(/\s+/);if(toks.includes('bg-[#35C77A]')||toks.includes('bg-[#08a515]')){const hasText=toks.some(t=>/^text-(white|\[|slate|gray|black)/.test(t));if(!hasText)console.log(f, '::', toks.join(' '));}}}
