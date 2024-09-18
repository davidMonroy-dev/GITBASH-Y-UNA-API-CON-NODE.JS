import { AsignaturaModel } from "../models/asignatura.js";

export class AsignaturaController {
    
    // Obtiene todas las asignaturas
    static async getAllAsignaturas(req, res) {
        try {
            const grado = await AsignaturaModel.getAll();
            console.log(grado);
            res.status(200).json(grado);
        } catch (error) {
            console.error('Error al obtener asignaturas:', error);
            res.status(500).json({ message: 'Error al obtener asignaturas' });
        }
    }

    // Obtiene los IDs de todas las asignaturas
    static async getAllAsignaturasID(req, res) {
        try {
            const { id } = req.params
            const asignatura = await AsignaturaModel.getId({ id });
            if (asignatura.length == 0) return res.status(200).json('No se encontro la Asignatura');
            console.log(asignatura);
            res.status(200).json(asignatura)
        } catch (error) {

        }
    };
    // Agrega una nueva asignatura
    static async createAsignatura(req, res) {
        try {
            const input = req.body;
            await AsignaturaModel.createAsignatura(input);
            res.status(201).json("Asignatura creada exitosamente");
        } catch (error) {
            console.error('Hubo un error al crear la asignatura:', error);
            res.status(500).json({ message: `Error al crear la asignatura: ${error.message}` });
        }
    }

    // Actualiza una asignatura
    static async updateAsignatura(req, res) {
        const { id } = req.params;
        const input = req.body;
        try {
            await AsignaturaModel.updateAsignatura(id, input);
            res.status(200).json("Asignatura actualizada exitosamente");
        } catch (error) {
            console.error('Error al actualizar la asignatura:', error);
            res.status(500).json({ message: `Error al actualizar la asignatura: ${error.message}` });
        }
    }

    // Elimina una asignatura
    static async deleteAsignatura(req, res) {
        const { id } = req.params;
        try {
            const result = await AsignaturaModel.deleteAsignatura(id);
            if (result === 0) {
                return res.status(404).json({ message: 'Asignatura no encontrada' });
            }
            res.status(200).json({ message: 'Asignatura eliminada con éxito' });
        } catch (error) {
            console.error('Error al eliminar la asignatura:', error);
            res.status(500).json({ message: `Error al eliminar la asignatura: ${error.message}` });
        }
    }
}
