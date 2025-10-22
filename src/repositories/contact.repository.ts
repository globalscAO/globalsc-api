import { Repository } from "typeorm";
import { Contact } from "../entities/contact.entity";
import AppDataSource from "../database/datasource";

export class ContactRepository {
  private contactRepository: Repository<Contact>;

  constructor() {
    this.contactRepository = AppDataSource.getRepository(Contact);
  }

  async create(input: Contact) {
    return await this.contactRepository.save(input);
  }

  async delete(id: string) {
    return await this.contactRepository.delete(id);
  }

  async findAll() {
    return await this.contactRepository.find({ order: { createdAt: "DESC" } });
  }

  async findById(id: string) {
    return await this.contactRepository.findOneBy({ id });
  }
}
