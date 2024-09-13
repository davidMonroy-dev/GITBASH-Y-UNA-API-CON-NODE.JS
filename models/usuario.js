import pkg from 'bcryptjs';
const { hash, compare } = pkg;
import db from "../config/database.js";

export class AuthModel {

  static async getAll() {
    try {
      console.log("getAllAuth");
      const [auth] = await db.promise().query("SELECT * FROM usuario");
      return auth;
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
      throw error;
    }
  }

  static async getByAdmin() {
   try {
      console.log('getByAdmin');
      const [authAdmin] = await db.promise().query('SELECT * FROM usuario WHERE rol = 1');
      if (authAdmin.length === 0) return null;
      return authAdmin;
   } catch (error) {
      console.error('Error al obtener el usuario Admin', error);
      throw error;
   }
  }

  static async getByProfesor() {
   try {
      console.log('getByProfesor');
      const [authProfesor] = await db.promise().query('SELECT * FROM usuario WHERE rol = 2');
      if (authProfesor.length === 0) return null;
      return authProfesor;
   } catch (error) {
      console.error('Error al obtener el usuario Profesor', error);
      throw error;
   }
  }

  static async getByEstudiante() {
   try {
      console.log('getByEstudiante');
      const [authEstudiante] = await db.promise().query('SELECT * FROM usuario WHERE rol = 3');
      if (authEstudiante.length === 0) return null;
      return authEstudiante;
   } catch (error) {
      console.error('Error al obtener el usuario Admin', error);
      throw error;
   }
  }


  static async userAuthentication({ email,  contraseña, rol }) {
    try {
       console.log("userAuthentication");
       const [results] = await db.promise().query("SELECT * FROM usuario WHERE email = ?", [email,  contraseña, rol ]);
       if (results.length === 0) return null;
       return results[0];
    } catch (error) {
       console.error("Error al obtener usuario:", error);
       throw error;
    }
 }
 

  static async createAuth({ input }) {
    const { tipoDocumento, numeroDocumento, nombres, apellidos, email, telefono, contraseña, rol } = input;
    const hashedContraseña = await hash(contraseña, 10);
    try {
       console.log("createAuth");
       await db.promise().query(
          "INSERT INTO usuario (tipoDocumento, numeroDocumento, nombres, apellidos, email, telefono, contraseña, rol) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
          [tipoDocumento, numeroDocumento, nombres, apellidos, email, telefono, hashedContraseña, rol]
       );
    } catch (error) {
       console.error("Error al crear un usuario:", error);
       throw error;
    }
 } 
}