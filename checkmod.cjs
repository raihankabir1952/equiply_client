const fs=require('fs');
const c=fs.readFileSync('.next/dev/static/chunks/app_dashboard_dashboard_module_css_1q4ccquupxwfb.css','utf8');
console.log(c.slice(0,700));
console.log('...');
console.log('has :global ->',c.includes(':global'));
