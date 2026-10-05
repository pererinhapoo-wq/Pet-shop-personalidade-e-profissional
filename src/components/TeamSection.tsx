import React, { useState } from 'react';
import { VET_TEAM } from '../data/vetData';
import { VetDoctor } from '../types';
import { ImageWithFallback } from './ImageWithFallback';
import { Award, GraduationCap, X, ChevronRight } from 'lucide-react';

export const TeamSection: React.FC = () => {
  const [selectedDoctor, setSelectedDoctor] = useState<VetDoctor | null>(null);

  return (
    <section id="equipe" className="py-16 sm:py-24 bg-white border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs uppercase tracking-wider text-[#235347] font-semibold">
            Corpo Clínico & Responsabilidade Médica
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-normal text-[#122B26] mt-2 mb-4 tracking-tight [text-wrap:balance]">
            Médicos veterinários especialistas com escuta atenta e respeito ao paciente.
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Nossos profissionais combinam pós-graduações e residências hospitalares de ponta com formação contínua em bem-estar e protocolos Fear-Free para reduzir o estresse na consulta.
          </p>
        </div>

        {/* Doctor Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {VET_TEAM.map((doctor) => (
            <article
              key={doctor.id}
              onClick={() => setSelectedDoctor(doctor)}
              className="bg-[#FAF8F5] rounded-2xl border border-stone-200/80 overflow-hidden flex flex-col justify-between cursor-pointer hover:border-[#235347]/50 hover:shadow-md transition-all duration-200 group"
            >
              <div>
                {/* Doctor Avatar / Photo */}
                <div className="relative aspect-[4/5] bg-stone-100 overflow-hidden">
                  <ImageWithFallback
                    src={doctor.avatarUrl}
                    alt={doctor.name}
                    fallbackText={doctor.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter grayscale-[15%] group-hover:grayscale-0"
                  />
                  
                  {/* CRMV Tag in Doctor Photo */}
                  <div className="absolute top-3 left-3 bg-[#FAF8F5]/90 backdrop-blur-sm px-2.5 py-1 rounded text-[11px] font-mono font-medium text-stone-800">
                    {doctor.crmv}
                  </div>
                </div>

                {/* Information */}
                <div className="p-5 space-y-2">
                  <h3 className="font-display font-medium text-lg text-[#122B26] leading-snug group-hover:text-[#235347] transition-colors">
                    {doctor.name}
                  </h3>
                  
                  <p className="text-xs font-semibold text-[#235347]">
                    {doctor.role}
                  </p>

                  <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed pt-1">
                    {doctor.bio}
                  </p>
                </div>
              </div>

              {/* Specialties unboxed pills */}
              <div className="p-5 pt-0 mt-3 border-t border-stone-200/60 flex items-center justify-between text-xs">
                <span className="text-[11px] text-stone-500 font-medium">
                  {doctor.specialties[0]}
                </span>
                <span className="text-[#235347] font-semibold flex items-center gap-0.5 text-xs group-hover:translate-x-0.5 transition-transform">
                  Ver perfil <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* Doctor Bio Modal */}
        {selectedDoctor && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
            <div className="bg-[#FAF8F5] text-[#1C2520] rounded-2xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-stone-200 relative max-h-[90vh] overflow-y-auto">
              <button
                type="button"
                onClick={() => setSelectedDoctor(null)}
                className="absolute top-5 right-5 text-stone-400 hover:text-stone-700 p-2 rounded-full hover:bg-stone-200/60 transition-colors"
                aria-label="Fechar"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full overflow-hidden shrink-0 border border-stone-300">
                  <ImageWithFallback
                    src={selectedDoctor.avatarUrl}
                    alt={selectedDoctor.name}
                    fallbackText={selectedDoctor.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-display font-medium text-xl text-[#122B26]">
                    {selectedDoctor.name}
                  </h3>
                  <div className="text-xs font-semibold text-[#235347]">
                    {selectedDoctor.role}
                  </div>
                  <div className="text-[11px] font-mono text-stone-500">
                    {selectedDoctor.crmv}
                  </div>
                </div>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-stone-600 leading-relaxed mb-6">
                <div>
                  <span className="font-semibold text-stone-900 block mb-1">
                    Trajetória & Filosofia Médica:
                  </span>
                  <p>{selectedDoctor.bio}</p>
                </div>

                <div className="p-3.5 bg-stone-100 rounded-xl text-xs space-y-1.5">
                  <div className="flex items-center gap-1.5 font-semibold text-stone-800">
                    <GraduationCap className="w-4 h-4 text-[#235347]" />
                    <span>Formação Acadêmica:</span>
                  </div>
                  <p className="text-stone-600 pl-5">{selectedDoctor.education}</p>
                </div>

                <div>
                  <span className="font-semibold text-stone-900 block mb-1">
                    Especialidades Atendidas:
                  </span>
                  <div className="flex flex-wrap gap-2 text-xs">
                    {selectedDoctor.specialties.map((spec, sIdx) => (
                      <span key={sIdx} className="bg-white border border-stone-200 px-2.5 py-1 rounded-md text-stone-700">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedDoctor(null)}
                className="w-full py-2.5 px-4 text-xs font-semibold bg-[#1B3D36] text-white rounded-xl hover:bg-[#122B26] transition-colors"
              >
                Concluir Visualização
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
