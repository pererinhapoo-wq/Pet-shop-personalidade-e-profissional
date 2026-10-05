import React, { useState } from 'react';
import { SERVICES_LIST, CLINIC_INFO } from '../data/vetData';
import { PetSpecies } from '../types';
import { X, Calendar, Check, MessageSquare, ArrowRight } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedServiceId?: string;
  initialSpecies?: PetSpecies;
  initialNotes?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preselectedServiceId,
  initialSpecies = 'dog',
  initialNotes = '',
}) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [submitted, setSubmitted] = useState(false);

  // Form Fields
  const [serviceId, setServiceId] = useState<string>(preselectedServiceId || 'consultas');
  const [species, setSpecies] = useState<PetSpecies>(initialSpecies);
  const [petName, setPetName] = useState('');
  const [petAge, setPetAge] = useState('');
  const [tutorName, setTutorName] = useState('');
  const [tutorPhone, setTutorPhone] = useState('');
  const [tutorEmail, setTutorEmail] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTimePeriod, setPreferredTimePeriod] = useState<'manha' | 'tarde' | 'noite'>('manha');
  const [notes, setNotes] = useState(initialNotes);

  if (!isOpen) return null;

  const currentService = SERVICES_LIST.find(s => s.id === serviceId) || SERVICES_LIST[0];

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (!petName.trim() || !tutorName.trim() || !tutorPhone.trim()) {
      alert('Por favor, preencha o nome do pet, seu nome e telefone WhatsApp.');
      return;
    }
    setStep(2);
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleSendToWhatsApp = () => {
    const periodLabel = preferredTimePeriod === 'manha' ? 'Manhã (08h às 12h)' : preferredTimePeriod === 'tarde' ? 'Tarde (13h às 18h)' : 'Noite (18h às 21h)';
    const text = `*Solicitação de Agendamento AuraVet*\n\n` +
      `*Serviço:* ${currentService.title}\n` +
      `*Paciente:* ${petName} (${species === 'dog' ? 'Cão' : 'Gato'} - ${petAge || 'idade não inf.'})\n` +
      `*Tutor:* ${tutorName} (${tutorPhone})\n` +
      `*Data Preferencial:* ${preferredDate || 'A combinar'}\n` +
      `*Período:* ${periodLabel}\n` +
      (notes ? `*Observações:* ${notes}` : '');

    const url = `https://wa.me/5511987654321?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-[#FAF8F5] text-[#1C2520] rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-stone-200 relative max-h-[92vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 text-stone-400 hover:text-stone-700 p-2 rounded-full hover:bg-stone-200/60 transition-colors"
          aria-label="Fechar janela"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            {/* Header */}
            <div className="mb-6">
              <span className="text-xs uppercase tracking-wider text-[#235347] font-semibold">
                Agendamento de Consulta & Cuidados
              </span>
              <h2 className="font-display font-medium text-2xl text-[#122B26] mt-1">
                {step === 1 ? 'Dados do Paciente & Serviço' : 'Preferência de Data & Confirmação'}
              </h2>
              <p className="text-xs text-stone-500 mt-1">
                Etapa {step} de 2 • Recepção entrará em contato para confirmar o horário exato.
              </p>
            </div>

            {/* Step 1: Patient and Tutor info */}
            {step === 1 && (
              <form onSubmit={handleNextStep} className="space-y-4 text-xs">
                
                {/* Select Service */}
                <div>
                  <label className="block font-semibold text-stone-700 mb-1.5">
                    Serviço Solicitado:
                  </label>
                  <select
                    value={serviceId}
                    onChange={(e) => setServiceId(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-stone-300 bg-white text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#235347]"
                  >
                    {SERVICES_LIST.map((srv) => (
                      <option key={srv.id} value={srv.id}>
                        {srv.title} ({srv.highlightBadge || 'AuraVet'})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Species Selector */}
                <div>
                  <label className="block font-semibold text-stone-700 mb-1.5">
                    Espécie do Animal:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setSpecies('dog')}
                      className={`py-2 px-3 rounded-lg font-medium border text-center transition-all ${
                        species === 'dog'
                          ? 'bg-[#1B3D36] text-white border-[#1B3D36]'
                          : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                      }`}
                    >
                      🐕 Canino (Cão)
                    </button>
                    <button
                      type="button"
                      onClick={() => setSpecies('cat')}
                      className={`py-2 px-3 rounded-lg font-medium border text-center transition-all ${
                        species === 'cat'
                          ? 'bg-[#1B3D36] text-white border-[#1B3D36]'
                          : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                      }`}
                    >
                      🐈 Felino (Gato - Ala Felina)
                    </button>
                  </div>
                </div>

                {/* Pet Name & Age */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">
                      Nome do Pet *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Theo, Luna, Pipoca"
                      value={petName}
                      onChange={(e) => setPetName(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-stone-300 bg-white text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#235347]"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">
                      Idade Aprox.
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: 8 meses, 4 anos"
                      value={petAge}
                      onChange={(e) => setPetAge(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-stone-300 bg-white text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#235347]"
                    />
                  </div>
                </div>

                {/* Tutor Info */}
                <div className="pt-2 border-t border-stone-200/80 space-y-3">
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">
                      Nome do Tutor Responsável *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Seu nome completo"
                      value={tutorName}
                      onChange={(e) => setTutorName(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-stone-300 bg-white text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#235347]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-stone-700 mb-1">
                        WhatsApp de Contato *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="(11) 98765-4321"
                        value={tutorPhone}
                        onChange={(e) => setTutorPhone(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-stone-300 bg-white text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#235347]"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-stone-700 mb-1">
                        E-mail
                      </label>
                      <input
                        type="email"
                        placeholder="seu@email.com"
                        value={tutorEmail}
                        onChange={(e) => setTutorEmail(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-stone-300 bg-white text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#235347]"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="submit"
                    className="py-3 px-5 rounded-xl bg-[#1B3D36] hover:bg-[#122B26] text-white font-semibold flex items-center gap-2 transition-all shadow-sm"
                  >
                    <span>Prosseguir para Data</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </form>
            )}

            {/* Step 2: Date & Preference */}
            {step === 2 && (
              <form onSubmit={handleFinalSubmit} className="space-y-4 text-xs">
                
                <div>
                  <label className="block font-semibold text-stone-700 mb-1.5">
                    Data Desejada:
                  </label>
                  <input
                    type="date"
                    required
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-stone-300 bg-white text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#235347]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1.5">
                    Turno de Preferência:
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'manha', label: 'Manhã', time: '08h - 12h' },
                      { id: 'tarde', label: 'Tarde', time: '13h - 18h' },
                      { id: 'noite', label: 'Noite', time: '18h - 21h' },
                    ].map((turn) => (
                      <button
                        key={turn.id}
                        type="button"
                        onClick={() => setPreferredTimePeriod(turn.id as any)}
                        className={`p-2.5 rounded-xl border text-center transition-all ${
                          preferredTimePeriod === turn.id
                            ? 'bg-[#1B3D36] text-white border-[#1B3D36]'
                            : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                        }`}
                      >
                        <span className="block font-semibold">{turn.label}</span>
                        <span className="block text-[10px] opacity-80">{turn.time}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Histórico Clínico ou Observações (opcional):
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Conte-nos o motivo da consulta, se o pet é reativo, alérgico ou se há urgência..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-stone-300 bg-white text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#235347]"
                  />
                </div>

                {/* Summary box */}
                <div className="p-3.5 bg-stone-100 rounded-xl text-stone-700 space-y-1">
                  <div><strong>Paciente:</strong> {petName} ({species === 'dog' ? 'Cão' : 'Gato'})</div>
                  <div><strong>Serviço:</strong> {currentService.title}</div>
                  <div><strong>Tutor:</strong> {tutorName} • {tutorPhone}</div>
                </div>

                <div className="pt-3 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="py-2.5 px-4 rounded-xl border border-stone-300 text-stone-700 hover:bg-stone-100 font-medium transition-colors"
                  >
                    Voltar
                  </button>

                  <button
                    type="submit"
                    className="py-3 px-6 rounded-xl bg-[#1B3D36] hover:bg-[#122B26] text-white font-semibold transition-all shadow-sm"
                  >
                    Concluir Solicitação
                  </button>
                </div>

              </form>
            )}
          </div>
        ) : (
          /* Confirmation Screen */
          <div className="text-center py-6 space-y-5">
            <div className="w-14 h-14 bg-emerald-100 text-[#235347] rounded-full flex items-center justify-center mx-auto">
              <Check className="w-7 h-7" />
            </div>

            <div>
              <span className="text-xs uppercase tracking-wider text-emerald-800 font-semibold">
                Solicitação Registrada
              </span>
              <h3 className="font-display font-medium text-2xl text-[#122B26] mt-1">
                Tudo pronto, {tutorName}!
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 mt-2 max-w-md mx-auto leading-relaxed">
                Nossa equipe de recepção clínica entrará em contato via WhatsApp no número <strong>{tutorPhone}</strong> para confirmar a disponibilidade do horário para o <strong>{petName}</strong>.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#FAF8F5] border border-stone-200 text-left text-xs text-stone-700 space-y-1.5 max-w-sm mx-auto">
              <div><strong>Procedimento:</strong> {currentService.title}</div>
              <div><strong>Data Solicitada:</strong> {preferredDate || 'A combinar com a recepção'}</div>
              <div><strong>Paciente:</strong> {petName} ({species === 'dog' ? 'Cão' : 'Gato - Ala Felina'})</div>
            </div>

            <div className="space-y-2 pt-2">
              <button
                type="button"
                onClick={handleSendToWhatsApp}
                className="w-full py-3 px-4 rounded-xl bg-[#235347] hover:bg-[#122B26] text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Agilizar Confirmação via WhatsApp</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="w-full py-2.5 px-4 text-xs text-stone-600 hover:text-stone-900 transition-colors"
              >
                Fechar Janela
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
