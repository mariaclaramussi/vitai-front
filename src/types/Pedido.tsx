export type Pedido = {
  dataPedido: Date;
  dataPrevisto?: Date;
  dataCadastro?: Date;
  tipoPedido: "Exame laboratorial" | "Exame de imagem";
  status: "Pendente" | "Liberado" | "Realizado" | "Cancelado";
  codPaciente: Medico["id"];
  codMedico: Paciente["id"];
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
