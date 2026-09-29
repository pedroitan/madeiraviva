import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { obras } from '@/lib/data/obras'
import { ObraDetail } from './obra-detail'

export async function generateStaticParams() {
  return obras.map((o) => ({ slug: o.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const obra = obras.find((o) => o.slug === slug)
  return {
    title: `${obra?.nome ?? 'Obra'} · Madeira Viva`,
    description: obra?.descricao.slice(0, 160),
  }
}

export default async function ObraPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const obra = obras.find((o) => o.slug === slug)
  if (!obra) notFound()

  return <ObraDetail obra={obra} />
}
