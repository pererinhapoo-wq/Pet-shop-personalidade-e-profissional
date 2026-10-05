import React, { useState } from 'react';
import { PlanTier, PetSpecies } from '../types';
import { CLINIC_INFO } from '../data/vetData';
import { Calendar, ShieldAlert, ArrowRight, Clock, MapPin, HeartHandshake, Sparkles, Stethoscope } from 'lucide-react';

interface HeroSectionProps {
  currentTier: PlanTier;
  onOpenBooking: (preselectedService?: string) => void;
  onSelectPetForSimulator?: (species: PetSpecies) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  currentTier,
  onOpenBooking,
  onSelectPetForSimulator,
}) => {
  // Hero interactive state for Personalizado tier
  const [heroPet, setHeroPet] = useState<PetSpecies>('dog');
  const [heroAgeGroup, setHeroAgeGroup] = useState<'filhote' | 'adulto' | 'senior'>('adulto');

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-stone-200/70">
      {/* Subtle organic warmth background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#E8F0EC]/60 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-amber-50/70 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Top Kicker & Coordinates (Unboxed clean metadata with · separators) */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-stone-600 mb-6 font-medium">
          <span className="flex items-center gap-1.5 text-[#1B3D36] font-semibold">
            <MapPin className="w-3.5 h-3.5 text-[#235347]" />
            Jardins, São Paulo
          </span>
          <span aria-hidden="true" className="text-stone-300">·</span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-stone-500" />
            Plantão 24h & Consultas com Hora Marcada
          </span>
          <span aria-hidden="true" className="text-stone-300">·</span>
          <span>{CLINIC_INFO.technicalResponsible}</span>
        </div>

        {/* ========================================================
            HERO: NÍVEL PROFISSIONAL
            Clean, high-performance, authoritative and humanized
           ======================================================== */}
        {currentTier === 'profissional' ? (
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Narrative Column */}
            <div className="lg:col-span-7 space-y-6">
              <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.5rem] font-normal leading-[1.12] text-[#122B26] tracking-tight [text-wrap:balance]">
                Medicina veterinária de precisão e cuidado com o tempo que o seu pet merece.
              </h1>
              
              <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-2xl">
                Atendimento clínico completo, diagnósticos no próprio centro, centro cirúrgico com monitoramento multiparâmetro e estética dermatológica de baixo ruído. Sem pressa, com empatia médica e respeito às particularidades de cada espécie.
              </p>

              {/* Action and Reassurance Cluster */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  type="button"
                  onClick={() => onOpenBooking()}
                  className="py-3.5 px-6 rounded-xl bg-[#1B3D36] hover:bg-[#122B26] text-white font-medium text-sm transition-all shadow-sm hover:shadow active:scale-[0.98] flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  <Calendar className="w-4 h-4 text-emerald-300" />
                  <span>Agendar Consulta ou Exame</span>
                </button>

                <a
                  href="#triagem"
                  className="py-3.5 px-5 rounded-xl border border-stone-300 hover:border-stone-400 bg-white text-stone-700 hover:text-[#122B26] font-medium text-sm transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  <ShieldAlert className="w-4 h-4 text-rose-600" />
                  <span>Plantão de Emergência 24h</span>
                </a>
              </div>

              {/* Quiet Clinical Pillars (Not cards-within-cards, but airy typographic points) */}
              <div className="pt-6 border-t border-stone-200/80 grid grid-cols-3 gap-4 text-xs">
                <div>
                  <div className="font-semibold text-stone-900 text-sm mb-0.5">45 a 60 min</div>
                  <div className="text-stone-500">Tempo dedicado por consulta clínica</div>
                </div>
                <div>
                  <div className="font-semibold text-stone-900 text-sm mb-0.5">Laudos Próprios</div>
                  <div className="text-stone-500">Ultrassom, raio-X e exames de sangue</div>
                </div>
                <div>
                  <div className="font-semibold text-stone-900 text-sm mb-0.5">Ala Felina</div>
                  <div className="text-stone-500">Isolamento acústico e visual total</div>
                </div>
              </div>
            </div>

            {/* Right Focal Carrier */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-stone-200/90 aspect-[4/3] lg:aspect-[5/4] bg-stone-100">
                <img
                  src="/src/assets/images/vet_hero_care_1791213411609.jpg"
                  alt="Veterinária em atendimento cuidadoso examinando cão com carinho"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                
                {/* Discrete overlay caption adhering to contrast guidelines */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-5 text-white">
                  <div className="text-xs uppercase tracking-wider text-emerald-300 font-semibold mb-1">
                    Consulta Humanizada
                  </div>
                  <div className="text-sm font-medium leading-snug">
                    Manejo gentil e consultas estendidas para diagnóstico preciso sem trauma.
                  </div>
                </div>
              </div>
            </div>

          </div>
        ) : (
          /* ========================================================
             HERO: NÍVEL PERSONALIZADO
             Authorial, interactive, distinctive with Pet Health Compass
             ======================================================== */
          <div className="space-y-10">
            {/* Header statement with balanced editorial prominence */}
            <div className="max-w-4xl space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-800 bg-amber-100/70 px-3 py-1 rounded-md">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                Experiência Autoral AuraVet • Medicina Integrativa & Cuidado Singular
              </div>
              
              <h1 className="font-display text-4xl sm:text-6xl font-normal leading-[1.08] text-[#122B26] tracking-tight [text-wrap:balance]">
                Onde a mais alta medicina veterinária encontra o acolhimento que seu companheiro merece.
              </h1>

              <p className="text-lg text-stone-600 max-w-2xl leading-relaxed">
                Um ecossistema de saúde animal projetado do zero: consultórios com atenuação acústica, protocolos específicos por espécie, boutique com farmácia manipulada e centro de estética com ozonioterapia dermatológica.
              </p>
            </div>

            {/* Asymmetrical Bento-Hero Composition */}
            <div className="grid lg:grid-cols-12 gap-6 items-stretch">
              
              {/* Primary Visual Anchor (7 cols) */}
              <div className="lg:col-span-7 rounded-2xl overflow-hidden shadow-lg border border-stone-200/90 relative min-h-[360px] lg:min-h-[460px] bg-stone-900 group">
                <img
                  src="/src/assets/images/vet_hero_care_1791213411609.jpg"
                  alt="Doutora veterinária em momento de escuta e exame com paciente canino"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90"
                />
                
                {/* Measured Scrim for Legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#122B26]/90 via-[#122B26]/30 to-transparent flex flex-col justify-end p-6 sm:p-8 text-white">
                  <div className="flex items-center gap-2 text-xs font-semibold text-emerald-300 mb-2">
                    <Stethoscope className="w-4 h-4" />
                    <span>Protocolo Fear-Free & Atenuação de Ansiedade</span>
                  </div>
                  <h3 className="font-display text-xl sm:text-2xl font-medium text-white mb-2 leading-snug">
                    Consultórios que não cheiram a hospital e atendimento no ritmo do seu pet.
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-300 max-w-xl leading-relaxed">
                    Piso térmico antiderrapante, difusores de feromônios ambientais contínuos e equipe certificada em manejo compassivo.
                  </p>
                </div>
              </div>

              {/* Right Interactive Component: Pet Health Compass (5 cols) */}
              <div className="lg:col-span-5 bg-white rounded-2xl p-6 sm:p-7 border border-stone-200/90 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-stone-100 mb-4">
                    <div>
                      <span className="text-xs uppercase tracking-wider text-amber-700 font-semibold">
                        Bússola de Saúde Preventiva
                      </span>
                      <h3 className="font-display font-medium text-xl text-[#122B26]">
                        Cuidado Sob Medida
                      </h3>
                    </div>
                    <HeartHandshake className="w-5 h-5 text-amber-700" />
                  </div>

                  <p className="text-xs text-stone-600 mb-4">
                    Selecione a espécie e fase de vida para obter as recomendações clínicas imediatas para o seu pet:
                  </p>

                  {/* Species Selector */}
                  <div className="mb-4">
                    <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                      Espécie do Paciente:
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setHeroPet('dog');
                          if (onSelectPetForSimulator) onSelectPetForSimulator('dog');
                        }}
                        className={`py-2 px-3 rounded-lg text-xs font-medium border text-center transition-all ${
                          heroPet === 'dog'
                            ? 'bg-[#1B3D36] text-white border-[#1B3D36] shadow-sm'
                            : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200'
                        }`}
                      >
                        🐕 Cão
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setHeroPet('cat');
                          if (onSelectPetForSimulator) onSelectPetForSimulator('cat');
                        }}
                        className={`py-2 px-3 rounded-lg text-xs font-medium border text-center transition-all ${
                          heroPet === 'cat'
                            ? 'bg-[#1B3D36] text-white border-[#1B3D36] shadow-sm'
                            : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200'
                        }`}
                      >
                        🐈 Gato (Ala Felina)
                      </button>
                    </div>
                  </div>

                  {/* Age Stage Selector */}
                  <div className="mb-4">
                    <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                      Fase de Vida:
                    </label>
                    <div className="grid grid-cols-3 gap-1.5">
                      {(['filhote', 'adulto', 'senior'] as const).map((stage) => (
                        <button
                          key={stage}
                          type="button"
                          onClick={() => setHeroAgeGroup(stage)}
                          className={`py-1.5 px-2 rounded-md text-[11px] font-medium border text-center capitalize transition-colors ${
                            heroAgeGroup === stage
                              ? 'bg-amber-600 text-white border-amber-600'
                              : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200'
                          }`}
                        >
                          {stage === 'filhote' ? 'Filhote' : stage === 'adulto' ? 'Adulto' : 'Sênior'}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Immediate Dynamic Clinical Preview */}
                  <div className="bg-[#F7F5F0] rounded-xl p-3.5 border border-stone-200/70 text-xs space-y-2 mb-4">
                    <div className="font-semibold text-[#122B26] flex items-center justify-between">
                      <span>Foco Clínico Prioritário:</span>
                      <span className="text-[11px] text-amber-700 font-medium">
                        {heroPet === 'cat' ? 'Medicina Felina' : 'Medicina Canina'}
                      </span>
                    </div>
                    <p className="text-stone-600 leading-snug">
                      {heroPet === 'cat'
                        ? heroAgeGroup === 'filhote'
                          ? 'Triagem sorológica FeLV/FIV antes do esquema vacinal quádruplo e manejo de adaptação.'
                          : heroAgeGroup === 'adulto'
                          ? 'Monitoramento de sedimento urinário, hidratação via sachê e enriquecimento vertical.'
                          : 'Rastreio semestral de Doença Renal Crônica (SDMA), pressão arterial e hipertireoidismo.'
                        : heroAgeGroup === 'filhote'
                        ? 'Primovacinação com V10 importada, giárdia e socialização guiada com reforço positivo.'
                        : heroAgeGroup === 'adulto'
                        ? 'Reforços anuais, prevenção periodontal com odontologia preventiva e controle de peso.'
                        : 'Painel geriátrico semestral, ecocardiograma com Doppler e manejo profilático de osteoartrose.'}
                    </p>
                  </div>
                </div>

                {/* Direct Action triggers */}
                <div className="space-y-2 pt-2 border-t border-stone-100">
                  <a
                    href="#protocolo-preventivo"
                    className="w-full py-2.5 px-3 rounded-lg text-xs font-semibold text-amber-900 bg-amber-100 hover:bg-amber-200 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>Abrir Simulador Preventivo Completo</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                  <button
                    type="button"
                    onClick={() => onOpenBooking()}
                    className="w-full py-2.5 px-3 rounded-lg text-xs font-semibold text-white bg-[#1B3D36] hover:bg-[#122B26] transition-colors flex items-center justify-center gap-2"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Agendar com Esta Especificação</span>
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
