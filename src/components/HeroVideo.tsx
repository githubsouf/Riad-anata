'use client';
import { useRef, useState } from 'react';
import { mediaUrl } from '@/lib/media';
import { SoundOn, SoundOff } from './Icons';

export function HeroVideo({
  video,
  poster,
  audio,
  soundLabel,
}: {
  video: string;
  poster: string;
  audio: string;
  soundLabel: string;
}) {
  const ref = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    const el = ref.current;
    if (!el) return;
    if (el.paused) {
      el.volume = 0.45;
      void el.play().catch(() => undefined);
      setPlaying(true);
    } else {
      el.pause();
      setPlaying(false);
    }
  };

  return (
    <>
      <div className="hero__media">
        <video poster={mediaUrl(poster)} autoPlay muted loop playsInline preload="metadata">
          <source src={mediaUrl(video)} type="video/mp4" />
        </video>
      </div>
      <audio ref={ref} src={mediaUrl(audio)} loop preload="none" />
      <button className="hero__sound" onClick={toggle} aria-label={soundLabel} aria-pressed={playing}>
        {playing ? <SoundOn /> : <SoundOff />}
      </button>
    </>
  );
}
