import { AuthModel } from "../models/usuario.js";
import pkg from 'bcryptjs';
const { hash, compare } = pkg;


export class AuthController {

  static async getAll(req, res) {
    try {
      const authGet = await AuthModel.getAll();
      res.status(200).json(authGet);
    } catch (error) {
      console.error("Error al obtener usuario:", error);
      res.status(500).json({ message: `Error al obtener un usuario ${error.message}`})
    }
  }

  static async getAdmin(req, res) {
   try {
      const { id } = req.params;
      const authGetAdmin = await AuthModel.getByAdmin();
      
      res.status(200).json(authGetAdmin)
   } catch (error) {
      console.error('Error al obtener usuario', error)
      res.status(500).json({ message: `Error al obtener usuario: ${error.message} `})
   }
  }

  static async getProfesor(req, res) {
   try {
      const authGetProfesor = await AuthModel.getByProfesor();

      res.status(200).json(authGetProfesor)
   } catch (error) {
      console.error('Error al obtener usuario', error)
      res.status(500).json({ message: `Error al obtener usuario: ${error.message} `})
   }
  }

  static async getEstudiante(req, res) {
   try {
      const authGetEstudiante = await AuthModel.getByEstudiante();
      
      res.status(200).json(authGetEstudiante)
   } catch (error) {
      console.error('Error al obtener usuario', error)
      res.status(500).json({ message: `Error al obtener usuario: ${error.message} `})
   }
  }


  static async register(req, res) {
    try {
       const input = req.body;
       await AuthModel.createAuth({ input });
       res.redirect("/login")
       console.log('Usuario Creado Exitosamente')
    } catch (error) {
       console.error("Error al registrar usuario:", error);
       res.status(500).json({ message: `Error al crear un usuario: ${error.message}` });
    }
 }
 

 
 static async login(req, res) {
   const { email, contraseña, rol } = req.body;
    try {
       const user = await AuthModel.userAuthentication({ email, contraseña, rol });
      
       if (!user) {
         return res.status(404).json({ message: 'Usuario no encontrado' });
      }
      
      const passwordMatch = await compare(contraseña, user.contraseña);
      if (!passwordMatch) {
         return res.status(401).json({ message: 'Contraseña incorrecta' });
      } else {
         req.session.loggedin = true;
         req.session.email = email;
         req.session.rol = rol;
      }   

      if (user.rol === 1 ) {
         res.redirect('/admin')
      } else if (user === 2) {
         res.redirect("/profesor")
      } else {
         res.redirect("/estudiante")
      }
      
      console.log('Inicio de sesion exitosa')
      
    } catch (error) {
       console.error('Error al iniciar sesión:', error);
       res.status(500).json({ message: `Error al iniciar sesión: ${error.message}` });
    }
 }
    
 static async logout(req, res) {
   res.clearCookie('access_token');
   res.status(200).json({ message: 'Sesión cerrada exitosamente' });
 }
 
}