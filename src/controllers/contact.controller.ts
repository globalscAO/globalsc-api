import { Request, Response, NextFunction } from "express";
import { ContactService } from "../services/contact.service";

class ContactController {
  private contactService: ContactService;

  constructor() {
    this.contactService = new ContactService();
  }

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.contactService.create(req.body);

      return res.status(201).json({
        success: true,
        message: "Contato criado e e-mail enviado com sucesso",
        data: result,
      });
    } catch (err: any) {
      console.error("Erro no ContactController.create:", err);

      return res.status(500).json({
        success: false,
        message: "Ocorreu um erro ao criar o contato ou enviar o e-mail.",
        error: err.message || err,
      });
    }
  };

  list = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const list = await this.contactService.list();

      return res.status(200).json({
        success: true,
        data: list,
      });
    } catch (err: any) {
      console.error("Erro no ContactController.list:", err);

      return res.status(500).json({
        success: false,
        message: "Ocorreu um erro ao listar os contatos.",
        error: err.message || err,
      });
    }
  };
}

export default new ContactController();
