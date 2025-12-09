import { Request, Response } from 'express';

// Cards
interface Treino {
  titulo: string;
  descricao: string;
  imagem: string;
  id: string;
}

export const home = (req: Request, res: Response): void => {
  const treinos: Treino[] = [
    { titulo: "Mat Pilates", descricao: "Realizado no chão com um colchonete, usando o peso do próprio corpo e acessórios como bola suíça, elásticos e círculo mágico.", imagem: "/img/card1.jpg", id: "mat-pilates"},
    { titulo: "Reformer Pilates", descricao: "Utiliza equipamentos de alto nível que oferecem resistência com molas, permitindo maior variedade e intensidade de exercícios.", imagem: "/img/card2.jpg", id: "reformer-pilates"},
    { titulo: "Pilates para Melhor Idade", descricao: "Estimula mobilidade, equilíbrio e bem-estar com exercícios leves e funcionais, adaptados ao ritmo da terceira idade.", imagem: "/img/card3.jpg", id: "idoso-pilates"}
  ];

  res.render('index', { treinos });
};
