export type ExameTipoItem = {
  id: string;
  nome: string;
  mnemonico: string;
  unidade: string;
  valorReferencia: string;
  codSubExameTipo: SubExameTipo["id"];
};

export type SubExameTipo = {
  id: string;
  nome: string;
  codExameTipo: string;
  exameTipoItemsList: ExameTipoItem[];
};
