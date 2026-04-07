type Props = {
  p: number;
  q: number;
  delta: number;
  roots: (number | string)[];
};

export const CubicTable = ({ p, q, delta, roots }: Props) => (
  <div className="bg-slate-800 p-6 rounded-xl shadow-lg">
    <h2 className="text-center text-2xl text-cyan-400 mb-4">
      Results
    </h2>

    <table className="w-full border-collapse table-fixed">
      <tbody>
        {[
          { l: "p", v: p },
          { l: "q", v: q },
          { l: "Discriminant", v: delta },
        ].map((item) => (
          <tr key={item.l} className="border-b border-slate-400">
            <td className="py-2 text-left font-semibold">
              {item.l}
            </td>
            <td className="py-2 text-right">
              {item.v.toFixed(4)}
            </td>
          </tr>
        ))}

        <tr className="text-slate-400">
          <td className="pt-4 text-left font-semibold">
            Value
          </td>
          <td className="pt-4 text-right font-semibold">
            x
          </td>
        </tr>

        {roots.map((r, i) => (
          <tr key={i} className="border-b border-slate-400">
            <td className="py-2 text-left font-semibold">
              Root {i + 1}
            </td>
            <td className="py-2 text-right">
              {typeof r === "number" ? r.toFixed(2) : r}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);