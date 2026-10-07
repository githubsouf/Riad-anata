import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { routes } from '@/content/routes';
import { metadataFor } from '@/lib/metadata';
import { Site, lookup } from '@/components/Site';

export const dynamicParams = false;

/** Every English route, at the original WordPress slug. */
export function generateStaticParams() {
  return routes.map((r) => ({ slug: r.en ? r.en.split('/') : [] }));
}

type Params = { slug?: string[] };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const found = lookup('en', slug);
  return found ? metadataFor('en', found.route) : {};
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const found = lookup('en', slug);
  if (!found) notFound();
  return <Site locale="en" route={found.route} />;
}
