import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const obras = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/obras' }),
  schema: z
    .object({
      numero: z.string().regex(/^\d{3}$/, 'Número com 3 dígitos').optional(),
      nome: z.string(),
      tipo: z.enum(['mesa-pequena', 'mesa-grande', 'bancada', 'instrumento']),
      situacao: z.enum(['disponivel', 'reservada', 'adquirida', 'embreve']),
      investimento: z.number().int().positive().nullish(),
      largura_cm: z.number().positive().optional(),
      profundidade_cm: z.number().positive().optional(),
      altura_cm: z.number().positive().optional(),
      acabamento: z.string(),
      cor_mica: z.string().optional(),
      cor_resina: z.string().regex(/^#[0-9a-fA-F]{6}$/).optional(),
      fotos: z.array(z.string()).max(8).default([]),
      ordem: z.number().optional(),
      destaque: z.boolean().optional(),
    })
    .superRefine((o, ctx) => {
      if (o.situacao !== 'embreve') {
        if (!o.numero)
          ctx.addIssue({ code: 'custom', message: 'numero é obrigatório', path: ['numero'] });
        if (!o.largura_cm || !o.profundidade_cm || !o.altura_cm)
          ctx.addIssue({ code: 'custom', message: 'medidas são obrigatórias', path: ['largura_cm'] });
      }
    }),
});

export const collections = { obras };
