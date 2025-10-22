import { Router } from "express";
import contactRoutes from "./contact.routes";

const routes = Router();

routes.use("/contact", contactRoutes);

export default routes;
