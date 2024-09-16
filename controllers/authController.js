import { AuthModel } from "../models/usuario.js";
import pkg from "bcryptjs";
const { hash, compare } = pkg;

export class AuthController {
  static async getAll(req, res) {
    try {
      const authGet = await AuthModel.getAll();
      res.status(200).json(authGet);
    } catch (error) {
      console.error("Error al obtener usuario:", error);
      res
        .status(500)
        .json({ message: `Error al obtener un usuario ${error.message}` });
    }
  }

  static async register(req, res) {
    try {
      const input = req.body;
      const user = await AuthModel.createAuth({ input });

      if (!user.id) {
        throw new Error("No se pudo crear el usuario.");
      }

      const userId = user.id; // Aquí obtienes el id del usuario recién creado

      console.log("ID del usuario recién creado:", userId);
      console.log("ROL del usuario recién creado:", input.rol);

      if (input.rol == 1) {
        const adminResult = await AuthModel.getByAdmin(userId);
        console.log("Resultado de getByAdmin:", adminResult);
      } else if (input.rol == 2) {
        const ProfesorResult = await AuthModel.getByProfesor(userId);
        console.log("Resultado de getByAdmin:", ProfesorResult);
      } else {
        const EstudianteResult = await AuthModel.getByEstudiante(userId);
        console.log("Resultado de getByAdmin:", EstudianteResult);
      }

      res.redirect("/login");
      console.log("Usuario Creado Exitosamente");
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      res
        .status(500)
        .json({ message: `Error al crear un usuario: ${error.message}` });
    }
  }

  static async registerAdmin(req, res) {
    try {
      const input = req.body;
      const user = await AuthModel.createAuth({ input });

      if (!user.id) {
        throw new Error("No se pudo crear el usuario.");
      }

      const userId = user.id; // Aquí obtienes el id del usuario recién creado

      console.log("ID del usuario recién creado:", userId);
      console.log("ROL del usuario recién creado:", input.rol);

      if (input.rol == 1) {
        const adminResult = await AuthModel.getByAdmin(userId);
        console.log("Resultado de getByAdmin:", adminResult);
      } else if (input.rol == 2) {
        const ProfesorResult = await AuthModel.getByProfesor(userId);
        console.log("Resultado de getByAdmin:", ProfesorResult);
      } else {
        const EstudianteResult = await AuthModel.getByEstudiante(userId);
        console.log("Resultado de getByAdmin:", EstudianteResult);
      }

      res.redirect("/admin");
      console.log("Usuario Creado Exitosamente");
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      res
        .status(500)
        .json({ message: `Error al crear un usuario: ${error.message}` });
    }
  }

  static async login(req, res) {
    const { email, contraseña, rol } = req.body;
    try {
      const user = await AuthModel.userAuthentication({ email, contraseña });

      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      const passwordMatch = await compare(contraseña, user.contraseña);
      if (!passwordMatch) {
        return res.status(401).json({ message: "Contraseña incorrecta" });
      } else {
        req.session.loggedin = true;
        req.session.email = email;
        req.session.rol = rol;
        console.log(user.rol);
      }

      if (user.rol === 1) {
        res.redirect("/admin");
      } else if (user.rol === 2) {
        res.redirect("/profesor");
      } else if (user.rol === 3) {
        res.redirect("/estudiante");
      } else {
        res.redirect("/director")
      }

      console.log("Inicio de sesion exitosa");
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      res
        .status(500)
        .json({ message: `Error al iniciar sesión: ${error.message}` });
    }
  }

  static async updateAuth(req, res) {
    try {
      const  id  = req.params.id;
      const input = req.body;
      await AuthModel.updateAuth({ id, input });
      res.redirect(`/admin?message=Usuario actualizada exitosamente`);
    } catch (error) {
      res.status(404).json({
        message: `Error no se encuentra el usuario: ${error.message}`,
      });

      console.error("Error al obtener usuario:", error);
      res
        .status(500)
        .json({ message: `Error al actualizar usuario: ${error.message}` });
    }
  }

  static async deleteAuth(req, res) {
    try {
      const  id  = req.params.id;
      await AuthModel.delete({ id });
      res.redirect(`/admin?message=Usuario eliminado exitosamente`);
    } catch (error) {
      res.status(404).json({
        message: `Error no se encuentra el usuario: ${error.message}`,
      });

      console.error("Error al obtener usuario:", error);
      res
        .status(500)
        .json({ message: `Error al actualizar usuario: ${error.message}` });
    }
  }

  static async UpdatePage(req, res, next) {
    try {

      const id = req.params.id

      const user = await AuthModel.getAllUser(id);

      if (!user) {
        return res
          .status(404)
          .render("admin", { message: "usuario no encontrada" });
      }

      res.render("update", { user });
    } catch (error) {
      console.error("Error al obtener usuario:", error);
      res
        .status(500)
        .json({ message: `Error al obtener usuario: ${error.message}` });
    }
  }

  static async logout(req, res) {
    res.clearCookie("access_token");
    res.status(200).json({ message: "Sesión cerrada exitosamente" });
  }
}
