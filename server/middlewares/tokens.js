const jwt = require('jsonwebtoken');

const name = process.env.NAME || 'F.R.I.E.N.D.S';
const jwtSecret = process.env.JWT_SECRET || 'some_jwt_secret_token';

exports.generateToken = (req, res) => {
    const { secret } = req.body;
    if (secret) {
        const token = jwt.sign(
            {
                data: name,
            },
            secret
        );
        return res.json({
            success: true,
            message: 'Token Generation successful!!',
            secret,
            token,
        });
    } else {
        return res.json({
            success: false,
            message: 'Error! Secret is not supplied',
        });
    }
};

exports.validateToken = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers.authorization;
    if (token && token.startsWith('Bearer ')) {
        // Remove Bearer from string
        token = token.slice(7, token.length);
    }
    if (token) {
        // verify the token using secret in .env
        jwt.verify(token, jwtSecret, (err, decoded) => {
            if (err) {
                return res.json({
                    success: false,
                    message: 'Token is invalid',
                });
            }
            req.decoded = decoded;
            return next();
        });
    } else {
        return res.json({
            success: false,
            message: 'Error! Auth token is not supplied',
        });
    }
};
