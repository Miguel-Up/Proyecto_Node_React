const Books = require("../models/books.models")
const User = require("../models/users.models")
const { generateToken } = require("../../utils/jwt")
const bcrypt = require("bcrypt")


const addUser = async (req, res) => {
    try {

        const { password, ...otherDetails } = req.body;


        const saltRounds = 10;
        const hashedPassword = await bcrypt.hashSync(password, saltRounds);


        const newUser = new User({
            ...otherDetails,
            password: hashedPassword
        });

        const createdUser = await newUser.save();

        return res.status(200).json({ message: "Usuario creado", data: createdUser });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error al crear el usuario", error });
    }
}



const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Buscar al usuario en la base de datos por correo electrónico
        const userByEmail = await User.findOne({ email });

        if (userByEmail) {
            // Comparar la contraseña ingresada con la contraseña encriptada almacenada
            const isPasswordValid = bcrypt.compareSync(password, userByEmail.password);

            if (isPasswordValid) {
                // Crear el token y retornarlo
                const data = { _id: userByEmail._id, email: userByEmail.email };
                const token = generateToken(data);
                return res.status(200).json({ message: "Inicio de sesión exitoso", token });
            } else {
                return res.status(401).json({ message: "La contraseña no coincide" });
            }
        } else {
            return res.status(404).json({ message: "El email no existe" });
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
}




const getUserbyId = async (req, res) => {
    try {
        const { id } = req.params;  // Usar req.params en lugar de req.query
        const user = await User.findById(id).populate("product"); // Populate para relaciones con productos

        if (!user) {
            return res.status(404).json({ message: "Usuario no existe" });
        }

        return res.status(200).json({ data: user });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al buscar el usuario" });
    }
}


const getProfile = (req, res) => {
    try {
        if (!req.dataUser) {
            return res.status(401).json({ message: "Usuario no autenticado" });
        }

        return res.status(200).json({
            name: req.dataUser.name,
            role: req.dataUser.role
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al obtener el perfil del usuario" });
    }
}


const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;  // Usar req.params en lugar de req.query

        const deleted = await User.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).json({ message: "El usuario con el ID proporcionado no existe" });
        }

        return res.status(200).json({ message: "Usuario eliminado con éxito", data: deleted });

    } catch (error) {
        console.error("Error al eliminar el usuario:", error);
        return res.status(500).json({ message: "Error al eliminar el usuario" });
    }
}

module.exports = { addUser, login, getProfile, deleteUser, getUserbyId };


