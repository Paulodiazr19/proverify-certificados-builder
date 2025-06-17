
import { useState } from "react";
import DatosPersonales, { DatosPersonalesData } from "@/components/DatosPersonales";
import CausasLaborales, { CausaLaboral } from "@/components/CausasLaborales";
import ProcedimientosJudiciales, { ProcedimientoJudicial } from "@/components/ProcedimientosJudiciales";
import Demandas, { Demanda } from "@/components/Demandas";
import Fallos, { Fallo } from "@/components/Fallos";
import VistaPrevia from "@/components/VistaPrevia";
import { generatePDF } from "@/components/PDFGenerator";
import { Eye, FileDown } from "lucide-react";

const defaultDP: DatosPersonalesData = {
  nombre: "",
  rut: "",
  email: "",
  edad: "",
  riesgo: "",
};

export default function Index() {
  const [datos, setDatos] = useState<DatosPersonalesData>(defaultDP);
  const [causas, setCausas] = useState<CausaLaboral[]>([]);
  const [procedimientos, setProcedimientos] = useState<ProcedimientoJudicial[]>([]);
  const [demandas, setDemandas] = useState<Demanda[]>([]);
  const [fallos, setFallos] = useState<Fallo[]>([]);
  const [openVistaPrevia, setOpenVistaPrevia] = useState(false);
  const [generandoPDF, setGenerandoPDF] = useState(false);

  const handleGenerarPDF = async () => {
    setGenerandoPDF(true);
    try {
      await generatePDF({
        datos,
        causas,
        procedimientos,
        demandas,
        fallos
      });
    } catch (error) {
      console.error('Error al generar PDF:', error);
      alert('Error al generar el PDF. Por favor, intenta nuevamente.');
    } finally {
      setGenerandoPDF(false);
    }
  };

  return (
    <div className="font-montserrat min-h-screen w-full bg-gradient-to-tr from-azul-900 via-azul-800 to-naranja-500 py-12">
      <div className="max-w-5xl mx-auto flex flex-col gap-10">
        {/* Cabecera */}
        <header className="flex flex-col md:flex-row items-center md:items-end justify-between gap-4 mb-2 px-2">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white drop-shadow">ProVerify Certificados</h1>
            <p className="text-lg md:text-xl text-azul-800/80 mt-2 font-medium">
              Completa los datos para tu certificado de antecedentes judiciales
            </p>
          </div>
          <div className="flex flex-row gap-3">
            <span className="inline-block bg-white/80 font-bold text-azul-900 px-6 py-2 rounded-2xl border-2 border-naranja-500 shadow">
              Entorno Empresarial
            </span>
          </div>
        </header>
        {/* Formulario */}
        <section className="flex flex-col gap-10">
          <DatosPersonales value={datos} onChange={setDatos} />
          <CausasLaborales causas={causas} setCausas={setCausas} />
          <ProcedimientosJudiciales procedimientos={procedimientos} setProcedimientos={setProcedimientos} />
          <Demandas demandas={demandas} setDemandas={setDemandas} />
          <Fallos fallos={fallos} setFallos={setFallos} />
        </section>
        {/* Botones */}
        <div className="flex justify-center gap-4 mt-10">
          <button
            className="flex items-center gap-2 bg-naranja-500 hover:bg-azul-800 text-white font-bold px-10 py-4 rounded-2xl shadow-lg transition hover:scale-105 text-lg"
            onClick={() => setOpenVistaPrevia(true)}
          >
            <Eye size={24} className="mr-1" />
            Vista Previa
          </button>
          <button
            className="flex items-center gap-2 bg-azul-800 hover:bg-naranja-500 text-white font-bold px-10 py-4 rounded-2xl shadow-lg transition hover:scale-105 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleGenerarPDF}
            disabled={generandoPDF}
          >
            <FileDown size={24} className="mr-1" />
            {generandoPDF ? 'Generando...' : 'Generar PDF'}
          </button>
        </div>
      </div>
      <VistaPrevia
        open={openVistaPrevia}
        onClose={() => setOpenVistaPrevia(false)}
        datos={datos}
        causas={causas}
        procedimientos={procedimientos}
        demandas={demandas}
        fallos={fallos}
      />
    </div>
  );
}
