import { CalificacionModel } from "../models/calificacion.js";

export class CalificacionController {
    
    // Obtiene todas las calificaciones
    static async getAllCalificacion(req, res) {
        try {
            const calificaciones = await CalificacionModel.getAll();
            console.log(calificaciones);
            res.status(200).json(calificaciones);
        } catch (error) {
            console.error('Error al obtener calificaciones:', error);
            res.status(500).json({ message: 'Error al obtener calificaciones' });
        }
    }

    // Obtiene una calificación por ID
    static async getAllCalificacionID(req, res) {
        try {
            const { id } = req.params;
            const calificacion = await CalificacionModel.getId(id);
            if (calificacion.length == 0) return res.status(200).json('No se encontró la calificación');
            console.log(calificacion);
            res.status(200).json(calificacion);
        } catch (error) {
            console.error('Error al obtener calificación:', error);
            res.status(500).json({ message: 'Error al obtener la calificación' });
        }
    }

    // Agrega una nueva calificación
    static async createCalificacion(req, res) {
        try {
            const input = req.body;
            await CalificacionModel.createCalificacion(input);
            res.status(201).json("Calificación creada exitosamente");
        } catch (error) {
            console.error('Error al crear la calificación:', error);
            res.status(500).json({ message: `Error al crear la calificación: ${error.message}` });
        }
    }

    // Actualiza una calificación
    static async updateCalificacion(req, res) {
        const { id } = req.params;
        const input = req.body;
        try {
            await CalificacionModel.updateCalificacion(id, input);
            res.status(200).json("Calificación actualizada exitosamente");
        } catch (error) {
            console.error('Error al actualizar la calificación:', error);
            res.status(500).json({ message: `Error al actualizar la calificación: ${error.message}` });
        }
    }

    // Elimina una calificación
    static async deleteCalificacion(req, res) {
        const { id } = req.params;
        try {
            const result = await CalificacionModel.deleteCalificacion(id);
            if (result === 0) {
                return res.status(404).json({ message: 'Calificación no encontrada' });
            }
            res.status(200).json({ message: 'Calificación eliminada con éxito' });
        } catch (error) {
            console.error('Error al eliminar la calificación:', error);
            res.status(500).json({ message: `Error al eliminar la calificación: ${error.message}` });
        }
    }
}


