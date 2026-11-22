const fs=require('fs');
const html=fs.readFileSync('.next/server/app/dashboard/customer.html','utf8');
for(const n of ['flex-1 px-4 py-6','undefined flex-1','dashboardContent']){const i=html.indexOf(n);console.log('==',n,i>=0?html.slice(Math.max(0,i-180),i+220):'NOT FOUND');}
