const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

    const authorization = req.get("authorization");
    let token = '';

    if (authorization && authorization.toLowerCase().startsWith('bearer')) {
        token = authorization.split(' ')[1];
    }

    const decodedToken = jwt.verify(token, process.env.SECRET);

    if (!token || !decodedToken.id) {
        return res.status(401).json({ error: 'token missing or invalid' });
    }

    const { id: userId } = decodedToken;
    const { rol: userRol } = decodedToken;

    req.userId = userId;
    req.userRol = userRol

    next();
}
