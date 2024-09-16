import { InstModel } from "../models/institucion.js";
import { AuthModel } from "../models/usuario.js";
import { GradoModel } from "../models/grado.js";

export class InstController {
  static async AdminPage(req, res, next) {
    try {
      const message = req.query.message;

      const institucion = await InstModel.getAll();

      const user = await AuthModel.getAll();

      const grado = await GradoModel.getAll();

      const estudiante = await GradoModel.getAllEstudiante();
      
      const profesor = await GradoModel.getAllProfesor();

      if (!user) {
        return res
          .status(404)
          .render("admin", { message: "usuario no encontrada" });
      }

      if (!institucion) {
        return res
          .status(404)
          .render("admin", { message: "Institución no encontrada" });
      }

      if (!grado) {
        return res
          .status(404)
          .render("admin", { message: "grado no encontrada" });
      }

      res.render("admin", { institucion, user, grado, estudiante, profesor, message });
    } catch (error) {
      console.error("Error al obtener usuario:", error);
      res
        .status(500)
        .json({ message: `Error al obtener usuario: ${error.message}` });
    }
  }

  static async createInst(req, res) {
    try {
      const input = req.body;

      if (!input || Object.keys(input).length === 0) {
        return res
          .status(400)
          .json({ message: "Los datos de entrada son inválidos" });
      }

      await InstModel.create({ input });

      res.redirect("/admin?message=Institución creada exitosamente");
    } catch (error) {
      console.error("Error al obtener instituciones:", error);
      res
        .status(500)
        .json({ message: `Error al obtener instituciones: ${error.message}` });
    }
  }

  // Controlador para actualizar una institución
  static async updateInst(req, res) {
    try {
      // Obtener el ID de la institución desde el cuerpo de la solicitud
      const institucionId = req.body["institucion-id"]; // Leer el ID del cuerpo de la solicitud
      const input = req.body; // Leer el resto de los datos

      // Verificar si el ID y los datos de entrada están presentes
      console.log("ID de Institución:", institucionId);
      console.log("Datos de Entrada:", input);

      if (!institucionId || !input || Object.keys(input).length === 0) {
        return res
          .status(400)
          .json({ message: "Los datos de entrada son inválidos" });
      }

      // Actualizar la institución en la base de datos
      const result = await InstModel.update({ id: institucionId, input });

      if (!result) {
        return res
          .status(404)
          .json({ message: "Institución no encontrada para actualizar" });
      }

      res.redirect(`/admin?message=Institución actualizada exitosamente`);
    } catch (error) {
      console.error("Error al actualizar institución:", error);
      res.redirect(
        `/admin?message=Error al actualizar institución: ${error.message}`
      );
    }
  }

  static async deleteInst(req, res) {
    try {
      const { id } = req.params;
      const result = await InstModel.delete({ id });

      if (!result) {
        return res
          .status(404)
          .json({ message: "Institución no encontrada para eliminar" });
      }

      res.status(200).json({ message: "Institucion Eliminada Exitosamente" });
    } catch (error) {
      console.error("Error al eliminar una institucion:", error);
      res.status(500).json({
        message: `Error al eliminar una institucion: ${error.message}`,
      });
    }
  }
}
