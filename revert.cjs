const fs=require('fs');
const p='app/dashboard/dashboard.module.css';
let c=fs.readFileSync(p,'utf8');
const marker='\n\n/* ---- Dark theme ---- */';
const i=c.indexOf(marker);
if(i>=0){c=c.slice(0,i).replace(/\s+$/,'')+'\n';fs.writeFileSync(p,c);console.log('reverted dark block, bytes',c.length);}else console.log('marker not found');
