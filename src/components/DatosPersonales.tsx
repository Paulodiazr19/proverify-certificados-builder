
import { cn } from "@/lib/utils";

const INDICADOR = [
  { value: "Bajo", label: "Bajo" },
  { value: "Medio", label: "Medio" },
  { value: "Alto", label: "Alto" },
];

export interface DatosPersonalesData {
  nombre: string;
  rut: string;
  email: string;
  edad: string;
  riesgo: string;
}

interface Props {
  value: DatosPersonalesData;
  onChange: (v: DatosPersonalesData) => void;
}

export default function DatosPersonales({ value, onChange }: Props) {
  return (
    <div className="rounded-2xl shadow-lg bg-gradient-to-tr from-azul-900 via-azul-800 to-naranja-500 p-1 animate-fade-in">
      <div className="rounded-2xl bg-white p-8 flex flex-col gap-6 font-montserrat">
        <h2 className="text-2xl font-bold text-azul-900 mb-4">Datos Personales</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="font-semibold text-azul-800">Nombre Completo</label>
            <input
              type="text"
              className="mt-1 w-full rounded-lg border border-azul-800/30 px-4 py-2 focus:ring-2 focus:ring-naranja-500 focus:outline-none transition"
              value={value.nombre}
              onChange={e => onChange({ ...value, nombre: e.target.value })}
              placeholder="Ej: Juan Pérez"
            />
          </div>
          <div>
            <label className="font-semibold text-azul-800">RUT</label>
            <input
              type="text"
              className="mt-1 w-full rounded-lg border border-azul-800/30 px-4 py-2 focus:ring-2 focus:ring-naranja-500 focus:outline-none transition"
              value={value.rut}
              onChange={e => onChange({ ...value, rut: e.target.value })}
              placeholder="Ej: 12.345.678-9"
            />
          </div>
          <div>
            <label className="font-semibold text-azul-800">Email</label>
            <input
              type="email"
              className="mt-1 w-full rounded-lg border border-azul-800/30 px-4 py-2 focus:ring-2 focus:ring-naranja-500 focus:outline-none transition"
              value={value.email}
              onChange={e => onChange({ ...value, email: e.target.value })}
              placeholder="correo@ejemplo.com"
            />
          </div>
          <div>
            <label className="font-semibold text-azul-800">Edad</label>
            <input
              type="number"
              className="mt-1 w-full rounded-lg border border-azul-800/30 px-4 py-2 focus:ring-2 focus:ring-naranja-500 focus:outline-none transition"
              value={value.edad}
              onChange={e => onChange({ ...value, edad: e.target.value })}
              min={0}
              placeholder="Ej: 35"
            />
          </div>
          <div>
            <label className="font-semibold text-azul-800">Indicador de Riesgo</label>
            <select
              className="mt-1 w-full rounded-lg border border-azul-800/30 px-4 py-2 focus:ring-2 focus:ring-naranja-500 focus:outline-none transition bg-white"
              value={value.riesgo}
              onChange={e => onChange({ ...value, riesgo: e.target.value })}
            >
              <option value="">Seleccionar…</option>
              {INDICADOR.map(i => (
                <option key={i.value} value={i.value}>
                  {i.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
