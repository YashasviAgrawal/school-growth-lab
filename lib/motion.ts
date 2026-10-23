"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore, type RefObject } from "react";

export const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/* ---------- reduced motion ---------- */
const RM_QUERY = "(prefers-reduced-motion: reduce)";
function subscribeRM(cb: () => void) {
  const m = window.matchMedia(RM_QUERY);
  m.addEventListener("change", cb);
  return () => m.removeEventListener("change", cb);
}
export function useReducedMotion() {
  return useSyncExternalStore(subscribeRM, () => window.matchMedia(RM_QUERY).matches, () => false);
}

/** Live result of a media query; false on the server and during hydration. */
export function useMediaQuery(query: string) {
  const subscribe = useCallback(
    (cb: () => void) => {
      const m = window.matchMedia(query);
      m.addEventListener("change", cb);
      return () => m.removeEventListener("change", cb);
    },
    [query],
  );
  return useSyncExternalStore(subscribe, () => window.matchMedia(query).matches, () => false);
}

/* ---------- one shared scroll/resize ticker for the whole page ---------- */
type FrameFn = (scrollY: number, vh: number, vw: number) => void;
const subscribers = new Set<{ current: FrameFn }>();
let queued = false;
let bound = false;
function flush() {
  queued = false;
  const y = window.scrollY;
  const vh = window.innerHeight;
  const vw = window.innerWidth;
  subscribers.forEach((s) => s.current(y, vh, vw));
}
function queue() {
  if (queued) return;
  queued = true;
  requestAnimationFrame(flush);
}

/** Runs `fn` once per animation frame while the page scrolls or resizes. Never re-renders. */
export function useScrollFrame(fn: FrameFn) {
  const ref = useRef(fn);
  ref.current = fn;
  useEffect(() => {
    const entry = ref;
    subscribers.add(entry);
    if (!bound) {
      bound = true;
      window.addEventListener("scroll", queue, { passive: true });
      window.addEventListener("resize", queue, { passive: true });
    }
    queue();
    return () => {
      subscribers.delete(entry);
    };
  }, []);
}

/**
 * Progress (0→1) of an element through the viewport.
 * `start`/`end` are viewport fractions for the element's top edge: 1 = bottom of the screen, 0 = top.
 */
export function progressOf(el: Element, vh: number, start = 1, end = 0) {
  const top = el.getBoundingClientRect().top;
  return clamp((vh * start - top) / (vh * (start - end)));
}

/** Progress (0→1) through a tall section while its child stays `position: sticky` at `top` px. */
export function stickyProgress(section: Element, sticky: HTMLElement, top: number) {
  const r = section.getBoundingClientRect();
  return clamp((top - r.top) / Math.max(1, r.height - sticky.offsetHeight));
}

/* ---------- in-view ---------- */
export function useInView<T extends Element>(
  ref: RefObject<T | null>,
  { once = true, rootMargin = "0px 0px -12% 0px", threshold = 0.15 } = {},
) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) io.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { rootMargin, threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, once, rootMargin, threshold]);
  return inView;
}

/** Calls `tick` every `ms` while `active`, pausing when the tab is hidden. */
export function useInterval(tick: () => void, ms: number, active: boolean) {
  const saved = useRef(tick);
  saved.current = tick;
  useEffect(() => {
    if (!active) return;
    const id = window.setInterval(() => {
      if (!document.hidden) saved.current();
    }, ms);
    return () => window.clearInterval(id);
  }, [ms, active]);
}
