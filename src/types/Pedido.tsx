import { ExameTipo } from "./ExameTipo";

export type StatusPedido = "pendente" | "liberado" | "realizado" | "cancelado";
export type ItemPedido = {
  codExameTipo: ExameTipo;
  dataRealizacao: Date;
  id: string;
  status: StatusPedido;
};

export type Pedido = {
  id: string;
  dataPedido: Date;
  dataPrevisto?: Date;
  dataCadastro?: Date;
  tipoPedido: "Exame laboratorial" | "Exame de imagem";
  status: StatusPedido;
  paciente: Paciente;
  medico: Medico;
  pedidosItensList?: ItemPedido[];
};

export type Medico = {
  id: string;
  nome: string;
  crm: string;
  UF: string;
  hospital: boolean;
};

export type Paciente = {
  id: string;
  nome: string;
  numeroPulseira: number;
};
