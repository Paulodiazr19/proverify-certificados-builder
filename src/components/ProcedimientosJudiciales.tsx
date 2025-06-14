
import { Plus } from "lucide-react";

export interface ProcedimientoJudicial {
  id: string;
  tipo: string;
  estado: string;
  inicio: string;
  tribunal: string;
}
interface Props {
  procedimientos: ProcedimientoJudicial[];
  setProcedimientos: (p: ProcedimientoJudicial[]) => void;
}
export default function ProcedimientosJudiciales({ procedimientos, setProcedimientos }: Props) {
  function agregar() {
    setProcedimientos([
      ...procedimientos,
      {
        id: "",
        tipo: "",
        estado: "",
        inicio: "",
        tribunal: "",
      },
    ]);
  }
  function cambiar(i: number, campo: keyof ProcedimientoJudicial, valor: string) {
    const next = [...procedimientos];
    next[i][campo] = valor;
    setProcedimientos(next);
  }
  function eliminar(i: number) {
    setProcedimientos(procedimientos.filter((_, idx) => idx !== i));
  }

  return (
    <div className="rounded-2xl shadow-lg bg-gradient-to-tr from-azul-900 via-azul-800 to-naranja-500 p-1 animate-fade-in">
      <div className="rounded-2xl bg-white p-8 font-montserrat">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-azul-900">Procedimientos Judiciales</h2>
          <button
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-naranja-500 font-semibold text-white hover:bg-azul-800 transition hover:scale-105 shadow"
            onClick={agregar}
            type="button"
            aria-label="Agregar Procedimiento"
          >
            <Plus size={18} />
            Agregar Procedimiento
          </button>
        </div>
        <div className="flex flex-col gap-6">
          {procedimientos.length === 0 && (
            <div className="text-muted-foreground italic text-sm py-10 text-center">No hay procedimientos registrados.</div>
          )}
          {procedimientos.map((p, i) => (
            <div key={i} className="p-6 rounded-lg border border-azul-900/20 bg-slate-50 relative mb-2 shadow-sm">
              <button
                type="button"
                className="absolute top-2 right-2 text-azul-900 bg-naranja-500/20 hover:bg-naranja-500/50 rounded-full px-2 py-1 text-xs font-bold"
                onClick={() => eliminar(i)}
                title="Eliminar procedimiento"
              >
                ×
              </button>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div>
                  <label className="font-semibold text-azul-800">ID</label>
                  <input
                    type="text"
                    className="mt-1 w-full rounded-lg border border-azul-800/20 px-3 py-2"
                    value={p.id}
                    onChange={e => cambiar(i, "id", e.target.value)}
                  />
                </div>
                <div>
                  <label className="font-semibold text-azul-800">Tipo</label>
                  <input
                    type="text"
                    className="mt-1 w-full rounded-lg border border-azul-800/20 px-3 py-2"
                    value={p.tipo}
                    onChange={e => cambiar(i, "tipo", e.target.value)}
                  />
                </div>
                <div>
                  <label className="font-semibold text-azul-800">Estado</label>
                  <input
                    type="text"
                    className="mt-1 w-full rounded-lg border border-azul-800/20 px-3 py-2"
                    value={p.estado}
                    onChange={e => cambiar(i, "estado", e.target.value)}
                  />
                </div>
                <div>
                  <label className="font-semibold text-azul-800">Inicio de Proceso</label>
                  <input
                    type="date"
                    className="mt-1 w-full rounded-lg border border-azul-800/20 px-3 py-2"
                    value={p.inicio}
                    onChange={e => cambiar(i, "inicio", e.target.value)}
                  />
                </div>
                <div>
                  <label className="font-semibold text-azul-800">Tribunal</label>
                  <input
                    type="text"
                    className="mt-1 w-full rounded-lg border border-azul-800/20 px-3 py-2"
                    value={p.tribunal}
                    onChange={e => cambiar(i, "tribunal", e.target.value)}
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
