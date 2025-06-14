
import { Plus } from "lucide-react";

export interface Fallo {
  id: string;
  rol: string;
  inicioRelacion: string;
  finRelacion: string;
  fallo: string;
}
interface Props {
  fallos: Fallo[];
  setFallos: (f: Fallo[]) => void;
}

export default function Fallos({ fallos, setFallos }: Props) {
  function agregar() {
    setFallos([
      ...fallos,
      {
        id: "",
        rol: "",
        inicioRelacion: "",
        finRelacion: "",
        fallo: "",
      },
    ]);
  }
  function cambiar(i: number, campo: keyof Fallo, valor: string) {
    const next = [...fallos];
    next[i][campo] = valor;
    setFallos(next);
  }
  function eliminar(i: number) {
    setFallos(fallos.filter((_, idx) => idx !== i));
  }

  return (
    <div className="rounded-2xl shadow-lg bg-gradient-to-tr from-azul-900 via-azul-800 to-naranja-500 p-1 animate-fade-in">
      <div className="rounded-2xl bg-white p-8 font-montserrat">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-azul-900">Fallos</h2>
          <button
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-naranja-500 font-semibold text-white hover:bg-azul-800 transition hover:scale-105 shadow"
            onClick={agregar}
            type="button"
            aria-label="Agregar Fallo"
          >
            <Plus size={18} />
            Agregar Fallo
          </button>
        </div>
        <div className="flex flex-col gap-6">
          {fallos.length === 0 && (
            <div className="text-muted-foreground italic text-sm py-10 text-center">No hay fallos registrados.</div>
          )}
          {fallos.map((f, i) => (
            <div key={i} className="p-6 rounded-lg border border-azul-900/20 bg-slate-50 relative mb-2 shadow-sm">
              <button
                type="button"
                className="absolute top-2 right-2 text-azul-900 bg-naranja-500/20 hover:bg-naranja-500/50 rounded-full px-2 py-1 text-xs font-bold"
                onClick={() => eliminar(i)}
                title="Eliminar fallo"
              >
                ×
              </button>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div>
                  <label className="font-semibold text-azul-800">ID</label>
                  <input
                    type="text"
                    className="mt-1 w-full rounded-lg border border-azul-800/20 px-3 py-2"
                    value={f.id}
                    onChange={e => cambiar(i, "id", e.target.value)}
                  />
                </div>
                <div>
                  <label className="font-semibold text-azul-800">ROL</label>
                  <input
                    type="text"
                    className="mt-1 w-full rounded-lg border border-azul-800/20 px-3 py-2"
                    value={f.rol}
                    onChange={e => cambiar(i, "rol", e.target.value)}
                  />
                </div>
                <div>
                  <label className="font-semibold text-azul-800">Inicio Relación Laboral</label>
                  <input
                    type="date"
                    className="mt-1 w-full rounded-lg border border-azul-800/20 px-3 py-2"
                    value={f.inicioRelacion}
                    onChange={e => cambiar(i, "inicioRelacion", e.target.value)}
                  />
                </div>
                <div>
                  <label className="font-semibold text-azul-800">Término Relación Laboral</label>
                  <input
                    type="date"
                    className="mt-1 w-full rounded-lg border border-azul-800/20 px-3 py-2"
                    value={f.finRelacion}
                    onChange={e => cambiar(i, "finRelacion", e.target.value)}
                  />
                </div>
                <div>
                  <label className="font-semibold text-azul-800">Fallo</label>
                  <input
                    type="text"
                    className="mt-1 w-full rounded-lg border border-azul-800/20 px-3 py-2"
                    value={f.fallo}
                    onChange={e => cambiar(i, "fallo", e.target.value)}
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
