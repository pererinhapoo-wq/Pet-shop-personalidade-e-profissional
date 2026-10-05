import React, { useState } from 'react';
import { BOUTIQUE_PRODUCTS, CLINIC_INFO } from '../data/vetData';
import { BoutiqueProduct, PlanTier } from '../types';
import { ImageWithFallback } from './ImageWithFallback';
import { ShoppingBag, Sparkles, AlertCircle, Check, ArrowRight, X } from 'lucide-react';

interface BoutiquePharmacySectionProps {
  currentTier: PlanTier;
  onAddToCart?: (product: BoutiqueProduct) => void;
}

export const BoutiquePharmacySection: React.FC<BoutiquePharmacySectionProps> = ({
  currentTier,
  onAddToCart,
}) => {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [selectedProduct, setSelectedProduct] = useState<BoutiqueProduct | null>(null);
  const [addedSuccessId, setAddedSuccessId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'Todos os Itens Curados' },
    { id: 'nutricao', label: 'Nutrição Funcional' },
    { id: 'dermatologia', label: 'Dermo-Cuidado' },
    { id: 'farmacia', label: 'Farmácia Veterinária' },
    { id: 'enriquecimento', label: 'Cognição & Brinquedos' },
  ];

  const filteredProducts = activeTab === 'all'
    ? BOUTIQUE_PRODUCTS
    : BOUTIQUE_PRODUCTS.filter(p => p.category === activeTab);

  const handleAdd = (product: BoutiqueProduct) => {
    if (onAddToCart) {
      onAddToCart(product);
      setAddedSuccessId(product.id);
      setTimeout(() => setAddedSuccessId(null), 2000);
    }
  };

  const handleWhatsAppInquiry = (product: BoutiqueProduct) => {
    const text = `Olá AuraVet! Gostaria de consultar a disponibilidade e reservar o item: "${product.title}" (${product.priceFormatted}).`;
    const url = `https://wa.me/5511987654321?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="boutique" className="py-16 sm:py-24 bg-[#FAF8F5] border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-wider text-[#235347] font-semibold">
              Boutique Natural & Farmácia Veterinária
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-normal text-[#122B26] mt-2 mb-3 tracking-tight [text-wrap:balance]">
              Seleção curada de nutrição, dermocosméticos e enriquecimento etológico.
            </h2>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              Sem alimentos ultraprocessados ou brinquedos com risco de corpo estranho. Todos os itens de nossa prateleira passam pela aprovação técnica do nosso corpo clínico veterinário.
            </p>
          </div>

          <div className="text-xs text-stone-500 bg-white p-4 rounded-xl border border-stone-200 shrink-0">
            <span className="font-semibold text-stone-800 block mb-0.5">
              Farmácia & Manipulação:
            </span>
            <span>Retirada expressa na clínica ou entrega em domicílio.</span>
          </div>
        </div>

        {/* Category Tabs for filtering */}
        <div className="flex items-center gap-1.5 p-1 bg-stone-200/70 rounded-xl overflow-x-auto mb-10 max-w-fit scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveTab(cat.id)}
              className={`px-3.5 py-2 text-xs font-medium rounded-lg transition-all whitespace-nowrap ${
                activeTab === cat.id
                  ? 'bg-white text-[#122B26] shadow-sm font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Product Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProducts.map((product) => {
            const isJustAdded = addedSuccessId === product.id;

            return (
              <article
                key={product.id}
                className="bg-white rounded-2xl border border-stone-200/90 overflow-hidden flex flex-col justify-between hover:shadow-md hover:border-[#235347]/40 transition-all duration-200 group"
              >
                <div>
                  {/* Product Image Slot with Fallback */}
                  <div className="relative aspect-[4/3] bg-stone-100 overflow-hidden">
                    <ImageWithFallback
                      src={product.imageUrl}
                      alt={product.title}
                      fallbackText={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    {/* Category Label Overlay */}
                    <div className="absolute top-3 left-3 bg-[#FAF8F5]/90 backdrop-blur-sm px-2.5 py-1 rounded-md text-[11px] font-semibold text-[#122B26]">
                      {product.categoryLabel}
                    </div>

                    {product.prescriptionRequired && (
                      <div className="absolute top-3 right-3 bg-amber-100/95 text-amber-900 px-2 py-0.5 rounded text-[10px] font-semibold flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 text-amber-700" />
                        <span>Prescrição Vet</span>
                      </div>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="p-5 sm:p-6 space-y-3">
                    <h3 className="font-display font-medium text-lg text-[#122B26] leading-snug line-clamp-2">
                      {product.title}
                    </h3>

                    <p className="text-xs text-stone-600 leading-relaxed line-clamp-2">
                      {product.shortDesc}
                    </p>

                    {/* Composition highlight */}
                    <div className="text-[11px] text-stone-500 bg-[#FAF8F5] p-2.5 rounded-lg border border-stone-100">
                      <span className="font-semibold text-stone-700">Destaque técnico:</span> {product.compositionHighlight}
                    </div>

                    {/* Unboxed tags */}
                    <div className="flex flex-wrap items-center gap-2 text-[11px] text-stone-500 pt-1">
                      {product.tags.map((tag, tIdx) => (
                        <span key={tIdx} className="after:content-['·'] last:after:content-none after:ml-2">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Actions Footer */}
                <div className="p-5 sm:p-6 pt-0 border-t border-stone-100 mt-4 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[11px] text-stone-400 block font-medium">Valor Unitário</span>
                    <span className="font-display font-semibold text-lg text-[#122B26] tabular-nums">
                      {product.priceFormatted}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedProduct(product)}
                      className="p-2 text-stone-500 hover:text-stone-800 text-xs rounded-lg hover:bg-stone-100 transition-colors"
                      title="Ver detalhes técnicos"
                    >
                      Detalhes
                    </button>

                    {currentTier === 'personalizado' ? (
                      <button
                        type="button"
                        onClick={() => handleAdd(product)}
                        className={`py-2 px-3 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                          isJustAdded
                            ? 'bg-emerald-600 text-white'
                            : 'bg-[#1B3D36] hover:bg-[#122B26] text-white'
                        }`}
                      >
                        {isJustAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Reservado!</span>
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span>Reservar</span>
                          </>
                        )}
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleWhatsAppInquiry(product)}
                        className="py-2 px-3 rounded-lg text-xs font-semibold bg-[#235347] hover:bg-[#122B26] text-white flex items-center gap-1.5 transition-colors"
                      >
                        <span>Pedir no Whats</span>
                      </button>
                    )}
                  </div>
                </div>

              </article>
            );
          })}
        </div>

        {/* Product Details Modal */}
        {selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
            <div className="bg-[#FAF8F5] text-[#1C2520] rounded-2xl max-w-xl w-full p-6 sm:p-7 shadow-2xl border border-stone-200 relative max-h-[90vh] overflow-y-auto">
              <button
                type="button"
                onClick={() => setSelectedProduct(null)}
                className="absolute top-5 right-5 text-stone-400 hover:text-stone-700 p-2 rounded-full hover:bg-stone-200/60 transition-colors"
                aria-label="Fechar"
              >
                <X className="w-5 h-5" />
              </button>

              <span className="text-xs uppercase tracking-wider text-[#235347] font-semibold">
                {selectedProduct.categoryLabel}
              </span>
              <h3 className="font-display font-medium text-2xl text-[#122B26] mt-1 mb-3">
                {selectedProduct.title}
              </h3>

              <div className="aspect-video w-full rounded-xl overflow-hidden mb-4 bg-stone-100">
                <ImageWithFallback
                  src={selectedProduct.imageUrl}
                  alt={selectedProduct.title}
                  fallbackText={selectedProduct.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-stone-600 leading-relaxed mb-6">
                <p>{selectedProduct.fullDesc}</p>
                <div className="p-3.5 bg-stone-100/80 rounded-xl text-stone-800 text-xs">
                  <strong>Indicação Técnica:</strong> {selectedProduct.compositionHighlight}
                </div>
                {selectedProduct.prescriptionRequired && (
                  <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-xs flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                    <span>
                      Este produto requer receita médica veterinária válida para dispensação. Apresente-a no balcão ou envie digitalmente pelo WhatsApp.
                    </span>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-stone-200">
                <div>
                  <span className="text-xs text-stone-400 block font-medium">Preço</span>
                  <span className="font-display font-semibold text-xl text-[#122B26] tabular-nums">
                    {selectedProduct.priceFormatted}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      handleWhatsAppInquiry(selectedProduct);
                      setSelectedProduct(null);
                    }}
                    className="py-2.5 px-4 text-xs font-semibold rounded-xl border border-stone-300 hover:bg-stone-100 text-stone-700 transition-colors"
                  >
                    Dúvida via WhatsApp
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      handleAdd(selectedProduct);
                      setSelectedProduct(null);
                    }}
                    className="py-2.5 px-4 text-xs font-semibold rounded-xl bg-[#1B3D36] hover:bg-[#122B26] text-white transition-colors"
                  >
                    Adicionar à Reserva
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
