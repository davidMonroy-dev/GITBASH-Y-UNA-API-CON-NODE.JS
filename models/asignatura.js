import db from "../config/database.js";

export class AsignaturaModel {

    // Obtiene todas las asignaturas
    static async getAll() {
        try {
            const [result] = await db.promise().query('SELECT * FROM asignatura');
            return result;
        } catch (error) {
            console.error('Error al obtener todas las asignaturas:', error);
            throw error;
        }
    }

    // Obtiene una asignatura por ID
    static async getId({ id }) {

        try {
            const [result] = await db.promise().query('SELECT * FROM asignatura WHERE id = ?', [id]);
            if (!result) return null;
            return result;
        } catch (error) {
            console.log('Hubo un error', error);
            throw error;
        }
    }

    // Crea una nueva asignatura
    static async createAsignatura(input) {
        const { nombre, profesor } = input;
        try {
            const [result] = await db.promise().query('INSERT INTO asignatura (nombre, profesor) VALUES (?, ?)', [nombre, profesor]);
            return result.insertId; // Devuelve el ID de la asignatura creada
        } catch (error) {
            console.error('Error al crear la asignatura:', error);
            throw error;
        }
    }

    // Actualiza una asignatura por ID
    static async updateAsignatura(id, input) {
        const { nombre, profesor } = input;
        try {
            const [result] = await db.promise().query('UPDATE asignatura SET nombre = ?, profesor = ? WHERE id = ?', [nombre, profesor, id]);
            return result.affectedRows; // Devuelve la cantidad de filas afectadas
        } catch (error) {
            console.error('Error al actualizar la asignatura:', error);
            throw error;
        }
    }

    // Elimina una asignatura por ID
    static async deleteAsignatura(id) {
        try {
            const [result] = await db.promise().query('DELETE FROM asignatura WHERE id = ?', [id]);
            return result.affectedRows; // Devuelve el número de filas afectadas
        } catch (error) {
            console.error('Error al eliminar la asignatura:', error);
            throw error;
        }
    }
}