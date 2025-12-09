import { Request, Response } from 'express';

// Cards
interface Pessoa {
  titulo: string;
  descricao: string;
  imagem: string;
}

export const comentarios = (req: Request, res: Response): void => {
  const pessoas: Pessoa[] = [
    { titulo: "Laura Rodrigues", descricao: "\"O Harmonia Studio transformou minha saúde física e mental. Nunca me senti tão bem!\"", imagem: "/img/pessoa1.jpg"},
    { titulo: "Antônio Nascimento", descricao: "\"Comecei com dores e hoje me sinto renovado. Pilates no Harmonia mudou minha vida!\"", imagem: "/img/pessoa2.jpg"},
    { titulo: "Maria Aparecida", descricao: "\"No Harmonia Studio encontrei mais do que exercício — encontrei qualidade de vida!\"", imagem: "/img/pessoa3.jpg"},
  ];

  res.render('agendarAula', { pessoas });
};
