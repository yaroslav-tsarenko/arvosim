'use client';

import { motion } from 'framer-motion';

function SimCard({ color, label, flag, delay, className }: { color: string; label: string; flag: string; delay: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotate: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      className={`absolute ${className}`}
    >
      <div
        className="relative w-[180px] h-[112px] rounded-2xl shadow-xl border border-white/30 backdrop-blur-sm p-4 flex flex-col justify-between overflow-hidden"
        style={{ background: color }}
      >
        <div className="absolute top-0 right-0 w-20 h-20 rounded-full bg-white/10 -translate-y-1/2 translate-x-1/2" />
        <div className="flex items-center justify-between relative z-10">
          <span className="text-white/80 text-[10px] font-semibold tracking-widest uppercase">eSIM</span>
          <span className="text-2xl">{flag}</span>
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-1.5 mb-1">
            <div className="w-8 h-6 rounded bg-amber-300/90 flex items-center justify-center">
              <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
                <rect x="0" y="0" width="5" height="4" rx="0.5" fill="#D97706" opacity="0.7"/>
                <rect x="5.5" y="0" width="5" height="4" rx="0.5" fill="#D97706" opacity="0.5"/>
                <rect x="11" y="0" width="5" height="4" rx="0.5" fill="#D97706" opacity="0.7"/>
                <rect x="0" y="4.5" width="5" height="3" rx="0.5" fill="#D97706" opacity="0.5"/>
                <rect x="5.5" y="4.5" width="5" height="3" rx="0.5" fill="#D97706" opacity="0.7"/>
                <rect x="11" y="4.5" width="5" height="3" rx="0.5" fill="#D97706" opacity="0.5"/>
                <rect x="0" y="8" width="5" height="4" rx="0.5" fill="#D97706" opacity="0.7"/>
                <rect x="5.5" y="8" width="5" height="4" rx="0.5" fill="#D97706" opacity="0.5"/>
                <rect x="11" y="8" width="5" height="4" rx="0.5" fill="#D97706" opacity="0.7"/>
              </svg>
            </div>
            <div className="flex gap-0.5">
              {[1,2,3,4].map(i => (
                <div key={i} className="w-0.5 rounded-full bg-white/60" style={{ height: `${6 + i * 3}px` }} />
              ))}
            </div>
          </div>
          <p className="text-white font-bold text-sm">{label}</p>
        </div>
      </div>
    </motion.div>
  );
}

export function HeroSimCards() {
  return (
    <div className="relative w-full h-[320px] md:h-[380px]">
      <SimCard
        color="linear-gradient(135deg, #059669, #047857)"
        label="Europe 10GB"
        flag="🇪🇺"
        delay={0.2}
        className="top-4 left-1/2 -translate-x-1/2 md:left-[15%] md:translate-x-0 z-30"
      />
      <SimCard
        color="linear-gradient(135deg, #059669, #10B981)"
        label="Japan 5GB"
        flag="🇯🇵"
        delay={0.4}
        className="top-24 right-0 md:right-[5%] z-20 rotate-6"
      />
      <SimCard
        color="linear-gradient(135deg, #0D9488, #14B8A6)"
        label="USA 3GB"
        flag="🇺🇸"
        delay={0.6}
        className="top-44 left-4 md:left-[10%] z-10 -rotate-6"
      />
      {/* Floating dots decoration */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-8 right-[20%] w-3 h-3 rounded-full bg-primary/20 animate-pulse" />
        <div className="absolute top-32 left-[5%] w-2 h-2 rounded-full bg-accent/30 animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-16 right-[15%] w-2.5 h-2.5 rounded-full bg-success/25 animate-pulse" style={{ animationDelay: '0.5s' }} />
      </motion.div>
    </div>
  );
}
