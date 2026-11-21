const fs=require('fs'),path=require('path');
const files=[];
(function walk(d){for(const e of fs.readdirSync(d,{withFileTypes:true})){if(['node_modules','.next','.git'].includes(e.name))continue;const p=path.join(d,e.name);e.isDirectory()?walk(p):/\.(jsx?|css)$/.test(e.name)&&files.push(p);}})('.');
const hits=new Set();
for(const f of files){const s=fs.readFileSync(f,'utf8');const re=/className\s*=\s*(?:"([^"]*)"|`([^`]*)`|\{`([^`]*)`\})/g;let m;while((m=re.exec(s))){for(const t of (m[1]||m[2]||m[3]||'').split(/\s+/)){if(/\[&|data-|!/.test(t)&&/(bg|text|border|fill|stroke|ring|divide)-/.test(t))hits.add(t);}}}
console.log([...hits].sort().join('\n'));
