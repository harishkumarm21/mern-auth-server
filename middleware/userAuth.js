import jwt from 'jsonwebtoken';

const userAuth = async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return res.json({
            success: false,
            message: 'Not Authorised Login Again'
        });
    }

    try {
        const decodedtoken = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.userId = decodedtoken.id;

        next();
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        });
    }
};

export default userAuth;