import { useState } from "react";
import { CubicInput } from "./components/CubicInput";
import { CubicEquation } from "./components/CubicEquation";
import { CubicTable } from "./components/CubicTable";
import { CubicGraph } from "./components/CubicGraph";
import { CubicHistory } from "./components/CubicHistory";

export type CubicValues = { a: number; b: number; c: number; d: number };

export default function App() {
  const [values, setValues] = useState<CubicValues>({ a: 1, b: 0, c: 0, d: 0 });
  const [history, setHistory] = useState<CubicValues[]>([]);

  const solveCubic = () => {
    const { a, b, c, d } = values;

    if (a === 0) {
      return { p: 0, q: 0, delta: 0, roots: ["Error: a=0"] };
    }

    const p = (3 * a * c - b * b) / (3 * a * a);
    const q =
      (27 * a * a * d - 9 * a * b * c + 2 * b * b * b) /
      (27 * a * a * a);
    const delta = (q / 2) ** 2 + (p / 3) ** 3;

    const epsilon = 1e-10;
    const h = -b / (3 * a);

    let roots: (number | string)[] = [];

    if (delta < -epsilon) {
      const k = 2 * Math.sqrt(-p / 3);
      const denom = 2 * Math.sqrt(Math.pow(-p / 3, 3));
      const value = -q / denom;
      const clamped = Math.max(-1, Math.min(1, value));
      const theta = (1 / 3) * Math.acos(clamped);

      roots = [
        k * Math.cos(theta) + h,
        k * Math.cos(theta + (2 * Math.PI) / 3) + h,
        k * Math.cos(theta + (4 * Math.PI) / 3) + h,
      ];
    } else if (delta > epsilon) {
      const u = Math.cbrt(-q / 2 + Math.sqrt(delta));
      const v = Math.cbrt(-q / 2 - Math.sqrt(delta));
      roots = [u + v + h, "Complex", "Complex"];
    } else {
      const u = Math.cbrt(-q / 2);
      roots = [2 * u + h, -u + h, -u + h];
    }

    return { p, q, delta, roots };
  };

  const results = solveCubic();

  return (
    <div className="min-h-screen bg-slate-900 text-slate-50 flex justify-center p-5">
      <main className="w-full max-w-4xl space-y-6">
        <CubicInput
          values={values}
          setValues={setValues}
          onSave={() => setHistory([...history, values])}
        />

        <CubicEquation {...values} />

        <CubicTable
          p={results.p}
          q={results.q}
          delta={results.delta}
          roots={results.roots}
        />

        <CubicGraph values={values} roots={results.roots} />

        <CubicHistory
          history={history}
          onSelect={(v) => setValues(v)}
        />
      </main>
    </div>
  );
}