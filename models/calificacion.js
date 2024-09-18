import db from "../config/database.js";


export class CalificacionModel {
    
    // Obtiene todas las calificaciones
    static async getAll() {
        const query = 'SELECT * FROM calificacion';
        try {
            const [rows] = await pool.query(query);
            return rows;
        } catch (error) {
            console.error('Error al obtener todas las calificaciones:', error);
            throw error;
        }
    }

    // Obtiene una calificación por su ID
    static async getId(id) {
        const query = 'SELECT * FROM calificacion WHERE id = ?';
        try {
            const [rows] = await pool.query(query, [id]);
            return rows;
        } catch (error) {
            console.error('Error al obtener la calificación por ID:', error);
            throw error;
        }
    }

    // Crea una nueva calificación
    static async createCalificacion(data) {
        const { actividad, estudiante, nota, fechaNota, comentarios } = data;
        const query = 'INSERT INTO calificacion (actividad, estudiante, nota, fechaNota, comentarios) VALUES (?, ?, ?, ?, ?)';
        try {
            const [result] = await pool.query(query, [actividad, estudiante, nota, fechaNota, comentarios]);
            return result;
        } catch (error) {
            console.error('Error al crear una nueva calificación:', error);
            throw error;
        }
    }

    // Actualiza una calificación por su ID
    static async updateCalificacion(id, data) {
        const { actividad, estudiante, nota, fechaNota, comentarios } = data;
        const query = 'UPDATE calificacion SET actividad = ?, estudiante = ?, nota = ?, fechaNota = ?, comentarios = ? WHERE id = ?';
        try {
            const [result] = await pool.query(query, [actividad, estudiante, nota, fechaNota, comentarios, id]);
            return result;
        } catch (error) {
            console.error('Error al actualizar la calificación:', error);
            throw error;
        }
    }

    // Elimina una calificación por su ID
    static async deleteCalificacion(id) {
        const query = 'DELETE FROM calificacion WHERE id = ?';
        try {
            const [result] = await pool.query(query, [id]);
            return result.affectedRows; // Devuelve el número de filas afectadas
        } catch (error) {
            console.error('Error al eliminar la calificación:', error);
            throw error;
        }
    }
}
