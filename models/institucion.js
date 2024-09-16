import db from "../config/database.js";

export class InstModel {

static async getAll() {
  try {
    console.log('getAll');
    const [institucion] = await db.promise().query('SELECT * FROM institucion'); 
    return institucion;
  } catch (error) {
    console.error('Error al obtener instituciones:', error); // Log completo del error
    throw error; // Lanza el error para que sea capturado en el controlador
  }
}

static async getById(id) {
  if (!id) throw new Error('ID no proporcionado');

  try {
      // Asegúrate de que `db.query()` devuelva una promesa y utilice await
      const [institucion] = await db.query('SELECT * FROM instituciones WHERE id = ?', [id]);

      // Verifica si se encontró la institución
      if (!institucion || institucion.length === 0) {
          return null;
      }

      return institucion[0]; // Retorna la primera institución encontrada
  } catch (error) {
      console.error('Error al obtener la institución por ID:', error);
      throw error; // Lanza el error para manejarlo en niveles superiores
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

  // Actualizar una película por ID
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