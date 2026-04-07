import type { CubicValues } from "../App";

export const CubicHistory = ({
  history,
  onSelect,
}: {
  history: CubicValues[];
  onSelect: (v: CubicValues) => void;
}) => (
  <div className="bg-slate-800 rounded-xl shadow-lg overflow-hidden">
    <div className="bg-slate-700 text-cyan-400 p-4 font-bold text-center">
      Saved Cubics
    </div>

    <table className="w-full text-left">
      <thead className="text-slate-400 text-sm">
        <tr>
          <th className="p-3">a</th>
          <th className="p-3">b</th>
          <th className="p-3">c</th>
          <th className="p-3">d</th>
          <th className="p-3 text-center">Action</th>
        </tr>
      </thead>

      <tbody>
        {history.map((item, index) => (
          <tr key={index} className="border-t border-slate-600">
            <td className="p-3">{item.a}</td>
            <td className="p-3">{item.b}</td>
            <td className="p-3">{item.c}</td>
            <td className="p-3">{item.d}</td>
            <td className="p-3 text-center">
              <button
                onClick={() => onSelect(item)}
                className="bg-cyan-400 text-slate-900 px-3 py-1 rounded hover:bg-cyan-500"
              >
                Load
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    {history.length === 0 && (
      <div className="p-4 text-center text-slate-400">
        No history yet
      </div>
    )}
  </div>
);