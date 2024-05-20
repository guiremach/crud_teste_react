import { NextRequest, NextResponse } from "next/server";
import pool from "@/app/libs/mysql";

export async function GET() {
    try {
        const db = await pool.getConnection()
        const query = 'select * from produto'
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
   const result = await request.json()
    var query;

try {
   const db = await pool.getConnection()
  
    query = "INSERT INTO produto (descricao, valorvenda, estoque) VALUES ('"+result.descricao+"','"+result.valorvenda+"', '"+result.estoque+"')"
    const [rows] = await db.execute(query)
    db.release()
    console.log(query);
    return NextResponse.json({
            "ok": "ok"
        }, { status: 200 })
   } catch (error) {
        return NextResponse.json({
            error: error
        }, { status: 500 })
    }
    
  
}




