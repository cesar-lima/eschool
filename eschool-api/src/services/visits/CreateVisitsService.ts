import prismaClient from "../../prisma";

class CreateVisitsService {
  async execute(ipVisitor: string, idNews: number) {
    const alreadyVisited = await prismaClient.visitas.findFirst({
      where: { ip_visita: ipVisitor },
    });

    if (alreadyVisited) {
      return alreadyVisited;
    }

    const visit = await prismaClient.visitas.create({
      data: {
        ip_visita: ipVisitor,
        id_noticia: idNews,
      },
    });

    return visit;
  }
}

export { CreateVisitsService };
