import { GradoModel } from "../models/grado.js";
import { InstModel } from "../models/institucion.js";

export class GradoController {
    
    static async getAllGrado(req, res) {
        try { 
            const gradoGet = await GradoModel.getAll();
            res.status(200).json(gradoGet)
        }
        catch (error) {
            console.error("Error al obtener grado:", error);
            res.status(500).json({ message: `Error al obetener un usuario ${error.message}` })
        }
    }

    static async createGrado(req, res) {
        try {
            const input = req.body;
            await GradoModel.createGrado({ input });

            if (!input) {
                return res.status(400).json({ message: `Error al crear la institucion`})
            } else {
                res.redirect("/admin?message=Grado creado exitosamente")
            }
        } catch (error) {
            console.error('Error al obtener grados:', error);
            res.status(500).json({ message: `Error al obtener grado: ${error.message}`})
        }
    }

    static async getGrado(req, res) {
        try {
            const gradoId = req.body["grado"]
            const input = req.body;

            console.log("ID de Institución:", gradoId);
            console.log("Datos de Entrada:", input);

            const GradoInsert = await GradoModel.insertGrado({ id: gradoId, input });

            if (!input) return res.status(400).json({ message: `Error al crear la institucion`});

            res.redirect("/admin?message=Grado asignado exitosamente")
        } catch (error) {
            console.error('Error al obtener grados:', error);
            res.status(500).json({ message: `Error al obtener grado: ${error.message}`})
        }
    }

    static async getGradoEstudiante(req, res) {
        try {
            const input = req.body;
            const GradoInsertEstudiante = await GradoModel.insertGradoEstudiante({ input });

            if (!input) return res.status(400).json({ message: `Error al crear la institucion`});
            
            res.status(200).json(GradoInsertEstudiante)

        } catch (error) {
            console.error('Error al obtener grados:', error);
            res.status(500).json({ message: `Error al obtener grado: ${error.message}`})
        }
    }
}