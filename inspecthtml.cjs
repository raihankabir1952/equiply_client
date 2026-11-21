(async()=>{
const html=await (await fetch('http://localhost:3000/')).text();
const re=/hydration/ig; let m, n=0;
while((m=re.exec(html))&&n<5){n++;console.log('...'+html.slice(Math.max(0,m.index-120),m.index+120).replace(/\n/g,' ')+'...');}
console.log('count',n);
const i=html.indexOf('Switch to dark mode');
console.log('TOGGLE HTML:',html.slice(i-500,i+260));
})();
