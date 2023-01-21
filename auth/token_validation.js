const { verify } = require('jsonwebtoken');
module.exports = {
    checkToken : (req, res, next) => {
        let token = req.get("authorization");
        if(!token)
        {
            return res.json({
                success : 0,
                message : "Acesss Denied!"
            })
        }
        else
        {
            token = token.slice(7);
            verify(token, "qwe1234", (err, decodeded) => {
                if(err)
                {
                    return res.json({
                        success : 0,
                        message : "Invalid Token"
                    });
                }
                else
                {
                    next();
                }
            });
        }
    }
} 