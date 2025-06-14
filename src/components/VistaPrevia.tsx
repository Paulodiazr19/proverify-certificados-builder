
import { Eye } from "lucide-react";
import { DatosPersonalesData } from "./DatosPersonales";
import { CausaLaboral } from "./CausasLaborales";
import { ProcedimientoJudicial } from "./ProcedimientosJudiciales";
import { Demanda } from "./Demandas";
import { Fallo } from "./Fallos";

interface Props {
  open: boolean;
  onClose: () => void;
  datos: DatosPersonalesData;
  causas: CausaLaboral[];
  procedimientos: ProcedimientoJudicial[];
  demandas: Demanda[];
  fallos: Fallo[];
}
export default function VistaPrevia({ open, onClose, datos, causas, procedimientos, demandas, fallos }: Props) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center transition animate-fade-in">
      <div className="bg-white font-montserrat rounded-2xl shadow-2xl p-8 w-[95vw] max-w-3xl">
        <div className="flex items-center gap-3 mb-8">
          <Eye className="text-azul-900" size={32} />
          <h2 className="text-2xl font-bold text-azul-900">Vista Previa del Certificado</h2>
        </div>
        <div className="max-h-[65vh] overflow-y-auto pr-2">
          <section className="mb-5">
            <h3 className="font-semibold text-naranja-500 uppercase mb-2">Datos Personales</h3>
            <ul>
              <li><b>Nombre:</b> {datos.nombre}</li>
              <li><b>RUT:</b> {datos.rut}</li>
              <li><b>Email:</b> {datos.email}</li>
              <li><b>Edad:</b> {datos.edad}</li>
              <li><b>Indicador de riesgo:</b> {datos.riesgo}</li>
            </ul>
          </section>
          <section className="mb-5">
            <h3 className="font-semibold text-naranja-500 uppercase mb-2">Causas Laborales</h3>
            <ul>
              {causas.length > 0 ? causas.map((c, i) => (
                <li key={i}>
                  <b>Tipo:</b> {c.tipo} | <b>Estado:</b> {c.estado} | <b>Cuantía:</b> {c.cuantia} | <b>Fecha:</b> {c.fecha}
                  <br />
                  <b>Juzgado:</b> {c.juzgado} | <b>Demandado:</b> {c.demandado} | <b>Materia:</b> {c.materia} | <b>RIT:</b> {c.rit}
                </li>
              )) : <li><i>No hay causas registradas.</i></li>}
            </ul>
          </section>
          <section className="mb-5">
            <h3 className="font-semibold text-naranja-500 uppercase mb-2">Procedimientos Judiciales</h3>
            <ul>
              {procedimientos.length > 0 ? procedimientos.map((p, i) => (
                <li key={i}>
                  <b>ID:</b> {p.id} | <b>Tipo:</b> {p.tipo} | <b>Estado:</b> {p.estado} | <b>Inicio:</b> {p.inicio} | <b>Tribunal:</b> {p.tribunal}
                </li>
              )) : <li><i>No hay procedimientos registrados.</i></li>}
            </ul>
          </section>
          <section className="mb-5">
            <h3 className="font-semibold text-naranja-500 uppercase mb-2">Demandas</h3>
            <ul>
              {demandas.length > 0 ? demandas.map((d, i) => (
                <li key={i}>
                  <b>ID:</b> {d.id} | <b>Materia:</b> {d.materia} | <b>Demandado:</b> {d.demandado} | <b>Segundo Demandado:</b> {d.segundoDemandado} | <b>Cuantía:</b> {d.cuantia}
                </li>
              )) : <li><i>No hay demandas registradas.</i></li>}
            </ul>
          </section>
          <section>
            <h3 className="font-semibold text-naranja-500 uppercase mb-2">Fallos</h3>
            <ul>
              {fallos.length > 0 ? fallos.map((f, i) => (
                <li key={i}>
                  <b>ID:</b> {f.id} | <b>ROL:</b> {f.rol} | <b>Inicio Relación:</b> {f.inicioRelacion} | <b>Término Relación:</b> {f.finRelacion} | <b>Fallo:</b> {f.fallo}
                </li>
              )) : <li><i>No hay fallos registrados.</i></li>}
            </ul>
          </section>
        </div>
        <div className="mt-8 flex justify-end">
          <button
            onClick={onClose}
            className="bg-naranja-500 hover:bg-azul-800 text-white px-6 py-2 rounded-lg font-bold shadow transition hover:scale-105"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
