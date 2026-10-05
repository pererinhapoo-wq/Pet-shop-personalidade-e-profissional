import React, { useState } from 'react';
import { Stethoscope, Sparkles } from 'lucide-react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
  fallbackText?: string;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  fallbackSrc,
  fallbackText = 'AuraVet Cuidados',
  alt,
  className = '',
  ...props
}) => {
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
    }
  };

  if (hasError && !fallbackSrc) {
    return (
      <div
        className={`bg-gradient-to-br from-[#1B3D36] to-[#122B26] text-white flex flex-col items-center justify-center p-6 text-center select-none ${className}`}
        role="img"
        aria-label={alt || fallbackText}
      >
        <Stethoscope className="w-8 h-8 text-emerald-300 mb-2 opacity-80" />
        <span className="font-display font-medium text-sm text-stone-200">{fallbackText}</span>
        <span className="text-[11px] text-emerald-400/80 mt-1">Medicina Integrada & Boutique</span>
      </div>
    );
  }

  return (
    <img
      src={hasError && fallbackSrc ? fallbackSrc : src}
      alt={alt || fallbackText}
      onError={handleError}
      referrerPolicy="no-referrer"
      className={className}
      {...props}
    />
  );
};
