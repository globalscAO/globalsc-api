import { IsEmail, IsNotEmpty, Length, IsOptional } from "class-validator";

export class CreateContactDto {
  @IsNotEmpty({ message: "O nome é obrigatório." })
  @Length(2, 120, { message: "O nome deve ter entre 2 e 120 caracteres." })
  name!: string;

  @IsNotEmpty({ message: "O e-mail é obrigatório." })
  @IsEmail({}, { message: "Por favor, insira um e-mail válido." })
  email!: string;

  @IsNotEmpty({ message: "O número de telefone é obrigatório." })
  @Length(10, 15, { message: "O telefone deve ter entre 10 e 15 dígitos." })
  phone!: string;

  @IsOptional()
  @Length(2, 44, { message: "O nome da empresa deve ter entre 2 e 44 caracteres." })
  enterprise?: string;

  @IsNotEmpty({ message: "A mensagem não pode estar vazia." })
  @Length(5, 2000, { message: "A mensagem deve ter entre 5 e 2000 caracteres." })
  message!: string;
}
