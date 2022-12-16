
module.exports =  (req,res,next)=>{
    if(roles==='admin'){
        next()
    
    }else{
        return res.render('notfound')
    }
    }
    
    