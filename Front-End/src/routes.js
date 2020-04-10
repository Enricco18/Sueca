import {resolve} from 'path'
import {Router} from 'express'

const router = new Router();

router.get('/',(req,res)=>{
   res.sendFile('index.html');
})

export default router