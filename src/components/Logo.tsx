import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'light' | 'dark';
  hideIcon?: boolean;
}

const Logo: React.FC<LogoProps> = ({ 
  className = "", 
  size = 'md', 
  variant = 'dark',
  hideIcon = false 
}) => {
  const sizes = {
    sm: { h: 'h-8', icon: 'w-6 h-6', text: 'text-sm', img: 'h-6' },
    md: { h: 'h-12', icon: 'w-10 h-10', text: 'text-lg', img: 'h-8' },
    lg: { h: 'h-16', icon: 'w-14 h-14', text: 'text-xl', img: 'h-12' },
    xl: { h: 'h-24', icon: 'w-20 h-20', text: 'text-3xl', img: 'h-20' }
  };

  // TO CHANGE THE LOGO: 
  // 1. Upload your logo image (e.g. 'logo.png') into the "public" folder.
  // 2. Set the path to your image here (e.g. '/logo.png')
  // 3. Save this file, and the app will use your image instead of the built-in icon.
  const LOGO_IMAGE_URL = '/erandum.jpg'; 

  const current = sizes[size];
  const textColor = variant === 'dark' ? 'text-primary' : 'text-white';
  const taglineColor = variant === 'dark' ? 'text-muted' : 'text-white/60';

  return (
    <Link to="/" className={`flex items-center gap-3 sm:gap-4 group ${className}`}>
      {/* Brand Icon */}
      {!hideIcon && (
        LOGO_IMAGE_URL ? (
          <img 
            src={LOGO_IMAGE_URL} 
            alt="Erandum Homes" 
            className={`${current.img} w-auto object-contain`}
          />
        ) : (
          <div className={`relative ${current.icon} flex items-end justify-start overflow-visible`}>
            <div className="flex items-end gap-[1px] sm:gap-[2px] w-full h-[70%]">
              <div className="flex-1 h-[30%] bg-[#004e32] rounded-[1px]"></div>
              <div className="flex-1 h-[55%] bg-[#004e32]/90 rounded-[1px]"></div>
              <div className="flex-1 h-[80%] bg-[#004e32]/80 rounded-[1px]"></div>
              <div className="flex-1 h-[100%] bg-accent rounded-[1px]"></div>
            </div>
            <svg 
              className={`absolute top-0 right-0 w-[55%] h-[55%] ${textColor} transition-transform group-hover:-translate-y-1`} 
              viewBox="0 0 24 24" 
              fill="currentColor"
            >
              <path d="M13.49 5.42c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM5.07 22h2.7l1.13-5.26 2.35 2.1c.14.13.33.21.54.21h6.21v-2h-5.03l-2.07-1.85 1.1-5.12c.45.83 1.25 1.48 2.22 1.76v-2.05c-.83-.24-1.48-.84-1.8-1.61l-.9-2.22c-.22-.52-.66-.9-1.21-.99-.09-.01-.18-.01-.26-.01-.39 0-.74.15-1.02.4L3.06 10.51l1.18 1.62 2.3-.92L5.07 22z"/>
            </svg>
          </div>
        )
      )}

      {/* Brand Text */}
      <div className="flex flex-col">
        <h1 className={`${current.text} font-display font-bold tracking-[0.1em] ${textColor} leading-none uppercase`}>
          Erandum <span className="text-accent underline decoration-1 underline-offset-4 decoration-accent/30">Homes</span>
        </h1>
        {(size !== 'sm') && (
          <p className={`${taglineColor} text-[7px] sm:text-[8px] uppercase tracking-[0.2em] font-bold mt-1.5 transition-colors group-hover:text-accent`}>
            We run your errands and take the stress off you...
          </p>
        )}
      </div>
    </Link>
  );
};

export default Logo;
