import React from 'react';
import { ClinicalCase, OrganSystem } from '../../types';
import { User, Activity, ChevronRight } from 'lucide-react';

interface CaseCardProps {
  caseData: ClinicalCase;
  onSelectCase: (c: ClinicalCase) => void;
  onStartChallenge: (c: ClinicalCase) => void;
}

export const CaseCard: React.FC<CaseCardProps> = ({ caseData, onSelectCase, onStartChallenge }) => {
  const systemNames: Record<OrganSystem, string> = {
    cardiac: 'Cardíaco',
    hepatic: 'Hepático / Ictericias',
    metabolic: 'Metabolismo / β-Oxidación',
    renal: 'Renal / Urea / Uricemia',
    pancreatic: 'Pancreático-Digestivo'
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 hover:border-slate-300 shadow-xs hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group">
      <div className="p-5">
        {/* Top Badges */}
        <div className="flex items-center justify-between mb-3">
          <span className="px-2.5 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider bg-slate-100 text-slate-800 border border-slate-200">
            {systemNames[caseData.system]}
          </span>
          <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-slate-50 text-slate-500 border border-slate-200">
            {caseData.difficulty}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-slate-700 transition-colors mb-2.5">
          {caseData.title}
        </h3>

        {/* Demographics & Complaint */}
        <div className="space-y-2 text-xs text-slate-600 mb-4">
          <div className="flex items-center space-x-2 text-slate-700 font-medium bg-slate-50 p-2.5 rounded-xl border border-slate-100">
            <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>
              {caseData.clinicalHistory.patientDemographics.gender}, {caseData.clinicalHistory.patientDemographics.age} años ({caseData.clinicalHistory.patientDemographics.occupation})
            </span>
          </div>

          <p className="line-clamp-2 text-slate-500 italic text-[11px] leading-relaxed">
            "{caseData.clinicalHistory.chiefComplaint}"
          </p>
        </div>

        {/* Differentials Tag Preview */}
        <div className="border-t border-slate-100 pt-3 mt-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
            Diagnósticos Diferenciales:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {caseData.differentialDiagnoses.slice(0, 2).map((diff, idx) => (
              <span key={idx} className="text-[10px] font-medium bg-slate-50 text-slate-700 px-2 py-0.5 rounded-md border border-slate-200/80 truncate max-w-[180px]">
                {diff.disease}
              </span>
            ))}
            {caseData.differentialDiagnoses.length > 2 && (
              <span className="text-[10px] font-medium text-slate-400 self-center">
                +{caseData.differentialDiagnoses.length - 2} más
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="bg-slate-50/70 border-t border-slate-100 px-5 py-3 flex items-center justify-between space-x-2">
        <button
          onClick={() => onSelectCase(caseData)}
          className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center space-x-1 cursor-pointer transition-colors"
        >
          <span>Ver Caso</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={() => onStartChallenge(caseData)}
          className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-white shadow-2xs flex items-center space-x-1.5 transition-colors cursor-pointer"
        >
          <Activity className="w-3.5 h-3.5 text-emerald-400" />
          <span>Iniciar Desafío</span>
        </button>
      </div>
    </div>
  );
};

