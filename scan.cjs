const fs=require('fs'),path=require('path');
const files=[];
function walk(d){for(const e of fs.readdirSync(d,{withFileTypes:true})){if(e.name==='node_modules'||e.name==='.next'||e.name==='.git')continue;const p=path.join(d,e.name);if(e.isDirectory())walk(p);else if(/\.(jsx?|css)$/.test(e.name))files.push(p);}}
walk('.');
const counts={};
for(const f of files){
  const s=fs.readFileSync(f,'utf8');
  const re=/(?:className|class)\s*=\s*(?:"([^"]*)"|`([^`]*)`|\{`([^`]*)`\})/g;let m;
  while((m=re.exec(s))){
    const text=m[1]||m[2]||m[3]||'';
    for(const tok of text.split(/\s+/)){
      if(!/^[a-z0-9:_\[\]\/\.\#\-%,()]+$/.test(tok))continue;
      if(!/^(dark:|hover:|focus:|group-hover:|disabled:|active:|sm:|md:|lg:|xl:)?(bg|text|border|ring|divide|from|via|to|shadow|outline|placeholder|fill|stroke|decoration|caret|accent)-/.test(tok))continue;
      counts[tok]=(counts[tok]||0)+1;
    }
  }
}
const entries=Object.entries(counts).sort((a,b)=>b[1]-a[1]);
console.log('TOTAL UNIQUE',entries.length);
for(const [k,v] of entries)console.log(String(v).padStart(4),k);
