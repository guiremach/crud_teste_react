import { NextRequest, NextResponse } from "next/server";
import pool from "@/app/libs/mysql";

export async function GET() {
    try {
        const db = await pool.getConnection()
        const query = 'select * from cliente'
        const [rows] = await db.execute(query)
        db.release()
        
        return NextResponse.json(rows)
    } catch (error) {
        return NextResponse.json({
            error: error
        }, { status: 500 })
    }
}


export async function POST(request: Request) {

   const { cnpj, razao_social, name, email } = request.body;
   const result = await request.json()
    var query;

  const res = await fetch('https://publica.cnpj.ws/cnpj/'+result.cnpj, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
   // body: JSON.stringify({ time: new Date().toISOString() }),
  })
 
  const data = await res.json()

  if(data.razao_social){ 
   const db = await pool.getConnection()
  
    query = "INSERT INTO cliente (razao_social, cnpj, email) VALUES ('"+data.razao_social+"','"+result.cnpj+"', '"+data.estabelecimento.email+"')"
    const [rows] = await db.execute(query)
    db.release()
   
   }

      console.log(query);
   // console.log(result);
    //console.log(data);
    //console.log(razao_social);
  
   //return NextResponse.json(null, { status: 200 })
    return NextResponse.json(data)

    
  
}




