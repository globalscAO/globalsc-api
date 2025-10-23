import { Repository } from "typeorm";
import { CreateContactDto } from "../dtos/contact.dto";
import { ContactRepository } from "../repositories/contact.repository";
import { Contact } from "../entities/contact.entity";
import { Resend } from "resend";

export class ContactService {
  private contactRepository: ContactRepository;
  private resend: Resend;

  constructor() {
    this.contactRepository = new ContactRepository();
    this.resend = new Resend(process.env.RESEND_API_KEY);
  }

  async create(input: CreateContactDto): Promise<Contact> {
    const contact = new Contact();

    contact.name = input.name;
    contact.email = input.email;
    contact.enterprise = input.enterprise ?? "";
    contact.message = input.message;
    contact.phone = input.phone;

    const newContact = await this.contactRepository.create(contact);

    await this.sendEmailNotification(newContact);

    return newContact;
  }

  async list() {
    return this.contactRepository.findAll();
  }

  private async sendEmailNotification(contact: Contact) {
    try {
      await this.resend.emails.send({
        from: "Global Services Corporation <comercial@globalsc.ao>",
        to: ["joelpitra44@gmail.com"],
        subject: "Novo contato recebido pelo site",
        html: `
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f6f8; padding: 0;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; font-family: Arial, Helvetica, sans-serif;">
              <tr>
                <td style="text-align: center;">
                  <img src="https://globalsc.ao/logo-email.png" alt="Global Services Corporation" style="width: 100%; object-fit: contain;" />
                </td>
              </tr>
              <tr>
                <td style="padding: 32px;">
                  <p style="color: #333; font-size: 15px;">Um novo visitante preencheu o formulário no site da <strong>Global Services Corporation</strong>.</p>
                  <hr style="border: none; border-top: 1px solid #ddd; margin: 24px 0;" />
                  
                  <p style="margin: 8px 0;"><strong>Nome:</strong> ${
                    contact.name
                  }</p>
                  <p style="margin: 8px 0;"><strong>Email:</strong> ${
                    contact.email
                  }</p>
                  ${
                    contact.enterprise
                      ? `<p style="margin: 8px 0;"><strong>Empresa:</strong> ${contact.enterprise}</p>`
                      : ""
                  }
                  <p style="margin: 8px 0;"><strong>Telefone:</strong> ${
                    contact.phone || "—"
                  }</p>

                  <p style="margin-top: 16px;"><strong>Mensagem:</strong></p>
                  <div style="background-color: #f0f4f9; padding: 12px 16px; border-left: 4px solid #006eeb; color: #333; border-radius: 4px;">
                    ${contact.message}
                  </div>

                  <hr style="border: none; border-top: 1px solid #ddd; margin: 32px 0;" />
                  <p style="font-size: 12px; color: #777;">Este é um e-mail automático do sistema de contatos do site.</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
      `,
      });

      await this.resend.emails.send({
        from: "Global Services Corporation <comercial@globalsc.ao>",
        to: [contact.email],
        subject: "Recebemos a sua mensagem",
        html: `
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f6f8; padding: 0;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; font-family: Arial, Helvetica, sans-serif;">
              <tr style="background-color: #0077ff;">
                <td style="text-align: center;">
                  <img src="https://globalsc.ao/logo-email.png" alt="Global Services Corporation" style="width: 100%; object-fit: contain;" />
                </td>
              </tr>
              <tr>
                <td style="padding: 32px;">
                  <p style="color: #333; font-size: 15px;">Olá, Sr.(a) <strong>${
                    contact.name
                  }</strong>${
          contact.enterprise ? ` da <strong>${contact.enterprise}</strong>` : ""
        },</p>
                  
                  <p style="color: #333; font-size: 15px;">Agradecemos por entrar em contacto com a <strong>Global Services Corporation</strong>.</p>
                  <p style="color: #333; font-size: 15px;">Confirmamos o recebimento da sua mensagem. A nossa equipa irá analisá-la e retornaremos em breve através do e-mail ou telefone fornecido.</p>
                  
                  <p style="margin-top: 32px; color: #333; font-size: 15px;">
                    <em>Atenciosamente,</em><br/>
                    <strong>Global Services Corporation</strong><br/>
                    <a href="https://globalsc.ao" style="color: #0077ff; text-decoration: none;">www.globalsc.ao</a>
                  </p>

                  <hr style="border: none; border-top: 1px solid #ddd; margin: 32px 0;" />
                  <p style="font-size: 12px; color: #777;">Este é um e-mail automático. Por favor, não responda diretamente.</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
      `,
      });
    } catch (error) {
      console.error("Erro ao enviar email via Resend:", error);
    }
  }
}
