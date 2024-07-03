export type Secao = {
  id: number;
  nome: string;
};

export type Modalidade = {
  id: number;
  nome: string;
};

export type CategoriaExame = {
  id: number;
  nome: string;
  descricao: string;
  tipoCategoria:
    | "Patologia clínica"
    | "Anatomia patológica"
    | "Exame de imagem";
  codModalidade: Modalidade["id"];
  codSecao: Secao["id"];
};
