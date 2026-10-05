import React from 'react';
import { BoutiqueProduct } from '../types';
import { CLINIC_INFO } from '../data/vetData';
import { ImageWithFallback } from './ImageWithFallback';
import { X, Trash2, ShoppingBag, ArrowRight, MessageSquare, AlertCircle } from 'lucide-react';

interface CartItem {
  product: BoutiqueProduct;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  if (!isOpen) return null;

  const hasPrescriptionItem = items.some(item => item.product.prescriptionRequired);

  const handleCheckoutWhatsApp = () => {
    let orderText = `*Reserva de Produtos AuraVet Boutique*\n\n`;
    items.forEach((item, idx) => {
      orderText += `${idx + 1}. ${item.product.title} (x${item.quantity}) - ${item.product.priceFormatted}\n`;
    });
    if (hasPrescriptionItem) {
      orderText += `\n_Observação: Pedido contém item que requer envio de receita veterinária._\n`;
    }
    orderText += `\nGostaria de confirmar a separação para retirada na recepção ou entrega.`;

    const url = `https://wa.me/5511987654321?text=${encodeURIComponent(orderText)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF8F5] text-[#1C2520] shadow-2xl flex flex-col justify-between border-l border-stone-200">
          
          {/* Header */}
          <div className="p-5 sm:p-6 border-b border-stone-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#235347]" />
              <h3 className="font-display font-medium text-xl text-[#122B26]">
                Reserva da Boutique
              </h3>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-200/60 transition-colors"
              aria-label="Fechar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16 text-stone-500 space-y-3">
                <ShoppingBag className="w-12 h-12 text-stone-300 mx-auto" />
                <p className="text-sm">Sua lista de reserva está vazia.</p>
                <p className="text-xs text-stone-400 max-w-xs mx-auto">
                  Explore os itens curados na Boutique Natural & Farmácia e clique em "Reservar".
                </p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between text-xs text-stone-500 pb-2 border-b border-stone-200">
                  <span>{items.length} {items.length === 1 ? 'item selecionado' : 'itens selecionados'}</span>
                  <button
                    type="button"
                    onClick={onClearCart}
                    className="text-stone-400 hover:text-rose-600 transition-colors"
                  >
                    Esvaziar
                  </button>
                </div>

                <div className="space-y-3">
                  {items.map(({ product, quantity }) => (
                    <div
                      key={product.id}
                      className="p-3.5 bg-white rounded-xl border border-stone-200 flex gap-3 text-xs"
                    >
                      <ImageWithFallback
                        src={product.imageUrl}
                        alt={product.title}
                        fallbackText={product.title}
                        className="w-16 h-16 object-cover rounded-lg shrink-0 bg-stone-100"
                      />
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h4 className="font-semibold text-stone-900 line-clamp-1">
                            {product.title}
                          </h4>
                          <span className="text-[11px] text-[#235347] font-medium">
                            {product.priceFormatted}
                          </span>
                        </div>

                        <div className="flex items-center justify-between pt-2">
                          <div className="flex items-center border border-stone-200 rounded-lg">
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(product.id, -1)}
                              className="px-2 py-0.5 text-stone-600 hover:bg-stone-100 rounded-l"
                            >
                              -
                            </button>
                            <span className="px-2 py-0.5 text-stone-900 font-semibold font-mono">
                              {quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(product.id, 1)}
                              className="px-2 py-0.5 text-stone-600 hover:bg-stone-100 rounded-r"
                            >
                              +
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={() => onRemoveItem(product.id)}
                            className="text-stone-400 hover:text-rose-600 p-1"
                            title="Remover item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {hasPrescriptionItem && (
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-[11px] text-amber-900 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                    <span>
                      Itens com receita veterinária necessitam de validação do médico responsável no momento da dispensação.
                    </span>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Footer Actions */}
          {items.length > 0 && (
            <div className="p-5 sm:p-6 border-t border-stone-200 bg-white space-y-3">
              <div className="text-xs text-stone-500">
                Os produtos reservados ficam separados na recepção por até 48 horas ou podem ser despachados via delivery expresso.
              </div>

              <button
                type="button"
                onClick={handleCheckoutWhatsApp}
                className="w-full py-3.5 px-4 rounded-xl bg-[#235347] hover:bg-[#122B26] text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all shadow-sm"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Confirmar Reserva no WhatsApp</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="w-full py-2 text-xs text-stone-600 hover:text-stone-900 text-center"
              >
                Continuar Navegando
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
