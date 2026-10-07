import '../globals.css';
import { RootShell, baseMetadata, viewport } from '@/lib/rootLayout';

export const metadata = baseMetadata;
export { viewport };

export default function FrLayout({ children }: { children: React.ReactNode }) {
  return <RootShell lang="fr">{children}</RootShell>;
}
