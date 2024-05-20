import { NextRequest, NextResponse } from "next/server";
import pool from "@/app/libs/mysql";


export async function GET(
    request:  NextRequest,
    { params }: { params: { slug: string } }
) {
    const slug = params.slug // produto id
    
    try {
        const db = await pool.getConnection()        
        
        const query = 'select * from produto where id = ?'
        const [rows] = await db.execute(query,[slug])
        db.release()
        
        return NextResponse.json(rows)
    } catch (error) {
        return NextResponse.json({
            error: error
        }, { status: 500 })
    }
}

export async function PUT(request: Request) {
   const result = await request.json()
   var query;
   
   try {
   const db = await pool.getConnection()
  
    query = "UPDATE produto SET descricao ='"+result.descricao+"',  valorvenda ='"+result.valorvenda+"', estoque ='"+result.estoque+"' WHERE id =  '"+result.id+"' "
    const [rows] = await db.execute(query)
    db.release()
    console.log(query);
    return NextResponse.json({
            "ok": "ok"
        }, { status: 200 })
   } catch (error) {
        return NextResponse.json({
            error: error
        }, { status: 404 })
    }
   
   console.log(result);
     return NextResponse.json({
            "ok": "ok"
        }, { status: 200 })
    
}


export async function DELETE(
    request:  NextRequest,
    { params }: { params: { slug: string } }
) {
    const slug = params.slug // produto id
    var query
    
    try {
        const db = await pool.getConnection()        
        
        query = 'delete from pedido where id = ?'
        const [rows] = await db.execute(query,[slug])
        
        query = 'delete from pedido_produto where id_pedido = ?'
        const [rows2] = await db.execute(query,[slug])
        
        db.release()
        
        return NextResponse.json(rows)
    } catch (error) {
        return NextResponse.json({
            error: error
        }, { status: 500 })
    }
}



