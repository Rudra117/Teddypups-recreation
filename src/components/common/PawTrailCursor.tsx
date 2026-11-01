import React, { useEffect, useRef } from 'react';

// Exact mathematical paw print Path2D string from TeddyPups original design
function getPawPath(): string {
  const arc = (e: number, t: number, a: number, r: number, s: number) => {
    const i = (s * Math.PI) / 180;
    const n = Math.cos(i);
    const o = Math.sin(i);
    const l = (x: number, y: number) => `${(e + x * n - y * o).toFixed(2)} ${(t + x * o + y * n).toFixed(2)}`;
    return `M${l(a, 0)}C${l(a, 0.5523 * r)} ${l(0.5523 * a, r)} ${l(0, r)}C${l(-(0.5523 * a), r)} ${l(-a, 0.5523 * r)} ${l(-a, 0)}C${l(-a, -(0.5523 * r))} ${l(-(0.5523 * a), -r)} ${l(0, -r)}C${l(0.5523 * a, -r)} ${l(a, -(0.5523 * r))} ${l(a, 0)}Z`;
  };

  return (
    'M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5z' +
    arc(14.6, 29.2, 5.3, 6.9, -28) +
    arc(24.2, 16.6, 5.5, 7.3, -10) +
    arc(39.8, 16.6, 5.5, 7.3, 10) +
    arc(49.4, 29.2, 5.3, 6.9, 28)
  );
}

interface Footprint {
  x: number;
  y: number;
  angle: number;
  born: number;
}

export const PawTrailCursor: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Respect reduced-motion and touch devices
    if (
      typeof window === 'undefined' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !window.matchMedia('(hover: hover) and (pointer: fine)').matches
    ) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const pawPath = new Path2D(getPawPath());
    const footprints: Footprint[] = [];
    let dpr = 1;
    let animId = 0;
    let isRunning = false;
    let lastX = NaN;
    let lastY = NaN;
    let accumulatedDist = 0;
    let stepSide = 1;

    const handleResize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
    };
    handleResize();

    const render = (now: number) => {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = footprints.length - 1; i >= 0; i--) {
        const fp = footprints[i];
        const age = now - fp.born;
        if (age > 1000) {
          footprints.splice(i, 1);
          continue;
        }

        const opacity = age < 600 ? 1 : 1 - (age - 600) / 400;
        ctx.globalAlpha = 0.42 * opacity * opacity;
        ctx.setTransform(0.27 * dpr, 0, 0, 0.27 * dpr, fp.x * dpr, fp.y * dpr);
        ctx.rotate(fp.angle);
        ctx.translate(-32, -34);
        ctx.fillStyle = '#C2622B';
        ctx.fill(pawPath);
      }

      if (footprints.length > 0) {
        animId = requestAnimationFrame(render);
      } else {
        isRunning = false;
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      if (Number.isNaN(lastX)) {
        lastX = e.clientX;
        lastY = e.clientY;
        return;
      }

      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      accumulatedDist += Math.hypot(dx, dy);

      if (accumulatedDist >= 46) {
        accumulatedDist = 0;
        const angle = Math.atan2(dy, dx) + Math.PI / 2;
        stepSide = -stepSide;
        const offset = 7 * stepSide;

        footprints.push({
          x: e.clientX + Math.cos(angle) * offset + 14,
          y: e.clientY + Math.sin(angle) * offset + 16,
          angle,
          born: performance.now(),
        });

        if (footprints.length > 14) {
          footprints.shift();
        }

        if (!isRunning) {
          isRunning = true;
          animId = requestAnimationFrame(render);
        }
      }

      lastX = e.clientX;
      lastY = e.clientY;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[70] w-full h-full"
    />
  );
};
