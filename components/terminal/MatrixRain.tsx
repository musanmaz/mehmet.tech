"use client";

import { useEffect, useRef, useState } from "react";

const GLYPHS = "アイウエオカキクケコサシスセソタチツテトナニヌネノ0123456789$#@%&*<>/\\|";
const DURATION = 9000;

export function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [running, setRunning] = useState(true);

  useEffect(() => {
    if (!running) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const styles = getComputedStyle(canvas);
    const head = styles.getPropertyValue("--term-accent").trim() || "#39ff14";
    const trail = styles.getPropertyValue("--term-dim").trim() || "#2a5c2a";
    const background = styles.getPropertyValue("--term-bg").trim() || "#000000";

    const ratio = window.devicePixelRatio || 1;
    const fontSize = 14;
    let columns = 0;
    let drops: number[] = [];

    const resize = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      context.font = `${fontSize}px var(--font-geist-mono), monospace`;
      columns = Math.ceil(width / fontSize);
      drops = Array.from({ length: columns }, () =>
        Math.floor((Math.random() * height) / fontSize) * -1,
      );
      context.fillStyle = background;
      context.fillRect(0, 0, width, height);
    };

    resize();
    window.addEventListener("resize", resize);

    let frame = 0;
    let raf = 0;
    const render = () => {
      raf = requestAnimationFrame(render);
      frame += 1;
      if (frame % 2 !== 0) return;

      const width = canvas.clientWidth;
      const height = canvas.clientHeight;

      context.fillStyle = `color-mix(in srgb, ${background} 78%, transparent)`;
      context.fillRect(0, 0, width, height);

      for (let i = 0; i < columns; i += 1) {
        const glyph = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        const y = drops[i] * fontSize;
        context.fillStyle = Math.random() > 0.85 ? head : trail;
        context.fillText(glyph, i * fontSize, y);
        if (y > height && Math.random() > 0.975) drops[i] = 0;
        drops[i] += 1;
      }
    };

    render();
    const timer = window.setTimeout(() => setRunning(false), DURATION);

    return () => {
      window.clearTimeout(timer);
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [running]);

  if (!running) {
    return (
      <div style={{ color: "var(--term-dim)" }}>
        connection to the construct closed.
      </div>
    );
  }

  return (
    <canvas
      ref={canvasRef}
      onClick={() => setRunning(false)}
      className="my-2 h-[220px] w-full cursor-pointer rounded-md border"
      style={{
        borderColor: "var(--term-selection)",
        backgroundColor: "var(--term-bg)",
      }}
    />
  );
}
