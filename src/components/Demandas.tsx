
import { Plus } from "lucide-react";

export interface Demanda {
  id: string;
  materia: string;
  demandado: string;
  segundoDemandado: string;
  cuantia: string;
}
interface Props {
  demandas: Demanda[];
  setDemandas: (d: Demanda[]) => void;
}
export default function Demandas({ demandas, setDemandas }: Props) {
  function agregar() {
    setDemandas([
      ...demandas,
      {
        id: "",
        materia: "",
        demandado: "",
        segundoDemandado: "",
        cuantia: "",
      },
    ]);
  }
  function cambiar(i: number, campo: keyof Demanda, valor: string) {
    const next = [...demandas];
    next[i][campo] = valor;
    setDemandas(next);
  }
  function eliminar(i: number) {
    setDemandas(demandas.filter((_, idx) => idx !== i));
  }

  return (
    <div className="rounded-2xl shadow-lg bg-gradient-to-tr from-azul-900 via-azul-800 to-naranja-500 p-1 animate-fade-in">
      <div className="rounded-2xl bg-white p-8 font-montserrat">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-azul-900">Demandas</h2>
          <button
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-naranja-500 font-semibold text-white hover:bg-azul-800 transition hover:scale-105 shadow"
            onClick={agregar}
            type="button"
            aria-label="Agregar Demanda"
          >
            <Plus size={18} />
            Agregar Demanda
          </button>
        </div>
        <div className="flex flex-col gap-6">
          {demandas.length === 0 && (
            <div className="text-muted-foreground italic text-sm py-10 text-center">No hay demandas registradas.</div>
          )}
          {demandas.map((d, i) => (
            <div key={i} className="p-6 rounded-lg border border-azul-900/20 bg-slate-50 relative mb-2 shadow-sm">
              <button
                type="button"
                className="absolute top-2 right-2 text-azul-900 bg-naranja-500/20 hover:bg-naranja-500/50 rounded-full px-2 py-1 text-xs font-bold"
                onClick={() => eliminar(i)}
                title="Eliminar demanda"
              >
                ×
              </button>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div>
                  <label className="font-semibold text-azul-800">ID</label>
                  <input
                    type="text"
                    className="mt-1 w-full rounded-lg border border-azul-800/20 px-3 py-2"
                    value={d.id}
                    onChange={e => cambiar(i, "id", e.target.value)}
                  />
                </div>
                <div>
                  <label className="font-semibold text-azul-800">Materia</label>
                  <input
                    type="text"
                    className="mt-1 w-full rounded-lg border border-azul-800/20 px-3 py-2"
                    value={d.materia}
                    onChange={e => cambiar(i, "materia", e.target.value)}
                  />
                </div>
                <div>
                  <label className="font-semibold text-azul-800">Demandado</label>
                  <select
                    className="mt-1 w-full rounded-lg border border-azul-800/20 px-3 py-2 bg-white"
                    value={d.demandado}
                    onChange={e => cambiar(i, "demandado", e.target.value)}
                  >
                    <option value="">Seleccionar…</option>
                    <option value="Sí">Sí</option>
                    <option value="No">No</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-azul-800">Segundo Demandado</label>
                  <input
                    type="text"
                    className="mt-1 w-full rounded-lg border border-azul-800/20 px-3 py-2"
                    value={d.segundoDemandado}
                    onChange={e => cambiar(i, "segundoDemandado", e.target.value)}
                  />
                </div>
                <div>
                  <label className="font-semibold text-azul-800">Cuantía</label>
                  <input
                    type="text"
                    className="mt-1 w-full rounded-lg border border-azul-800/20 px-3 py-2"
                    value={d.cuantia}
                    onChange={e => cambiar(i, "cuantia", e.target.value)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
