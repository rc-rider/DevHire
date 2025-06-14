import jwt from "jsonwebtoken";

const tokens = (key) =>{
try {
    const tokenGenerate = jwt.sign({id:key},process.env.Seckey);
    const tokenVerify = jwt.verify(tokenGenerate,process.env.Seckey);
    return {tokenGenerate,tokenVerify}

} catch (error) {
    console.log(error,"Error At Token Generate");
    
}
}

export default tokens;