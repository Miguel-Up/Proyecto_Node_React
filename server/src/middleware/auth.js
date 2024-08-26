const { verifyToken } = require("../utils/jwt");
const User = require("../api/models/users.models");


const isAuth = async (req, res, next) => {
    try {
        const authorization = req.headers.authorization;

        if (!authorization) {
            return res.status(401).json({ message: "No está autorizado" });
        }

        const token = authorization.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "No hay token" });
        }

        let tokenVerify;
        try {
            tokenVerify = verifyToken(token);
        } catch (error) {
            return res.status(401).json({ message: "Token inválido" });
        }

        if (!tokenVerify.id) {
            return res.status(401).json({ message: "No existe el ID de usuario" });
        }

        const logged = await User.findById(tokenVerify.id);
        if (!logged) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        req.dataUser = logged;
        next();
    } catch (error) {
        console.error("Error en el middleware de autenticación:", error);
        return res.status(500).json({ message: "Error en el servidor" });
    }
}





const isAdmin = async (req, res, next) => {
    try {

        await isAuth(req, res, () => { });

        if (req.dataUser.role !== "admin") {
            return res.status(403).json({ message: "No tienes permisos de administrador" });
        }

        next();
    } catch (error) {
        console.error("Error en el middleware de administración:", error);
        return res.status(500).json({ message: "Error en el servidor" });
    }
}



module.exports = { isAuth, isAdmin }