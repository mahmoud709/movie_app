import jwt from 'jsonwebtoken';
const authentication=(req,res,next)=>{
    const {token}=req.token;
    try{
        const decoded = jwt.verify(token, 'shhhhh');
        req.user=decoded
        next();
    }
    catch(err){
        res.send('Invalid Token')
    }
}