import { Star } from './Icons';

export function Ornament({ left = false }: { left?: boolean }) {
  return (
    <div className={left ? 'ornament left' : 'ornament'}>
      <Star />
    </div>
  );
}
