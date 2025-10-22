import { Router } from "express";
import { CreateContactDto } from "../dtos/contact.dto";
import contactController from "../controllers/contact.controller";
import { validationMiddleware } from "../middleware/validation.middleware";

const router = Router();

router.get("/", contactController.list);
router.post(
  "/",
  validationMiddleware(CreateContactDto),
  contactController.create
);

export default router;
