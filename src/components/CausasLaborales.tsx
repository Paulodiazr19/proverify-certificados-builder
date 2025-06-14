
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const CUANTIAS = [
  { value: "Menor", label: "Menor" },
  { value: "Media", label: "Media" },
  { value: "Alta", label: "Alta" },
];

export interface CausaLaboral {
  tipo: string;
  estado: string;
  cuantia: string;
  fecha: string;
  juzgado: string;
  demandado: string;
  materia: string;
  rit: string;
}
interface Props {
  causas: CausaLaboral[];
  setCausas: (v: CausaLaboral[]) => void;
}

export default function CausasLaborales({ causas, setCausas }: Props) {
  function agregar() {
    setCausas([
      ...causas,
      {
        tipo: "",
        estado: "",
        cuantia: "",
        fecha: "",
        juzgado: "",
        demandado: "",
        materia: "",
        rit: "",
      },
    ]);
  }
  function cambiar(i: number, campo: keyof CausaLaboral, valor: string) {
    const next = [...causas];
    next[i][campo] = valor;
    setCausas(next);
  }
  function eliminar(i: number) {
    setCausas(causas.filter((_, idx) => idx !== i));
  }

  return (
    <div className="rounded-2xl shadow-lg bg-gradient-to-tr from-azul-900 via-azul-800 to-naranja-500 p-1 animate-fade-in">
      <div className="rounded-2xl bg-white p-8 font-montserrat">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-azul-900">Causas Laborales</h2>
          <button
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-naranja-500 font-semibold text-white hover:bg-azul-800 transition hover:scale-105 shadow"
            onClick={agregar}
            type="button"
            aria-label="Agregar Causa"
          >
            <Plus size={18} />
            Agregar Causa
          </button>
        </div>
        <div className="flex flex-col gap-6">
          {causas.length === 0 && (
            <div className="text-muted-foreground italic text-sm py-10 text-center">No hay causas registradas.</div>
          )}
          {causas.map((causa, i) => (
            <div key={i} className="p-6 rounded-lg border border-azul-900/20 bg-slate-50 relative mb-2 shadow-sm">
              <button
                type="button"
                className="absolute top-2 right-2 text-azul-900 bg-naranja-500/20 hover:bg-naranja-500/50 rounded-full px-2 py-1 text-xs font-bold"
                onClick={() => eliminar(i)}
                title="Eliminar causa"
              >
                ×
              </button>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="font-semibold text-azul-800">Tipo</label>
                  <input
                    type="text"
                    className="mt-1 w-full rounded-lg border border-azul-800/20 px-3 py-2"
                    value={causa.tipo}
                    onChange={e => cambiar(i, "tipo", e.target.value)}
                  />
                </div>
                <div>
                  <label className="font-semibold text-azul-800">Estado</label>
                  <input
                    type="text"
                    className="mt-1 w-full rounded-lg border border-azul-800/20 px-3 py-2"
                    value={causa.estado}
                    onChange={e => cambiar(i, "estado", e.target.value)}
                  />
                </div>
                <div>
                  <label className="font-semibold text-azul-800">Cuantía</label>
                  <select
                    className="mt-1 w-full rounded-lg border border-azul-800/20 px-3 py-2 bg-white"
                    value={causa.cuantia}
                    onChange={e => cambiar(i, "cuantia", e.target.value)}
                  >
                    <option value="">Seleccionar…</option>
                    {CUANTIAS.map(c => (
                      <option key={c.value} value={c.value}>{c.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-azul-800">Fecha de Presentación</label>
                  <input
                    type="date"
                    className="mt-1 w-full rounded-lg border border-azul-800/20 px-3 py-2"
                    value={causa.fecha}
                    onChange={e => cambiar(i, "fecha", e.target.value)}
                  />
                </div>
                <div>
                  <label className="font-semibold text-azul-800">Juzgado</label>
                  <input
                    type="text"
                    className="mt-1 w-full rounded-lg border border-azul-800/20 px-3 py-2"
                    value={causa.juzgado}
                    onChange={e => cambiar(i, "juzgado", e.target.value)}
                  />
                </div>
                <div>
                  <label className="font-semibold text-azul-800">Demandado</label>
                  <input
                    type="text"
                    className="mt-1 w-full rounded-lg border border-azul-800/20 px-3 py-2"
                    value={causa.demandado}
                    onChange={e => cambiar(i, "demandado", e.target.value)}
                  />
                </div>
                <div>
                  <label className="font-semibold text-azul-800">Materia Específica</label>
                  <input
                    type="text"
                    className="mt-1 w-full rounded-lg border border-azul-800/20 px-3 py-2"
                    value={causa.materia}
                    onChange={e => cambiar(i, "materia", e.target.value)}
                  />
                </div>
                <div>
                  <label className="font-semibold text-azul-800">RIT</label>
                  <input
                    type="text"
                    className="mt-1 w-full rounded-lg border border-azul-800/20 px-3 py-2"
                    value={causa.rit}
                    onChange={e => cambiar(i, "rit", e.target.value)}
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
