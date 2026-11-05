import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { randomUUID } from 'node:crypto';
import { pathToFileURL } from 'node:url';
export const services = [{id:'cleaning',name:'Home cleaning',price:500},{id:'repair',name:'Home repair',price:750}];
export function createApp({bugMode=false}={}) {
 const bookings=new Map();
 return createServer(async(req,res)=>{
  const send=(status,data)=>{res.writeHead(status,{'Content-Type':'application/json; charset=utf-8'});res.end(JSON.stringify(data));};
  const url=new URL(req.url,'http://localhost');
  if(req.method==='GET'&&url.pathname==='/') {res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});res.end(await readFile(new URL('./index.html',import.meta.url)));return;}
  if(req.method==='GET'&&url.pathname==='/api/services') return send(200,services);
  if(req.method==='POST'&&url.pathname==='/api/bookings') {
   let input;try {let body=''; for await(const chunk of req){body+=chunk;if(body.length>16384)return send(413,{error:'Payload too large'});}input=JSON.parse(body);}catch{return send(400,{error:'Invalid JSON'});}
   if(!input||typeof input!=='object'||Array.isArray(input))return send(400,{error:'Expected an object'});
   const {name,serviceId,rooms}=input;
   if(typeof name!=='string'||name.trim().length<2||name.trim().length>60)return send(400,{error:'Name must contain 2–60 characters'});
   const service=services.find(s=>s.id===serviceId);
   if(!service)return send(400,{error:'Unknown service'});
   // Training-only defect: BUG_MODE=1 incorrectly permits zero rooms.
   if(!Number.isInteger(rooms)||rooms<(bugMode?0:1)||rooms>5)return send(400,{error:'Rooms must be an integer from 1 to 5'});
   const booking={id:randomUUID(),name:name.trim(),serviceId,rooms,total:rooms*service.price,status:'confirmed'};
   bookings.set(booking.id,booking);return send(201,booking);
  }
  const match=url.pathname.match(/^\/api\/bookings\/([^/]+)$/);
  if(match&&['GET','DELETE'].includes(req.method)){
   const booking=bookings.get(match[1]);if(!booking)return send(404,{error:'Booking not found'});
   if(req.method==='DELETE'){if(booking.status==='cancelled')return send(409,{error:'Already cancelled'});booking.status='cancelled';}
   return send(200,booking);
  }
  return send(404,{error:'Not found'});
 });
}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){
 const app=createApp({bugMode:process.env.BUG_MODE==='1'});
 app.listen(Number(process.env.PORT||3000),'127.0.0.1',()=>console.log('HomeCare demo: http://127.0.0.1:'+app.address().port));
}
