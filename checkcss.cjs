const fs=require('fs'),path=require('path');
const dir='.next/static/chunks';
let all=''; for(const f of fs.readdirSync(dir).filter(f=>f.endsWith('.css'))) all+=fs.readFileSync(path.join(dir,f),'utf8');
for(const n of ['\\!bg-','f6f8fb','data-sonner-theme','--error-bg','dashboardContent']){
  let i=-1,count=0;
  while((i=all.indexOf(n,i+1))>=0&&count<6){count++;console.log(n,'@',i,JSON.stringify(all.slice(Math.max(0,i-90),i+130)));}
  console.log('---');
}
