import authRoutes from "../routes/auth.js";
import render from "../routes/render.js";
import instRoutes from "../routes/inst.js";
import gradoRoutes from '../routes/gradoRoutes.js'
import AsignaturaRoutes from "../routes/asignaturaRoutes.js"

const router = (app) => {
    app.use("/", render)
    app.use("/", authRoutes)
    app.use("/", instRoutes)
    app.use('/', gradoRoutes)
    app.use('/', AsignaturaRoutes)
}

export default router;