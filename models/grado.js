import db from "../config/database.js"

export class GradoModel {

    static async getAll() {
        try {
            const [grado] = await db.promise().query("SELECT * FROM grado;");
            return grado;
        } catch (error) {
            console.error("Error al obtener grados:", error)
            throw error;
        }
    }

    static async createGrado({ input }) {
        const { grado } = input;
        try {
           const [result] = await db.promise().query("INSERT INTO grado (nombre) VALUES (?)",[grado]);
            return result;
        } catch (error) {
           console.error("Error al crear un grado:", error);
           throw error;
        }
    }

    static async insertGrado({ id, input }) {
        const { directorGrupo, institucion, estudiante } = input;
        try {
            const [resultGrado] = await db.promise().query('UPDATE grado SET directorGrupo = ?, institucion = ? WHERE id = ?',
                [directorGrupo, institucion, id]
            );
            
            const [resultEstudiante] = await db.promise().query("UPDATE estudiante SET grado = ? WHERE id = ?",
                [id, estudiante]
            );
    
            return { resultGrado, resultEstudiante };
        } catch (error) {
            console.error("Error al insertar el grado y estudiante:", error);
            throw error;
        }
    }
    
    static async getAllEstudiante() {
        try {
            const [estudiante] = await db.promise().query("SELECT e.id, e.usuario, u.nombres FROM estudiante e INNER JOIN usuario u on (u.id = e.usuario) ");
            return estudiante;
        } catch (error) {
            console.error("Error al obtener grados:", error)
            throw error;
        }
    }

    static async getAllProfesor() {
        try {
            const [profesor] = await db.promise().query("SELECT p.id, p.usuario, u.nombres FROM profesor p INNER JOIN usuario u on (u.id = p.usuario) ");
            return profesor;
        } catch (error) {
            console.error("Error al obtener grados:", error)
            throw error;
        }
    }
}