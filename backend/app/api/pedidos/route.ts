import { NextRequest, NextResponse } from "next/server";
import pool from "@/app/libs/mysql";

export async function GET() {
    try {
        const db = await pool.getConnection()
        const query = `SELECT 
    C.id, D.razao_social,sum(valorvenda*quantidade) as valor_total
FROM
    backend.pedido_produto A
        INNER JOIN
    backend.produto B ON A.id_produto = B.id
        INNER JOIN
    backend.pedido C ON A.id_pedido = C.id
        INNER JOIN
    backend.cliente D ON C.id_cliente = D.id
    
    group by C.id`
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
   var idcliente = result[0].cliente
   var rows3;
  
    query = "INSERT INTO pedido (id_cliente) VALUES ('"+idcliente+"')"
    const [rows] = await db.execute(query)
    
    query = "SELECT LAST_INSERT_ID() as id_pedido"
      const [rows2, fields]  = await db.execute(query)
    
    var idpedido = rows2[0].id_pedido;
    
 
   
   result.forEach(async function(pedidoproduto) {
    query = "INSERT into pedido_produto (id_pedido,id_produto,quantidade) values('"+idpedido+"','"+pedidoproduto.produto+"','"+pedidoproduto.quantidade+"')"
     rows3 = await db.execute(query)
    
  
   
   });
 
   
   
    db.release()
    
    
  
    return NextResponse.json({
            "ok": "ok"
        }, { status: 200 })
   } catch (error) {
        return NextResponse.json({
            error: error
        }, { status: 500 })
    }
    
  
}




