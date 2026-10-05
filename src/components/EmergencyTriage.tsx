import React, { useState } from 'react';
import { EMERGENCY_TRIAGE_LEVELS, CLINIC_INFO } from '../data/vetData';
import { PhoneCall, AlertTriangle, ShieldCheck, Clock, MapPin, AlertCircle } from 'lucide-react';

export const EmergencyTriage: React.FC = () => {
  const [selectedLevel, setSelectedLevel] = useState<string>('vermelho');

  const currentLevel = EMERGENCY_TRIAGE_LEVELS.find(l => l.code === selectedLevel) || EMERGENCY_TRIAGE_LEVELS[0];

  return (
    <section id="triagem" className="py-16 sm:py-24 bg-[#FAF8F5] border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-rose-700 font-semibold mb-2">
            <AlertTriangle className="w-4 h-4" />
            <span>Guia Rápido de Triagem Veterinária 24 Horas</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-normal text-[#122B26] tracking-tight [text-wrap:balance]">
            Identifique a gravidade do sintoma do seu pet antes de sair de casa.
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-2 leading-relaxed">
            Em situações críticas, cada minuto conta. Nosso protocolo de triagem ajuda a diferenciar emergências graves com risco de vida de quadros que podem aguardar atendimento clínico agendado.
          </p>
        </div>

        {/* Level Selector Tabs */}
        <div className="grid sm:grid-cols-3 gap-3 mb-8">
          {EMERGENCY_TRIAGE_LEVELS.map((level) => {
            const isSelected = selectedLevel === level.code;
            const borderAccent = level.code === 'vermelho'
              ? 'hover:border-rose-400'
              : level.code === 'amarelo'
              ? 'hover:border-amber-400'
              : 'hover:border-emerald-400';

            const activeBackground = level.code === 'vermelho'
              ? 'bg-rose-50 border-rose-500 ring-2 ring-rose-500/20'
              : level.code === 'amarelo'
              ? 'bg-amber-50 border-amber-500 ring-2 ring-amber-500/20'
              : 'bg-emerald-50 border-emerald-600 ring-2 ring-emerald-600/20';

            return (
              <button
                key={level.code}
                type="button"
                onClick={() => setSelectedLevel(level.code)}
                className={`p-4 rounded-xl border text-left transition-all ${
                  isSelected
                    ? activeBackground
                    : `bg-white border-stone-200 ${borderAccent}`
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className={`text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                    level.code === 'vermelho'
                      ? 'bg-rose-600 text-white'
                      : level.code === 'amarelo'
                      ? 'bg-amber-600 text-white'
                      : 'bg-[#235347] text-white'
                  }`}>
                    {level.code.toUpperCase()}
                  </span>
                  <span className="text-[11px] text-stone-500 font-mono">
                    {level.code === 'vermelho' ? 'Imediato' : level.code === 'amarelo' ? 'Mesmo Dia' : 'Rotina'}
                  </span>
                </div>
                <div className="font-display font-medium text-sm text-[#122B26]">
                  {level.label}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Triage Guidance Card */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200/90 shadow-sm grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Symptoms List (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                  Conduta Recomendada:
                </span>
                <span className="text-xs font-bold text-stone-900 bg-stone-100 px-2 py-0.5 rounded">
                  {currentLevel.urgencyTime}
                </span>
              </div>
              <h3 className="font-display font-medium text-xl sm:text-2xl text-[#122B26] mb-2">
                {currentLevel.description}
              </h3>
            </div>

            <div className="space-y-3">
              <span className="text-xs font-semibold text-stone-800 uppercase tracking-wider block">
                Sintomas Típicos deste Nível:
              </span>
              <ul className="space-y-2.5">
                {currentLevel.symptoms.map((symptom, sIdx) => (
                  <li key={sIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-700 leading-relaxed">
                    <span className={`w-2 h-2 rounded-full mt-2 shrink-0 ${
                      currentLevel.code === 'vermelho'
                        ? 'bg-rose-600'
                        : currentLevel.code === 'amarelo'
                        ? 'bg-amber-600'
                        : 'bg-emerald-600'
                    }`} />
                    <span>{symptom}</span>
                  </li>
                ))}
              </ul>
            </div>

            {currentLevel.code === 'vermelho' && (
              <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-900 space-y-1">
                <strong>Orientações cruciais durante o transporte do pet:</strong>
                <p>
                  Não administre medicamentos humanos (dipirona, paracetamol e anti-inflamatórios são altamente tóxicos para cães e gatos). Mantenha o animal em decúbito lateral em superfície plana e ligue para avisar nossa recepção enquanto estiver a caminho.
                </p>
              </div>
            )}
          </div>

          {/* Direct Hotline Action Box (4 cols) */}
          <div className="lg:col-span-4 bg-[#1B3D36] text-white rounded-xl p-6 space-y-5">
            <div>
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider block mb-1">
                Plantão Hospitalar 24 Horas
              </span>
              <h4 className="font-display font-medium text-xl text-white">
                Equipe de Choque de Prontidão
              </h4>
              <p className="text-xs text-stone-300 mt-2 leading-relaxed">
                Médico veterinário intensivista e enfermagem presentes no hospital 24 horas por dia, 7 dias por semana.
              </p>
            </div>

            <div className="space-y-2.5 pt-2 border-t border-white/10 text-xs">
              <div className="flex items-center gap-2 text-stone-200">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{CLINIC_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2 text-stone-200">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Porta aberta para urgências 24h</span>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <a
                href={`tel:${CLINIC_INFO.phone}`}
                className="w-full py-3 px-4 rounded-xl font-semibold text-xs bg-rose-600 hover:bg-rose-700 text-white transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Ligar Agora: {CLINIC_INFO.phone}</span>
              </a>

              <a
                href={CLINIC_INFO.whatsappDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl font-medium text-xs bg-white/10 hover:bg-white/20 text-white transition-colors flex items-center justify-center gap-2"
              >
                <span>Avisar Chegada pelo WhatsApp</span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
