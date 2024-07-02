import { ExameTipo } from "./ExameTipo";

export type ItemPedido = {
  codExameTipo: ExameTipo;
  dataRealizacao: Date;
  id: string;
  status: "Pendente" | "Liberado" | "Realizado" | "Cancelado";
};

export type Pedido = {
  id: string;
  dataPedido: Date;
  dataPrevisto?: Date;
  dataCadastro?: Date;
  tipoPedido: "Exame laboratorial" | "Exame de imagem";
  status: "Pendente" | "Liberado" | "Realizado" | "Cancelado";
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
