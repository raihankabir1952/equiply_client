const fs=require('fs');
for(const f of ['public/images/logoo.png','public/images/footerlogo.png']){
  const b=fs.readFileSync(f);
  console.log(f, b.readUInt32BE(16)+'x'+b.readUInt32BE(20));
}
