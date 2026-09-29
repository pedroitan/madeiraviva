// Catálogo em JSON para o Worker de checkout (validação de preço/situação no
// servidor, sem duplicar os dados). Gerado em build → dist/api/catalogo.json.
import { getCollection } from 'astro:content';
import { slug } from '../../lib/obras';

export async function GET() {
  const obras = await getCollection('obras');
  return Response.json(
    obras.map((o) => ({
      n: slug(o),
      nome: o.data.nome,
      investimento: o.data.investimento ?? null,
      situacao: o.data.situacao,
    })),
  );
}
