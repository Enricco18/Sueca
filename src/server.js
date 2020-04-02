import connection from './socket'
  
connection.listen(3000, ()=>{
    console.log('listening on *:3000');
  });