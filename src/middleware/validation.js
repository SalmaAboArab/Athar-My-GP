
export const validation = (schema)=>{
    return (req , res , next)=>{
        let inputs = {...req.body , ...req.params , ...req.query};
        let {error} = schema.validate(inputs , {abortEarly : false});
        if(error) res.status(400).json({message: error});
        else next();
    }
}