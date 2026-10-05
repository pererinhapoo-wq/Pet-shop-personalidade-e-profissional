import React, { useState } from 'react';
import { SERVICES_LIST } from '../data/vetData';
import { ServiceItem } from '../types';
import { Check, Clock, ArrowUpRight, Sparkles } from 'lucide-react';

interface ServicesSectionProps {
  onSelectServiceToBook: (serviceId: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectServiceToBook }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedServiceDetail, setSelectedServiceDetail] = useState<ServiceItem | null>(null);

  const categories = [
    { id: 'all', label: 'Todos os Serviços' },
    { id: 'clinica', label: 'Clínica & Especialistas' },
    { id: 'diagnostico', label: 'Diagnóstico & Imagem' },
    { id: 'cirurgia', label: 'Centro Cirúrgico' },
    { id: 'spa', label: 'SPA & Estética Baixo Ruído' },
    { id: 'prevencao', label: 'Imunização' },
  ];

  const filteredServices = activeCategory === 'all'
    ? SERVICES_LIST
    : SERVICES_LIST.filter(s => s.category === activeCategory);

  return (
    <section id="servicos" className="py-16 sm:py-24 border-b border-stone-200/80 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs uppercase tracking-wider text-[#235347] font-semibold">
            Medicina Veterinária & Cuidados Integrados
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-normal text-[#122B26] mt-2 mb-4 tracking-tight [text-wrap:balance]">
            Estrutura hospitalar e ambiência calma para todas as fases da vida do seu animal.
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Cada área do nosso centro foi projetada para oferecer precisão técnica sem sobrecarregar emocionalmente o paciente. Desde a prevenção imunitária à alta complexidade cirúrgica.
          </p>
        </div>

        {/* Category Filter Tabs (Interactive Segmented Control) */}
        <div className="flex items-center gap-1.5 p-1 bg-stone-200/70 rounded-xl overflow-x-auto mb-10 max-w-fit scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 py-2 text-xs font-medium rounded-lg transition-all whitespace-nowrap ${
                activeCategory === cat.id
                  ? 'bg-white text-[#122B26] shadow-sm font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Asymmetrical Editorial Services Presentation */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredServices.map((service, index) => {
            const isFeatured = index === 0 && activeCategory === 'all';

            return (
              <article
                key={service.id}
                className={`rounded-2xl border p-6 sm:p-7 flex flex-col justify-between transition-all duration-200 bg-white hover:border-[#235347]/40 hover:shadow-md ${
                  isFeatured
                    ? 'md:col-span-2 lg:col-span-2 border-[#235347]/40 bg-gradient-to-br from-white via-white to-[#F2F7F4]'
                    : 'border-stone-200/90'
                }`}
              >
                <div>
                  {/* Human Editorial Index & Badge */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="font-mono text-xs text-stone-400 font-semibold tracking-wider">
                      {String(index + 1).padStart(2, '0')}.
                    </span>
                    {service.highlightBadge && (
                      <span className="text-[11px] font-semibold text-[#1B3D36] bg-[#E8F0EC] px-2.5 py-0.5 rounded-md">
                        {service.highlightBadge}
                      </span>
                    )}
                  </div>

                  <h3 className="font-display font-medium text-xl sm:text-2xl text-[#122B26] mb-2 leading-snug">
                    {service.title}
                  </h3>

                  <p className="text-xs sm:text-sm font-medium text-[#235347] mb-3">
                    {service.subtitle}
                  </p>

                  <p className="text-xs sm:text-sm text-stone-600 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Highlights list */}
                  <div className="space-y-2.5 mb-6 pt-4 border-t border-stone-100">
                    {service.details.map((detail, dIdx) => (
                      <div key={dIdx} className="flex items-start gap-2 text-xs text-stone-700">
                        <Check className="w-3.5 h-3.5 text-[#235347] shrink-0 mt-0.5" />
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer of the Service Block */}
                <div className="pt-4 border-t border-stone-100 flex items-center justify-between gap-3 text-xs">
                  {service.durationEstimate && (
                    <span className="flex items-center gap-1.5 text-stone-500 font-medium">
                      <Clock className="w-3.5 h-3.5 text-stone-400" />
                      {service.durationEstimate}
                    </span>
                  )}

                  <button
                    type="button"
                    onClick={() => onSelectServiceToBook(service.id)}
                    className="font-semibold text-[#1B3D36] hover:text-[#122B26] flex items-center gap-1 py-1.5 px-3 rounded-lg hover:bg-stone-100 transition-colors ml-auto"
                  >
                    <span>Agendar</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {/* Trust Footnote on Clinical Ethics */}
        <div className="mt-12 p-6 rounded-2xl bg-[#E8F0EC]/60 border border-[#235347]/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-stone-700">
          <div className="flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-[#235347] shrink-0" />
            <div>
              <span className="font-semibold text-[#122B26] block">
                Prescrição Responsável e Sem Sobrecarga de Exames
              </span>
              <span className="text-stone-600">
                Nosso compromisso é indicar somente procedimentos clinicamente justificados, com diálogo transparente com o tutor antes de qualquer intervenção.
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onSelectServiceToBook('consultas')}
            className="whitespace-nowrap px-4 py-2 rounded-lg bg-[#1B3D36] text-white font-medium hover:bg-[#122B26] transition-colors"
          >
            Falar com a Recepção
          </button>
        </div>

      </div>
    </section>
  );
};
