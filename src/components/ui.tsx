
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ArrowUpRight } from 'lucide-react';

export const GlassCard = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { hover?: boolean }>(
  ({ className, hover = true, children, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        whileHover={hover ? { y: -2 } : {}}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className={cn(
          "rounded-[32px] bg-chrome-surface backdrop-blur-2xl backdrop-saturate-150",
          "ring-1 ring-chrome-ring shadow-glass",
          hover && "hover:ring-white/[0.25] hover:shadow-glass-hover transition-all duration-300",
          className
        )}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);
GlassCard.displayName = 'GlassCard';

export const Button = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'ghost', withArrow?: boolean }>(
  ({ className, variant = 'primary', withArrow, children, ...props }, ref) => {
    const base = "inline-flex items-center justify-center gap-2 rounded-full px-6 h-12 font-medium transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none";
    
    const variants = {
      primary: "bg-white text-black hover:bg-white/90 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]",
      secondary: "bg-white/[0.04] text-white ring-1 ring-white/15 hover:ring-white/30 backdrop-blur-md",
      ghost: "text-white/70 hover:text-white hover:bg-white/[0.06]"
    };

    return (
      <button ref={ref} className={cn(base, variants[variant], className)} {...props}>
        {children}
        {withArrow && <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />}
      </button>
    );
  }
);
Button.displayName = 'Button';

export const Eyebrow = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={cn("uppercase text-[11px] tracking-[0.18em] text-white/55 flex items-center gap-2 font-display", className)}>
    <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
    {children}
  </div>
);

export const Heading = ({ children, className, as: Component = 'h2' }: { children: React.ReactNode, className?: string, as?: any }) => (
  <Component className={cn("font-display text-[clamp(32px,4.5vw,56px)] leading-[1.1] tracking-[-0.03em] text-balance", className)}>
    {children}
  </Component>
);

export const RevealText = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 14 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.6, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
  >
    {children}
  </motion.div>
);
