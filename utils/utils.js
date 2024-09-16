import authRoutes from "../routes/auth.js";
import render from "../routes/render.js";
import instRoutes from "../routes/inst.js";
import gradoRoutes from '../routes/gradoRoutes.js'

const router = (app) => {
    app.use("/", render)
    app.use("/", authRoutes)
    app.use("/", instRoutes)
    app.use('/', gradoRoutes)
}

export default router;