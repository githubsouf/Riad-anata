import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { routes } from '@/content/routes';
import { metadataFor } from '@/lib/metadata';
import { Site, lookup } from '@/components/Site';

export const dynamicParams = false;

/** Every French route, under /fr with translated slugs. */
export function generateStaticParams() {
  return routes.map((r) => ({ slug: r.fr ? r.fr.split('/') : [] }));
}

type Params = { slug?: string[] };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const found = lookup('fr', slug);
  return found ? metadataFor('fr', found.route) : {};
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const found = lookup('fr', slug);
  if (!found) notFound();
  return <Site locale="fr" route={found.route} />;
}
