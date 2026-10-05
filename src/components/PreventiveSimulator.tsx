import React, { useState } from 'react';
import { PetSpecies, PetLifeStage } from '../types';
import { PREVENTIVE_PROTOCOLS, CLINIC_INFO } from '../data/vetData';
import { ShieldCheck, Heart, Stethoscope, Sparkles, Calendar, Share2, Check } from 'lucide-react';

interface PreventiveSimulatorProps {
  initialSpecies?: PetSpecies;
  onOpenBookingWithDetails: (notes: string, species: PetSpecies) => void;
}

export const PreventiveSimulator: React.FC<PreventiveSimulatorProps> = ({
  initialSpecies = 'dog',
  onOpenBookingWithDetails,
}) => {
  const [selectedSpecies, setSelectedSpecies] = useState<PetSpecies>(initialSpecies);
  const [selectedStage, setSelectedStage] = useState<PetLifeStage>('adult');
  const [copiedNotification, setCopiedNotification] = useState(false);

  const protocolKey = `${selectedSpecies}-${selectedStage}`;
  const protocol = PREVENTIVE_PROTOCOLS[protocolKey] || PREVENTIVE_PROTOCOLS['dog-adult'];

  const handleShareToWhatsApp = () => {
    const text = `Olá AuraVet! Montei o plano preventivo para meu ${
      selectedSpecies === 'dog' ? 'Cão' : 'Gato'
    } (${protocol.stageName} - ${protocol.ageRange}) e gostaria de agendar uma avaliação preventiva com o corpo clínico.`;
    
    const url = `https://wa.me/5511987654321?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleCopySummary = () => {
    const summary = `Plano Preventivo AuraVet - ${selectedSpecies === 'dog' ? 'Canino' : 'Felino'} (${protocol.stageName})\n` +
      `Foco: ${protocol.primaryFocus}\n` +
      `Vacinas: ${protocol.vaccines.map(v => v.name).join(', ')}\n` +
      `Exames: ${protocol.checkups.map(c => c.exam).join(', ')}`;

    navigator.clipboard.writeText(summary);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 3000);
  };

  return (
    <section id="protocolo-preventivo" className="py-16 sm:py-24 bg-[#F2F7F4] border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Intro */}
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-800 bg-amber-100/80 px-3 py-1 rounded-md mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            Recurso Interativo Exclusivo • Nível Personalizado NexaWeb
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-normal text-[#122B26] tracking-tight [text-wrap:balance]">
            Simulador de Protocolo de Saúde Preventiva por Espécie e Fase de Vida.
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-2 leading-relaxed">
            Medicina veterinária baseada em longevidade ativa: descubra a janela ideal de exames, titulação vacinal e orientações comportamentais para o momento exato do seu animal.
          </p>
        </div>

        {/* Interactive Controls Bar */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-stone-200/90 shadow-sm mb-8">
          <div className="grid md:grid-cols-2 gap-6 items-center">
            
            {/* Species Toggle */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500 mb-2">
                1. Selecione a Espécie:
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedSpecies('dog')}
                  className={`py-3 px-4 rounded-xl text-sm font-semibold border flex items-center justify-center gap-2 transition-all ${
                    selectedSpecies === 'dog'
                      ? 'bg-[#1B3D36] text-white border-[#1B3D36] shadow-sm ring-2 ring-[#235347]/20'
                      : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200'
                  }`}
                >
                  <span className="text-lg">🐕</span>
                  <span>Canino (Cão)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedSpecies('cat')}
                  className={`py-3 px-4 rounded-xl text-sm font-semibold border flex items-center justify-center gap-2 transition-all ${
                    selectedSpecies === 'cat'
                      ? 'bg-[#1B3D36] text-white border-[#1B3D36] shadow-sm ring-2 ring-[#235347]/20'
                      : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200'
                  }`}
                >
                  <span className="text-lg">🐈</span>
                  <span>Felino (Gato)</span>
                </button>
              </div>
            </div>

            {/* Life Stage Toggle */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500 mb-2">
                2. Fase de Vida:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['puppy', 'adult', 'senior'] as const).map((stage) => {
                  const stageLabels: Record<string, { title: string; age: string }> = {
                    puppy: { title: 'Filhote', age: '0 - 12m' },
                    adult: { title: 'Adulto', age: '1 - 7 anos' },
                    senior: { title: 'Sênior', age: '7+ anos' },
                  };

                  const isSelected = selectedStage === stage;
                  return (
                    <button
                      key={stage}
                      type="button"
                      onClick={() => setSelectedStage(stage)}
                      className={`py-2.5 px-3 rounded-xl border text-center transition-all ${
                        isSelected
                          ? 'bg-amber-600 text-white border-amber-600 shadow-sm'
                          : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200'
                      }`}
                    >
                      <span className="block text-xs font-semibold">
                        {stageLabels[stage].title}
                      </span>
                      <span className={`block text-[10px] ${isSelected ? 'text-amber-100' : 'text-stone-400'}`}>
                        {stageLabels[stage].age}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>
        </div>

        {/* Dynamic Protocol Dashboard */}
        <div className="grid lg:grid-cols-12 gap-6 items-start">
          
          {/* Main Protocol Column (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Banner Statement */}
            <div className="bg-white rounded-2xl p-6 border border-stone-200/90 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-stone-100 mb-4">
                <div>
                  <span className="text-xs uppercase tracking-wider text-emerald-800 font-semibold">
                    Diretriz Médica Recomendada
                  </span>
                  <h3 className="font-display font-medium text-2xl text-[#122B26] mt-0.5">
                    {selectedSpecies === 'dog' ? 'Cão' : 'Gato'} • {protocol.stageName} ({protocol.ageRange})
                  </h3>
                </div>
                <span className="text-xs font-medium bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1 rounded-full">
                  Protocolo AuraVet 2026
                </span>
              </div>

              <div className="p-4 rounded-xl bg-[#FAF8F5] border border-stone-200/70 text-sm text-stone-700">
                <span className="font-semibold text-[#122B26] block mb-1">
                  Objetivo Clínico Central:
                </span>
                <p className="leading-relaxed">{protocol.primaryFocus}</p>
              </div>
            </div>

            {/* Vaccines & Immunization Table */}
            <div className="bg-white rounded-2xl p-6 border border-stone-200/90 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <ShieldCheck className="w-5 h-5 text-[#235347]" />
                <h4 className="font-display font-semibold text-lg text-[#122B26]">
                  Cronograma Vacinal Estratégico
                </h4>
              </div>

              <div className="divide-y divide-stone-100">
                {protocol.vaccines.map((v, i) => (
                  <div key={i} className="py-3.5 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                    <div>
                      <span className="font-semibold text-stone-900 text-sm block">
                        {v.name}
                      </span>
                      <span className="text-stone-500">{v.importance}</span>
                    </div>
                    <span className="font-mono text-stone-600 bg-stone-100 px-2.5 py-1 rounded-md shrink-0 sm:self-center">
                      {v.frequency}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Checkups and Exams */}
            <div className="bg-white rounded-2xl p-6 border border-stone-200/90 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Stethoscope className="w-5 h-5 text-amber-700" />
                <h4 className="font-display font-semibold text-lg text-[#122B26]">
                  Rastreamento Diagnóstico & Check-ups
                </h4>
              </div>

              <div className="divide-y divide-stone-100">
                {protocol.checkups.map((c, i) => (
                  <div key={i} className="py-3.5 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                    <div>
                      <span className="font-semibold text-stone-900 text-sm block">
                        {c.exam}
                      </span>
                      <span className="text-stone-500">{c.reason}</span>
                    </div>
                    <span className="font-mono text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-md shrink-0 sm:self-center">
                      {c.frequency}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Side Guidance & Action Column (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Nutrition & Environmental Behavior */}
            <div className="bg-white rounded-2xl p-6 border border-stone-200/90 shadow-sm space-y-5">
              <div>
                <div className="flex items-center gap-2 text-amber-700 mb-2 font-semibold text-xs uppercase tracking-wider">
                  <Heart className="w-4 h-4" />
                  <span>Manejo Nutricional Recomendado</span>
                </div>
                <div className="space-y-2 text-xs text-stone-600 leading-relaxed">
                  {protocol.nutritionTips.map((tip, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="text-amber-700 font-bold">•</span>
                      <span>{tip}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-stone-100">
                <span className="text-xs uppercase tracking-wider text-[#235347] font-semibold block mb-2">
                  Dica Comportamental & Bem-Estar
                </span>
                <p className="text-xs text-stone-600 leading-relaxed bg-[#F2F7F4] p-3.5 rounded-xl border border-[#235347]/10">
                  {protocol.behaviorNote}
                </p>
              </div>
            </div>

            {/* Interactive Schedule Trigger Card */}
            <div className="bg-gradient-to-br from-[#1B3D36] to-[#122B26] text-white rounded-2xl p-6 shadow-md space-y-4">
              <h4 className="font-display font-medium text-xl text-white">
                Deseja alinhar este plano com nossa equipe?
              </h4>
              <p className="text-xs text-stone-300 leading-relaxed">
                Agende uma consulta com a nossa diretoria clínica ou solicite o envio do protocolo completo via WhatsApp para guardar na carteirinha do pet.
              </p>

              <div className="space-y-2 pt-2">
                <button
                  type="button"
                  onClick={() => onOpenBookingWithDetails(
                    `Check-up preventivo para ${selectedSpecies === 'dog' ? 'Cão' : 'Gato'} (${protocol.stageName} - ${protocol.ageRange})`,
                    selectedSpecies
                  )}
                  className="w-full py-3 px-4 rounded-xl text-xs font-semibold text-[#122B26] bg-white hover:bg-stone-100 transition-colors flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4 text-[#235347]" />
                  <span>Agendar Check-up Preventivo</span>
                </button>

                <button
                  type="button"
                  onClick={handleShareToWhatsApp}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-600 transition-colors flex items-center justify-center gap-2"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Enviar para WhatsApp da Clínica</span>
                </button>

                <button
                  type="button"
                  onClick={handleCopySummary}
                  className="w-full py-2 px-3 text-[11px] text-stone-300 hover:text-white transition-colors text-center"
                >
                  {copiedNotification ? (
                    <span className="flex items-center justify-center gap-1 text-emerald-400">
                      <Check className="w-3.5 h-3.5" /> Resumo copiado com sucesso!
                    </span>
                  ) : (
                    'Copiar resumo textual para colar'
                  )}
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
