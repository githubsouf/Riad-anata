/** Renders a translated string that may contain inline markup (<br>, &amp;, <em>). */
export function Rich({
  as: Tag = 'p',
  html,
  className,
}: {
  as?: keyof React.JSX.IntrinsicElements;
  html: string;
  className?: string;
}) {
  const Component = Tag as React.ElementType;
  return <Component className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}
