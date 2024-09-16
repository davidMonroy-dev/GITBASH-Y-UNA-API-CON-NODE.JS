import pkg from 'bcryptjs';
const { hash, compare } = pkg;
import db from "../config/database.js";

export class AuthModel {

  static async getAll() {
    try {
      console.log("getAllAuth");
      const [auth] = await db.promise().query("select u.id, td.nombre as tipo_documento, u.numerodocumento, u.nombres, u.apellidos, u.email, u.telefono, r.nombre as rol from usuario u  inner join rol r on (r.id = u.rol) inner join tipodocumento td on (td.id = u.tipoDocumento);");
      return auth;
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
      throw error;
    }
  }

  static async getAllUser(id) {
   try {
     console.log("getAllAuth");
     const [auth] = await db.promise().query("SELECT * FROM usuario WHERE id = ?", [id]);
     return auth;
   } catch (error) {
     console.error("Error al obtener usuarios:", error);
     throw error;
   }
 }

  static async getByAdmin(id) {
   try {
      console.log('getByAdmin');
      const [result] = await db.promise().query('INSERT INTO administrador (usuario) VALUES (?)', [id]);
      if (result.affectedRows === 0) return null;
      return { id };
   } catch (error) {
      console.error('Error al obtener el usuario Admin', error);
      throw error;
   }
}


  static async getByProfesor(id) {
   try {
      console.log('getByProfesor');
      const [authProfesor] = await db.promise().query('INSERT INTO profesor (usuario) VALUES (?)', [id]);
      if (authProfesor.length === 0) return null;
      return { id };
   } catch (error) {
      console.error('Error al obtener el usuario Profesor', error);
      throw error;
   }
  }

  static async getByEstudiante(id) {
   try {
      console.log('getByEstudiante');
      const [authEstudiante] = await db.promise().query('INSERT INTO estudiante (usuario) VALUES (?)', [id]);
      if (authEstudiante.length === 0) return null;
      return { id };
   } catch (error) {
      console.error('Error al obtener el usuario Admin', error);
      throw error;
   }
  }


  static async userAuthentication({ email, contraseña }) {
    try {
       console.log("userAuthentication");
       const [results] = await db.promise().query("SELECT * FROM usuario WHERE email = ?", [email, contraseña]);
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
       const [result] = await db.promise().query(
          "INSERT INTO usuario (tipoDocumento, numeroDocumento, nombres, apellidos, email, telefono, contraseña, rol) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
          [tipoDocumento, numeroDocumento, nombres, apellidos, email, telefono, hashedContraseña, rol]
       );
       return { id: result.insertId };
    } catch (error) {
       console.error("Error al crear un usuario:", error);
       throw error;
    }
  } 

  static async updateAuth({ id, input }) {
   const { tipoDocumento, numeroDocumento, nombres, apellidos, email, telefono } = input;
   
   try {
      console.log('updateAuth')
      await db.promise().query('UPDATE usuario SET tipoDocumento = ?, numeroDocumento = ?, nombres = ?, apellidos = ?, email = ?, telefono = ? WHERE id = ?', 
      [tipoDocumento, numeroDocumento, nombres, apellidos, email, telefono, id]
      );
   } catch (error) {
      console.error('Error al actualizar el usuario:', error);
      throw error;
   }
  }

  static async delete(id) {
   try {
      await db.promise().query('DELETE FROM usuario WHERE id = ?',[id]);
      console.log('Delete');
   } catch (error) {
      console.error('Error al crear la institución:', error);
      throw error;
      }
   }
}
  
