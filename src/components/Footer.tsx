import React from 'react';
import { CLINIC_INFO } from '../data/vetData';
import { MapPin, Phone, Mail, Clock, ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#122B26] text-stone-300 pt-16 pb-12 border-t border-[#28594F]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          
          {/* Brand & Editorial Column (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <span className="font-display font-medium text-3xl tracking-tight text-white block">
              AuraVet
            </span>
            <p className="text-xs sm:text-sm text-stone-400 max-w-sm leading-relaxed">
              {CLINIC_INFO.editorialStatement}
            </p>
            <div className="pt-2 text-xs text-emerald-400/90 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Responsável Técnico: {CLINIC_INFO.technicalResponsible}</span>
            </div>
          </div>

          {/* Quick Navigation Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3 text-xs">
            <span className="text-xs uppercase tracking-wider text-stone-400 font-semibold block">
              Estrutura & Serviços
            </span>
            <ul className="space-y-2">
              <li>
                <a href="#servicos" className="hover:text-white transition-colors">
                  Consultas & Especialidades
                </a>
              </li>
              <li>
                <a href="#servicos" className="hover:text-white transition-colors">
                  Diagnósticos & Imagem
                </a>
              </li>
              <li>
                <a href="#estrutura" className="hover:text-white transition-colors">
                  Ala Felina Cat-Friendly
                </a>
              </li>
              <li>
                <a href="#servicos" className="hover:text-white transition-colors">
                  SPA & Estética Silenciosa
                </a>
              </li>
              <li>
                <a href="#boutique" className="hover:text-white transition-colors">
                  Boutique & Farmácia
                </a>
              </li>
            </ul>
          </div>

          {/* Hours & Plantão (2 cols) */}
          <div className="lg:col-span-2 space-y-3 text-xs">
            <span className="text-xs uppercase tracking-wider text-stone-400 font-semibold block">
              Horários
            </span>
            <div className="space-y-2 text-stone-400">
              <p>
                <strong className="text-white block font-medium">Atendimento Clínico:</strong>
                {CLINIC_INFO.hours.weekdays}
              </p>
              <p>
                <strong className="text-white block font-medium">Sábados:</strong>
                {CLINIC_INFO.hours.saturday}
              </p>
              <p className="text-rose-400 font-semibold">
                {CLINIC_INFO.hours.emergency}
              </p>
            </div>
          </div>

          {/* Coordinates and Contact (3 cols) */}
          <div className="lg:col-span-3 space-y-3 text-xs">
            <span className="text-xs uppercase tracking-wider text-stone-400 font-semibold block">
              Localização & Contato
            </span>
            <div className="space-y-2.5 text-stone-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{CLINIC_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{CLINIC_INFO.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{CLINIC_INFO.email}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & NexaWeb Portfolio Signature */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            © {new Date().getFullYear()} AuraVet Medicina Integrada Ltda. Todos os direitos reservados.
          </div>

          {/* NexaWeb Agency Signature */}
          <div className="flex items-center gap-2 bg-[#0C1F1B] px-3.5 py-1.5 rounded-full border border-white/5 text-[11px] text-stone-400">
            <span>Desenvolvido com excelência autoral por</span>
            <span className="font-semibold text-emerald-400">NexaWeb</span>
            <span aria-hidden="true" className="text-stone-600">·</span>
            <span className="text-stone-400">DEMO Portfólio</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
