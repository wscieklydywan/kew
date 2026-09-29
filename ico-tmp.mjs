import sharp from 'sharp'
import fs from 'fs'
const src='public/icon-512.png'
const sizes=[16,32,48]
const pngs=await Promise.all(sizes.map(s=>sharp(src).resize(s,s).png().toBuffer()))
const header=Buffer.alloc(6);header.writeUInt16LE(0,0);header.writeUInt16LE(1,2);header.writeUInt16LE(sizes.length,4)
let off=6+16*sizes.length;const dirs=[]
pngs.forEach((b,i)=>{const d=Buffer.alloc(16);d[0]=sizes[i];d[1]=sizes[i];d.writeUInt16LE(1,4);d.writeUInt16LE(32,6);d.writeUInt32LE(b.length,8);d.writeUInt32LE(off,12);off+=b.length;dirs.push(d)})
fs.writeFileSync('app/favicon.ico',Buffer.concat([header,...dirs,...pngs]))
