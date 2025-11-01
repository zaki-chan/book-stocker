import { serve } from '@hono/node-server'
import { Hono } from 'hono'
// import { html } from 'hono/html'
// import { basicAuth } from 'hono/basic-auth'
import { Client } from 'pg'


const client = new Client({
  user:'user',
  password:'mysecretpassword',
  host: 'localhost',
  database: 'test_db',
  port: 5432
})

// DB接続
client.connect()
  .then(() => console.log('connected'))
  .catch((err) => console.log('Connection error', err.stack))

const app = new Hono()

// DBからデータ取得
app.get('/api/users/', async (c) => {
  try{
    const result = await client.query('SELECT * FROM users')

    return c.json({
      ok:true,
      users:result.rows
    })
  } catch(err){
    if (err instanceof Error){
      console.error('DB query failed:', err.stack)
      return c.json({
        ok:false,
        message:'Failed to fetch users from database.'
      },500)
    }
    console.error('An unknown error occurred:', err)
    return c.json({
      ok:false,
      message:'An unknown error occurred.'
    },500)
  }
})

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

// app.get('/api/hello',(c) =>{
//   return c.json({
//     ok:true,
//     message:'Hello Hono!',
//   })
// })

// app.get('/posts/:id',(c)=>{
//   const page = c.req.query('page')
//   const id = c.req.param('id')
//   c.header('X-Message','Hi!')
//   return c.text(`You want to see ${page} of ${id}`)
// })

// app.post('/posts',(c) => c.text('Created!',201))
// app.delete('/posts/:id',(c)=>
//   c.text(`${c.req.param('id')} is deleted!`)
// )

// const View = () =>{
//   return(
//     <html>
//       <body>
//         <h1>Hello Hono!</h1>
//       </body>
//     </html>
//   )
// }

// app.get('/page',(c)=>{
//   return c.html(<View />)
// })

// app.get('/',()=>{
//   return new Response('Good morning!')
// })

// app.use(
//   '/admin/*',
//   basicAuth({
//     username:'admin',
//     password:'secret'
//   })
// )

// app.get('/admin',(c)=>{
//   return c.text('You are authorized!')
// })

// サーバー起動設定
const port = 3000
console.log(`Hono Server listening on localhost:${port}`)
// serve関数でNode.jsランタイムでHonoを起動
serve({
  fetch:app.fetch,
  port
})

// export default app
