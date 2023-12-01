import jwt from "jsonwebtoken";

export default (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
        return res.status(401).send();
    }

    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.ACESS_TOKEN, (err, decoded) => {
        if (err) {
            return res.sendStatus(403);
        }
        req.user = decoded.id;
        next();
    });
};
