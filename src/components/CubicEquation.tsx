type Props = {
  a: number;
  b: number;
  c: number;
  d: number;
};

export const CubicEquation = ({ a, b, c, d }: Props) => {
  return (
    <div className="text-center text-xl font-semibold text-cyan-400">
      {a}x³ + {b}x² + {c}x + {d} = 0
    </div>
  );
};