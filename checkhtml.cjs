const fs=require('fs');
const html=fs.readFileSync('.next/server/app/dashboard/customer.html','utf8');
const i=html.indexOf('dashboardContent');
console.log('literal dashboardContent in html:', i>=0);
if(i>=0) console.log(html.slice(i-200,i+200));
const j=html.indexOf('undefined');
console.log('undefined occurrences:', (html.match(/undefined/g)||[]).length);
