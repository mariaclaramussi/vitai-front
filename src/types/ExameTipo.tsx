import { SubExameTipo } from "./SubExameTipo";

export type Material = {
  id: number;
  nome: string;
  qtdMaxima: number;
};

export type Metodo = {
  id: number;
  nome: string;
};

export type ExameTipo = {
  id: number;
  nome: string;
  descricao: string;
  prazoExecucao: number;
  codCategoria: number;
  mnemonico: string;
  intervaloPedidos: number;
  exigeLaudo: boolean;
  necessitaPreparo: boolean;
  dataExclusao: Date;
  codTipoMaterial: number;
  codTipoMetodo: number;
  subExamesTipoList: SubExameTipo[];
};
