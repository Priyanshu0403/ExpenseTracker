import JWT from "jsonwebtoken";
const authMiddleware = async (req,res,next)=>{
    const authHeader = req?.headers?.authorization;

    if(!authHeader || !authHeader?.startsWith("Bearer")){
        return res.status(401).json({
            status:"auth_failed",
            message:"Authorization header is missing or invalid"
        });
    }

    const token = authHeader?.split(" ")[1];

    try {
        const userToken = JWT.verify(token, process.env.JWT_SECRET);

        req.body.user = { 
            userId: userToken.userId,
        };

        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            status: "auth_failed",
            message: "Invalid token"
        })
        
    }
};

export default authMiddleware;
