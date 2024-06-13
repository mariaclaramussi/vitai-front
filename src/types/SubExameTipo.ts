type ExameTipoItems = {
    id: string,
    nome: string,
    mnemonico: string,
    unidade: string,
    valorReferencia: string,
}

export type SubExameTipo = {
    id: string,
    nome: string, 
    descricao: string,
    exameTipoItemsList: ExameTipoItems[]
}