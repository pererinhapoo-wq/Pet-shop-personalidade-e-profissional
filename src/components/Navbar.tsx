import React, { useState } from 'react';
import { CLINIC_INFO } from '../data/vetData';
import { Calendar, PhoneCall, ShoppingBag, Menu, X } from 'lucide-react';
import { PlanTier } from '../types';

interface NavbarProps {
  onOpenBooking: () => void;
  onOpenCart?: () => void;
  cartCount?: number;
  currentTier: PlanTier;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenBooking,
  onOpenCart,
  cartCount = 0,
  currentTier,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-stone-200/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Zone 1: Single text element Brand Wordmark (Strict Top Bar Contract) */}
          <a
            href="#"
            className="font-display font-medium text-2xl sm:text-3xl tracking-tight text-[#122B26] hover:text-[#235347] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#235347]"
          >
            AuraVet
          </a>

          {/* Zone 2: 4-6 clean text navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-600">
            <a
              href="#servicos"
              className="hover:text-[#122B26] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#235347] rounded"
            >
              Serviços
            </a>
            {currentTier === 'personalizado' && (
              <a
                href="#protocolo-preventivo"
                className="hover:text-[#122B26] transition-colors flex items-center gap-1 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#235347] rounded"
              >
                Guia Preventivo
              </a>
            )}
            <a
              href="#estrutura"
              className="hover:text-[#122B26] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#235347] rounded"
            >
              Ala Felina
            </a>
            <a
              href="#boutique"
              className="hover:text-[#122B26] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#235347] rounded"
            >
              Boutique
            </a>
            <a
              href="#equipe"
              className="hover:text-[#122B26] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#235347] rounded"
            >
              Corpo Clínico
            </a>
            <a
              href="#triagem"
              className="hover:text-[#122B26] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#235347] rounded"
            >
              Triagem 24h
            </a>
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="flex items-center gap-3">
            {/* Plantão Hotline Link */}
            <a
              href={`tel:${CLINIC_INFO.phone}`}
              className="hidden lg:flex items-center gap-1.5 text-xs font-medium text-stone-700 hover:text-[#122B26] px-3 py-2 rounded-lg transition-colors border border-stone-200/80 hover:bg-stone-100"
              title="Linha direta de atendimento"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#235347]" />
              <span className="whitespace-nowrap">{CLINIC_INFO.phone}</span>
            </a>

            {/* Boutique Cart Trigger (Personalizado mode or when cart has items) */}
            {onOpenCart && (
              <button
                type="button"
                onClick={onOpenCart}
                className="relative p-2.5 text-stone-700 hover:text-[#122B26] hover:bg-stone-100 rounded-lg transition-colors"
                aria-label={`Carrinho de reservas com ${cartCount} itens`}
              >
                <ShoppingBag className="w-5 h-5 text-[#122B26]" />
                {cartCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-amber-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            )}

            {/* Primary Action Button */}
            <button
              type="button"
              onClick={onOpenBooking}
              className="py-2.5 px-4 text-xs sm:text-sm font-medium text-white bg-[#1B3D36] hover:bg-[#122B26] rounded-xl transition-all shadow-sm hover:shadow active:scale-[0.98] flex items-center gap-2 whitespace-nowrap"
            >
              <Calendar className="w-4 h-4 text-emerald-300" />
              <span>Agendar Horário</span>
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-stone-700 hover:text-stone-900 rounded-lg"
              aria-label="Abrir menu de navegação"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAF8F5] border-b border-stone-200 px-5 pt-3 pb-6 animate-in slide-in-from-top-2 duration-150">
          <nav className="flex flex-col space-y-3 text-sm font-medium text-stone-800">
            <a
              href="#servicos"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-stone-100"
            >
              Serviços Veterinários
            </a>
            {currentTier === 'personalizado' && (
              <a
                href="#protocolo-preventivo"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 border-b border-stone-100 text-amber-800 font-semibold"
              >
                Guia de Saúde Preventiva (Simulador)
              </a>
            )}
            <a
              href="#estrutura"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-stone-100"
            >
              Ala Felina & Estrutura
            </a>
            <a
              href="#boutique"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-stone-100"
            >
              Boutique & Farmácia Curada
            </a>
            <a
              href="#equipe"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-stone-100"
            >
              Corpo Clínico
            </a>
            <a
              href="#triagem"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2"
            >
              Guia de Triagem 24 Horas
            </a>

            <div className="pt-3 flex flex-col gap-2">
              <a
                href={`tel:${CLINIC_INFO.phone}`}
                className="flex items-center justify-center gap-2 py-2.5 text-xs font-semibold text-[#122B26] bg-stone-100 rounded-xl"
              >
                <PhoneCall className="w-4 h-4 text-[#235347]" />
                Ligar para o Centro: {CLINIC_INFO.phone}
              </a>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full py-3 text-sm font-semibold text-white bg-[#1B3D36] rounded-xl flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                Agendar Consulta ou Estética
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
