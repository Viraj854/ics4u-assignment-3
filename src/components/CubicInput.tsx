import type { CubicValues } from "../App";

type Props = {
  values: CubicValues;
  setValues: (v: CubicValues) => void;
  onSave: () => void;
};

export const CubicInput = ({ values, setValues, onSave }: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.isFinite(e.target.valueAsNumber)
      ? e.target.valueAsNumber
      : 0;

    setValues({ ...values, [e.target.name]: value });
  };

  return (
    <div className="bg-slate-800 p-6 rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold text-cyan-400 text-center mb-6">
        Cubic Solver
      </h1>

      <div className="flex flex-col gap-4">
        {["a", "b", "c", "d"].map((label) => (
          <div key={label}>
            <label className="block text-sm font-semibold mb-1">
              {label}-value:
            </label>
            <input
              type="number"
              name={label}
              value={values[label as keyof CubicValues]}
              onChange={handleChange}
              className="w-full p-2 rounded-md border border-slate-400 bg-slate-900 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
          </div>
        ))}

        <button
          onClick={onSave}
          className="mt-4 w-full bg-cyan-400 text-slate-900 font-semibold py-2 rounded-md hover:bg-cyan-500 transition"
        >
          Solve Cubic
        </button>
      </div>
    </div>
  );
};