const fs=require('fs');
const html=fs.readFileSync('.next/server/app/dashboard/customer.html','utf8');
for(const n of ['min-w-0','dashboard','f6f8fb','<main']){const i=html.indexOf(n);console.log('==',n,i>=0?html.slice(Math.max(0,i-260),i+260):'NOT FOUND');}
