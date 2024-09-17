import db from "../config/database.js";

export class InstModel {

static async getAll() {
  try {
    const [institucion] = await db.promise().query('SELECT * FROM institucion'); 
    return institucion;
  } catch (error) {
    console.error('Error al obtener instituciones:', error); 
    throw error; 
  }
}

static async getById(id) {
  if (!id) throw new Error('ID no proporcionado');

  try {
      const [institucion] = await db.query('SELECT * FROM instituciones WHERE id = ?', [id]);

      if (!institucion || institucion.length === 0) {
          return null;
      }

      return institucion[0]; 
  } catch (error) {
      console.error('Error al obtener la institución por ID:', error);
      throw error;
  }
}

  
  static async create({ input }) {
    const { nombre, tipo_de_institucion, descripcion, direccion, ciudad, pais } = input;

    try {
      console.log("create")
      await db.promise().query('INSERT INTO institucion (nombre, tipo_de_institucion, descripcion, direccion, ciudad, pais) VALUES (?, ?, ?, ?, ?, ?)',
        [nombre, tipo_de_institucion, descripcion, direccion, ciudad, pais]
      );
    } catch (error) {
        console.error('Error al crear la institución:', error);
        throw error;
    }
  }
  
  static async update({ id, input }) {
    const { nombre, tipo_de_institucion, descripcion, direccion, ciudad, pais } = input;

    try {
      console.log("update")
      const [result] = await db.promise().query('UPDATE institucion SET nombre = ?, tipo_de_institucion = ?, descripcion = ?, direccion = ?, ciudad = ?, pais = ? WHERE id = ?',
        [nombre, tipo_de_institucion, descripcion, direccion, ciudad, pais, id]
      );
      return result
    } catch (error) {
      console.error('Error al actualizar la institución:', error);
      throw error;
    }
  }

  static async delete({ id }) {
    try {
      console.log("delete")
      const [result] = await db.promise().query('DELETE FROM institucion WHERE id = ?',[id]);
      if (result.affectedRows === 0) {
        throw new Error('Institución no encontrada para eliminar');
      }
      return result;
    } catch (error) {
      if (result.affectedRows === 0) {
        console.error('Institucion no Encontrada');
      }
      console.error('Error al crear la institución:', error);
      throw error;
    }
  }
}