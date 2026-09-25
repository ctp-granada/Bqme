import React from 'react';
import { Joyride, STATUS, type Step, type EventData } from 'react-joyride';

interface OnboardingTourProps {
  run: boolean;
  onFinishTour: () => void;
}

export const OnboardingTour: React.FC<OnboardingTourProps> = ({ run, onFinishTour }) => {
  const steps: Step[] = [
    {
      target: '#tour-brand-header',
      placement: 'bottom',
      skipBeacon: true,
      title: '🏥 ¡Bienvenido a BIOMARK-SIM!',
      content: (
        <div className="space-y-2 text-left text-xs leading-relaxed">
          <p>
            Plataforma interactiva de <strong>alta fidelidad clínica</strong> para el entrenamiento en selección racional de biomarcadores y diagnóstico diferencial bioquímico.
          </p>
          <p className="text-slate-500">
            A continuación te explicaremos brevemente cómo gestionar el <strong>Asistente de Guardia</strong> y la <strong>Orden de Laboratorio Multianalítica</strong>.
          </p>
        </div>
      )
    },
    {
      target: '#tour-gamification-hud',
      placement: 'bottom',
      skipBeacon: true,
      title: '❤️ Vidas, Presupuesto Sanitario y Racha',
      content: (
        <div className="space-y-2 text-left text-xs leading-relaxed">
          <p>
            En cada guardia dispones de <strong>3 Vidas del Paciente</strong> y un <strong>100% de Presupuesto Sanitario</strong>.
          </p>
          <p>
            Las decisiones acertadas y costo-efectivas incrementan tu racha y bonificación de XP ⚡. Si agotas las vidas por diagnósticos erróneos o sobrecostes innecesarios, deberás reiniciar la guardia médica.
          </p>
        </div>
      )
    },
    {
      target: '#tour-clinical-scenario',
      placement: 'bottom',
      skipBeacon: true,
      title: '📋 Escenario Clínico y Diagnósticos Diferenciales',
      content: (
        <div className="space-y-2 text-left text-xs leading-relaxed">
          <p>
            Lee atentamente la anamnesis, constantes vitales y el listado de <strong>diagnósticos diferenciales en discusión</strong>.
          </p>
          <p>
            Tu misión es solicitar la batería analítica adecuada que confirme la patología diana y discrimine con precisión entre las hipótesis clínicas planteadas.
          </p>
        </div>
      )
    },
    {
      target: '#tour-duty-assistant',
      placement: 'top',
      skipBeacon: true,
      title: '🤖 Asistente de Guardia & Tutor Clínico',
      content: (
        <div className="space-y-2 text-left text-xs leading-relaxed">
          <p>
            El <strong>Asistente de Guardia</strong> analiza en tiempo real el caso y tu presupuesto disponible.
          </p>
          <ul className="list-disc pl-4 space-y-1 text-slate-600">
            <li>💡 <strong>Consejo del Adjunto:</strong> Estrategia analítica óptima orientada al caso.</li>
            <li>✅ <strong>Biomarcadores Clave:</strong> Pruebas de alto rendimiento diagnóstico y costo-efectivas.</li>
            <li>❌ <strong>Sobrecostes:</strong> Pruebas no indicadas que consumen presupuesto.</li>
            <li>⚡ <strong>Botón Rápido:</strong> Carga la batería sugerida directamente con un clic.</li>
          </ul>
        </div>
      )
    },
    {
      target: '#tour-multi-biomarker-catalog',
      placement: 'top',
      skipBeacon: true,
      title: '🔬 Catálogo de Biomarcadores y Búsqueda',
      content: (
        <div className="space-y-2 text-left text-xs leading-relaxed">
          <p>
            Explora el catálogo o usa el buscador para seleccionar <strong>uno o múltiples biomarcadores</strong> (ej. <em>Troponina</em>, <em>BNP</em>, <em>Lipasa</em>, <em>PCR</em>).
          </p>
          <p>
            Cada prueba muestra su coste porcentual, rango de referencia y ventana cinética de elevación.
          </p>
        </div>
      )
    },
    {
      target: '#tour-order-slip',
      placement: 'left',
      skipBeacon: true,
      title: '📑 Volante de Laboratorio y Tramitación',
      content: (
        <div className="space-y-2 text-left text-xs leading-relaxed">
          <p>
            Revisa tu volante con todas las pruebas añadidas, coste total y presupuesto restante proyectado.
          </p>
          <p>
            Pulsa <strong>"Tramitar Orden de Laboratorio"</strong> para recibir retroalimentación bioquímica inmediata, cálculo de precisión diagnóstica y puntuación de eficiencia.
          </p>
        </div>
      )
    }
  ];

  const handleJoyrideEvent = (data: EventData) => {
    const { status } = data;
    if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
      onFinishTour();
    }
  };

  return (
    <Joyride
      steps={steps}
      run={run}
      continuous
      scrollToFirstStep
      onEvent={handleJoyrideEvent}
      options={{
        primaryColor: '#2563eb',
        textColor: '#0f172a',
        backgroundColor: '#ffffff',
        overlayColor: 'rgba(15, 23, 42, 0.75)',
        zIndex: 10000,
        buttons: ['back', 'close', 'primary']
      }}
      styles={{
        tooltip: {
          borderRadius: '16px',
          padding: '20px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35)',
          border: '1px solid #e2e8f0',
          fontSize: '13px'
        },
        tooltipTitle: {
          fontSize: '15px',
          fontWeight: 800,
          letterSpacing: '-0.02em',
          color: '#0f172a',
          marginBottom: '8px'
        },
        buttonPrimary: {
          backgroundColor: '#2563eb',
          fontSize: '12px',
          fontWeight: 700,
          borderRadius: '10px',
          padding: '8px 16px',
          color: '#ffffff',
          outline: 'none',
          boxShadow: '0 4px 6px -1px rgba(37, 99, 235, 0.3)'
        },
        buttonBack: {
          color: '#64748b',
          fontSize: '12px',
          fontWeight: 600,
          marginRight: '8px'
        },
        buttonSkip: {
          color: '#94a3b8',
          fontSize: '12px',
          fontWeight: 600
        }
      }}
      locale={{
        back: 'Anterior',
        close: 'Cerrar',
        last: '¡Comenzar Simulación!',
        next: 'Siguiente',
        skip: 'Saltar'
      }}
    />
  );
};
