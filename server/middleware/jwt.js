//First we are initialising jsonwebtoken module to use functionalitiies of jwt eg sign, verify
const jwt = require('jsonwebtoken');

//After successful register of user, and then calling the login endpoint with the already registereed user, it will create and return JWTctoken
const generateJwtToken = (userData) => {
    return jwt.sign(userData,process.env.PRIVATE_KEY,{expiresIn:400000})
}

//After login, we are getting the token, and for validating the JWT token, that it is correct or not, we will proceed with secure routes, to GET/POST/UPDATE/DELETE.
const validateJwtToken = (req,res,next)=>{
    const authCheck = req.headers.authorization;
    // OPTION1: req header mein token ya auth bheja hi nhi doesn't exists
    if(!tokenCheck) return res.status(401).json({err:'TOKEN NOT AVAILABLE'});

    //OPTION2: req heaader se token  aara  h but not in a right format:
    // - Authorization: BASIC/ BEARER
    //- BASIC btoa(USERNAME: PASSWORD) -> BASIC edjoiwjie
    //- BEARER jfiefjiosjdweo
    const token = req.headers.authorization.split(" ")[1];

    if(!token){
        return res.status(401).json({err:'Invalid Token'});
    }
    try{
        const validateToken = jwt.verify(token.process.env.PRIVATE_KEY);
        req.user = validateToken;
        next();
    }catch(err){
        return res.status(401).json(err.message);
    }
}

module.exports = {generateJwtToken,validateJwtToken}