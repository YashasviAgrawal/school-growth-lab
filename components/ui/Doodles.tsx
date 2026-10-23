/* Hand-drawn line doodles in the spirit of wajo.ai, themed for schools. */
type P = { className?: string };

const S = ({ className, children, vb = "0 0 64 64" }: P & { children: React.ReactNode; vb?: string }) => (
  <svg viewBox={vb} className={`doodle ${className ?? ""}`} aria-hidden="true">
    {children}
  </svg>
);

export const DoodleCap = (p: P) => (
  <S {...p}>
    <path d="M5 24.5 32 12l27 12.5L32 37z" />
    <path d="M17 30.5V41c0 6 30 6 30 0V30.5" />
    <path d="M58.5 25v14" />
    <path d="M56 40c0 3 5 3 5 0s-5-3-5 0z" />
  </S>
);

export const DoodleBus = (p: P) => (
  <S {...p} vb="0 0 72 56">
    <rect x="8" y="6" width="56" height="34" rx="8" />
    <path d="M14 13h12v10H14zM30 13h12v10H30zM46 13h12v10H46zM8 30h56M57 34h2" />
    <circle cx="21" cy="42" r="5.5" fill="#fff" />
    <circle cx="51" cy="42" r="5.5" fill="#fff" />
    <path d="M1 18l4 1M1 25h5" />
  </S>
);

export const DoodlePencil = (p: P) => (
  <S {...p}>
    <path d="M13 51l4-13L43 12l9 9-26 26z" />
    <path d="M17 38l9 9M39 16l9 9M13 51l5-1.5" />
    <path d="M48 52c3 1.5 7 .5 9-3" />
  </S>
);

export const DoodleBell = (p: P) => (
  <S {...p}>
    <path d="M19 43c1-4 3-6 3-16a10 10 0 0 1 20 0c0 10 2 12 3 16z" />
    <path d="M15 43h34M28 47a4 4 0 0 0 8 0M32 17v-4" />
    <path d="M8 24l-4-2M8 30H3M56 24l4-2M56 30h5" />
  </S>
);

export const DoodleMail = (p: P) => (
  <S {...p}>
    <rect x="5" y="22" width="40" height="28" rx="4" />
    <path d="M6 24l19 14 19-14" />
    <path d="M42 15c6-6 14-4 15 3" />
    <path d="M51 10l7 7-8 3" />
  </S>
);

export const DoodleBook = (p: P) => (
  <S {...p}>
    <path d="M32 19c-6-4-14-5-23-3v32c9-2 17-1 23 3 6-4 14-5 23-3V16c-9-2-17-1-23 3z" />
    <path d="M32 19v32M15 25c4-1 8-1 11 1M15 32c4-1 8-1 11 1M38 26c3-2 7-2 11-1M38 33c3-2 7-2 11-1" />
  </S>
);

export const DoodleArrow = (p: P) => (
  <S {...p} vb="0 0 48 40">
    <path d="M44 8C30 6 16 14 10 32" />
    <path d="M5 24l5 8 8-5" />
  </S>
);

export const DoodleSpark = (p: P) => (
  <S {...p}>
    <path d="M32 8v14M32 42v14M8 32h14M42 32h14M15 15l9 9M40 40l9 9M49 15l-9 9M24 40l-9 9" />
  </S>
);
