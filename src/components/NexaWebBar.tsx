import React, { useState } from 'react';
import { PlanTier } from '../types';
import { NEXAWEB_TIER_SPECS } from '../data/vetData';
import { Sparkles, CheckCircle2, SlidersHorizontal, X, ArrowRight, Layers } from 'lucide-react';

interface NexaWebBarProps {
  currentTier: PlanTier;
  onTierChange: (tier: PlanTier) => void;
}

export const NexaWebBar: React.FC<NexaWebBarProps> = ({ currentTier, onTierChange }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {/* NexaWeb Executive Top Control Bar */}
      <aside aria-label="Controle de Demonstração NexaWeb" className="bg-[#122B26] text-white border-b border-[#28594F]/40 px-4 py-2.5 sm:px-6 relative z-50">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          {/* NexaWeb Agency Brand Signal */}
          <div className="flex items-center gap-2.5">
            <span className="font-semibold tracking-wider text-emerald-400 uppercase text-[11px] flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-emerald-400" />
              NexaWeb Demo Studio
            </span>
            <span className="text-white/30 hidden sm:inline" aria-hidden="true">/</span>
            <span className="text-stone-300 font-medium hidden sm:inline">
              Pet Shop + Clínica Veterinária
            </span>
          </div>

          {/* Interactive Tier Switcher */}
          <div className="flex items-center gap-2">
            <span className="text-stone-400 mr-1 hidden md:inline">Modo de Apresentação:</span>
            <div className="flex items-center bg-[#0C1F1B] p-1 rounded-lg border border-[#28594F]/60">
              <button
                type="button"
                onClick={() => onTierChange('profissional')}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all whitespace-nowrap ${
                  currentTier === 'profissional'
                    ? 'bg-[#235347] text-white shadow-sm font-semibold'
                    : 'text-stone-300 hover:text-white'
                }`}
              >
                Nível Profissional
              </button>
              <button
                type="button"
                onClick={() => onTierChange('personalizado')}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all flex items-center gap-1.5 whitespace-nowrap ${
                  currentTier === 'personalizado'
                    ? 'bg-amber-600 text-white shadow-sm font-semibold'
                    : 'text-stone-300 hover:text-white'
                }`}
              >
                <Sparkles className="w-3 h-3 text-amber-300" />
                Nível Personalizado
              </button>
            </div>

            {/* Compare Specs Button */}
            <button
              type="button"
              onClick={() => setShowModal(true)}
              className="ml-2 text-stone-300 hover:text-white flex items-center gap-1 py-1.5 px-2.5 rounded-md bg-white/5 hover:bg-white/10 transition-colors whitespace-nowrap"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Comparativo de Níveis</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Comparison Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#FAF8F5] text-[#1C2520] rounded-2xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border border-stone-200 relative max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="absolute top-5 right-5 text-stone-400 hover:text-stone-700 p-2 rounded-full hover:bg-stone-200/60 transition-colors"
              aria-label="Fechar"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <span className="text-xs uppercase tracking-wider text-[#235347] font-semibold">
                Guia de Especificação Comercial NexaWeb
              </span>
              <h2 className="text-2xl sm:text-3xl font-display font-medium text-[#122B26] mt-1">
                Profissional vs. Personalizado
              </h2>
              <p className="text-sm text-stone-600 mt-2">
                Entenda os diferenciais técnicos, de experiência do usuário e de design aplicados neste projeto de demonstração para clínicas veterinárias e pet shops.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Card Profissional */}
              <div className={`p-6 rounded-xl border transition-all ${
                currentTier === 'profissional'
                  ? 'border-[#235347] bg-[#F2F7F4] ring-2 ring-[#235347]/20'
                  : 'border-stone-200 bg-white'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-display font-semibold text-lg text-[#122B26]">
                    {NEXAWEB_TIER_SPECS.profissional.name}
                  </h3>
                  {currentTier === 'profissional' && (
                    <span className="text-[11px] bg-[#235347] text-white px-2 py-0.5 rounded font-medium">
                      Ativo na tela
                    </span>
                  )}
                </div>
                <p className="text-xs text-stone-600 mb-4">
                  {NEXAWEB_TIER_SPECS.profissional.description}
                </p>
                <div className="space-y-2 mb-6">
                  {NEXAWEB_TIER_SPECS.profissional.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-stone-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#235347] shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    onTierChange('profissional');
                    setShowModal(false);
                  }}
                  className="w-full py-2 px-3 text-xs font-medium text-[#122B26] bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors"
                >
                  Visualizar Versão Profissional
                </button>
              </div>

              {/* Card Personalizado */}
              <div className={`p-6 rounded-xl border transition-all ${
                currentTier === 'personalizado'
                  ? 'border-amber-600 bg-amber-50/60 ring-2 ring-amber-600/20'
                  : 'border-stone-200 bg-white'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-600" />
                    <h3 className="font-display font-semibold text-lg text-[#122B26]">
                      {NEXAWEB_TIER_SPECS.personalizado.name}
                    </h3>
                  </div>
                  {currentTier === 'personalizado' && (
                    <span className="text-[11px] bg-amber-600 text-white px-2 py-0.5 rounded font-medium">
                      Ativo na tela
                    </span>
                  )}
                </div>
                <p className="text-xs text-stone-600 mb-4">
                  {NEXAWEB_TIER_SPECS.personalizado.description}
                </p>
                <div className="space-y-2 mb-6">
                  {NEXAWEB_TIER_SPECS.personalizado.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-stone-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    onTierChange('personalizado');
                    setShowModal(false);
                  }}
                  className="w-full py-2 px-3 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-lg transition-colors flex items-center justify-center gap-1.5"
                >
                  Visualizar Versão Personalizada
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-stone-200 text-center text-xs text-stone-500">
              Padrão NexaWeb: Cada projeto é construído sob medida, sem uso de modelos genéricos ou reaproveitamento cego de estruturas anteriores.
            </div>
          </div>
        </div>
      )}
    </>
  );
};
