import React, { useState } from 'react';
import { Sparkles, Shield, Heart, VolumeX, Eye } from 'lucide-react';

export const CatFriendlySpotlight: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'estrutura' | 'manejo' | 'feromonios'>('estrutura');

  return (
    <section id="estrutura" className="py-16 sm:py-24 bg-white border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Visual Column with High-Fidelity Asset */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-stone-200/90 aspect-[4/3] bg-stone-100">
              <img
                src="/src/assets/images/cat_friendly_suite_1791213423130.jpg"
                alt="Consultório acolhedor exclusivo para felinos com veterinário atencioso"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              
              {/* Discrete Scrim Banner */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#122B26]/90 via-[#122B26]/40 to-transparent p-5 text-white">
                <span className="text-xs uppercase tracking-wider text-amber-300 font-semibold mb-1 block">
                  Cat Friendly Practice®
                </span>
                <p className="text-sm font-medium leading-snug">
                  Entrada, sala de espera e consultório 100% isolados de odores e latidos caninos.
                </p>
              </div>
            </div>

            {/* Subtle floating trust badge */}
            <div className="mt-4 p-4 rounded-xl bg-[#FAF8F5] border border-stone-200/80 flex items-center gap-3 text-xs text-stone-700">
              <VolumeX className="w-5 h-5 text-[#235347] shrink-0" />
              <span>
                <strong>Atenuação Acústica Hospitalar:</strong> Paredes duplas com isolamento de decibéis para evitar estresse auditivo agudo em pacientes sensíveis.
              </span>
            </div>
          </div>

          {/* Editorial Content Column */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-xs uppercase tracking-wider text-amber-700 font-semibold">
                Especialidade & Ambiência Segura
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-normal text-[#122B26] mt-1.5 mb-4 tracking-tight [text-wrap:balance]">
                Por que gatos precisam de um ambiente clínico radicalmente diferente.
              </h2>
              <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
                Felinos são animais territorialistas e predadores sensíveis que entram em estado de hipervigilância na presença de latidos e feromônios de cães. Na AuraVet, toda a jornada do gato é separada desde a calçada.
              </p>
            </div>

            {/* Interactive Pillar Selector */}
            <div className="flex items-center gap-2 p-1 bg-stone-100 rounded-xl">
              <button
                type="button"
                onClick={() => setActiveTab('estrutura')}
                className={`flex-1 py-2 px-3 text-xs font-semibold rounded-lg transition-all ${
                  activeTab === 'estrutura'
                    ? 'bg-white text-[#122B26] shadow-sm'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Estrutura Física
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('manejo')}
                className={`flex-1 py-2 px-3 text-xs font-semibold rounded-lg transition-all ${
                  activeTab === 'manejo'
                    ? 'bg-white text-[#122B26] shadow-sm'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Manejo Fear-Free
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('feromonios')}
                className={`flex-1 py-2 px-3 text-xs font-semibold rounded-lg transition-all ${
                  activeTab === 'feromonios'
                    ? 'bg-white text-[#122B26] shadow-sm'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Aromaterapia Feliway
              </button>
            </div>

            {/* Tab Details Content */}
            <div className="p-5 rounded-2xl bg-[#F7F5F0] border border-stone-200/80 min-h-[160px] text-xs text-stone-700 leading-relaxed space-y-3">
              {activeTab === 'estrutura' && (
                <>
                  <div className="font-semibold text-sm text-[#122B26]">
                    Nichos Elevados e Entrada Exclusiva
                  </div>
                  <p>
                    Gatos se sentem vulneráveis no chão. Nossa sala de recepção possui estantes com nichos acolchoados para colocar as caixas de transporte acima do nível visual humano, permitindo que o felino observe o ambiente em segurança.
                  </p>
                  <div className="flex items-center gap-4 text-stone-500 pt-1">
                    <span className="flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5 text-[#235347]" /> Sem contato visual com cães
                    </span>
                    <span className="flex items-center gap-1.5">
                      <VolumeX className="w-3.5 h-3.5 text-[#235347]" /> Ruído atenuado
                    </span>
                  </div>
                </>
              )}

              {activeTab === 'manejo' && (
                <>
                  <div className="font-semibold text-sm text-[#122B26]">
                    Contenção Gentil com Toalhas e Sem Pressa
                  </div>
                  <p>
                    O exame clínico do gato é realizado preferencialmente dentro da própria base da caixa de transporte ou no colo do tutor, caso o animal prefira. Não utilizamos mordaças nem contenção forçada que elevem a pressão arterial e o cortisol.
                  </p>
                  <div className="flex items-center gap-4 text-stone-500 pt-1">
                    <span className="flex items-center gap-1.5">
                      <Heart className="w-3.5 h-3.5 text-amber-700" /> Respeito aos sinais de pausa
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Shield className="w-3.5 h-3.5 text-amber-700" /> Equipe médica treinada
                    </span>
                  </div>
                </>
              )}

              {activeTab === 'feromonios' && (
                <>
                  <div className="font-semibold text-sm text-[#122B26]">
                    Difusão Contínua de Feromônio Facial F3
                  </div>
                  <p>
                    Os consultórios e a ala de internação contam com difusores elétricos constantes que liberam frações sintéticas dos feromônios faciais que os gatos depositam ao esfregar a bochecha em locais seguros, induzindo sensação imediata de tranquilidade.
                  </p>
                  <div className="flex items-center gap-4 text-stone-500 pt-1">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-700" /> Toalhas pré-borrifadas
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Shield className="w-3.5 h-3.5 text-emerald-700" /> Sem sedação química prévia
                    </span>
                  </div>
                </>
              )}
            </div>

            {/* Quote on Feline Welfare */}
            <div className="pt-2 border-t border-stone-200/80 text-xs text-stone-500 italic">
              "Um gato que não entra em pânico na clínica permite aferições reais de glicemia, pressão arterial e frequência cardíaca, sem os artefatos causados pelo terror do ambiente."
              <span className="block font-medium not-italic text-stone-700 mt-1">
                — Dra. Helena Vance, Especialista em Medicina Felina AuraVet
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
