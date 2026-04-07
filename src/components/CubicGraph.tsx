import { useEffect, useRef } from "react";
import type { CubicValues } from "../App";

type Props = {
  values: CubicValues;
  roots: (number | string)[];
};

export const CubicGraph = ({ values, roots }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !canvas.getContext) return;

    const ctx = canvas.getContext("2d")!;
    const { a, b, c, d } = values;

    const width = canvas.width;
    const height = canvas.height;

    const scale = 20;

    ctx.clearRect(0, 0, width, height);

    ctx.strokeStyle = "#b9c7e4";

    for (let i = 0; i <= width; i += scale) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, height);
      ctx.stroke();
    }

    for (let i = 0; i <= height; i += scale) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(width, i);
      ctx.stroke();
    }

    ctx.strokeStyle = "#212732";
    ctx.lineWidth = 1;

    ctx.beginPath();
    ctx.moveTo(0, height / 2);
    ctx.lineTo(width, height / 2);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(width / 2, 0);
    ctx.lineTo(width / 2, height);
    ctx.stroke();

    ctx.strokeStyle = "#2563eb";
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = 2.5;

    ctx.beginPath();

    for (let px = 0; px <= width; px++) {
      const x = (px - width / 2) / scale;
      const y = a * x ** 3 + b * x ** 2 + c * x + d;
      const py = height / 2 - y * scale;

      if (px === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }

    ctx.stroke();

    ctx.fillStyle = "#111827";

    roots.forEach((r) => {
      if (typeof r === "number") {
        ctx.beginPath();
        ctx.arc(
          width / 2 + r * scale,
          height / 2,
          5,
          0,
          Math.PI * 2
        );
        ctx.fill();
      }
    });

  }, [values, roots]);

  return (
    <div className="bg-slate-800 p-4 rounded-xl shadow-lg flex justify-center">
      <canvas
        ref={canvasRef}
        width={800}
        height={800}
        className="border-2 border-cyan-400 rounded-lg bg-white max-w-full h-auto"
      />
    </div>
  );
};