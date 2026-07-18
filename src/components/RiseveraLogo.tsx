import { CSSProperties } from 'react';
import logoColor from '../assets/images/logo_color.png';
import logoInverted from '../assets/images/logo_inverted.png';

interface RiseveraLogoProps {
  className?: string;
  isDarkBackground?: boolean;
}

export default function RiseveraLogo({
  className = "h-8 w-8",
  isDarkBackground = true
}: RiseveraLogoProps) {
  const imgSrc = isDarkBackground ? logoInverted : logoColor;

  return (
    <div className={`relative select-none flex items-center justify-center ${className}`}>
      <img
        src={imgSrc}
        alt="Risevera Global Logo"
        className="w-full h-full object-contain"
        referrerPolicy="no-referrer"
        onError={(e) => {
          // Fall back gracefully to a solid typographic brand icon if PNG is empty/not present
          e.currentTarget.style.display = 'none';
          const parent = e.currentTarget.parentElement;
          if (parent) {
            if (!parent.querySelector('.logo-fallback')) {
              const fallback = document.createElement('div');
              fallback.className = 'logo-fallback flex items-center justify-center font-black text-sm rounded bg-[#F07125] text-white w-full h-full shadow-sm';
              fallback.innerText = 'R';
              parent.appendChild(fallback);
            }
          }
        }}
      />
    </div>
  );
}
