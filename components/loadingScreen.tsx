import React from 'react';

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background z-50">
      <div className="relative flex flex-col items-center gap-6">
        
        {/* Container for the Premium Loader */}
        <div className="relative h-16 w-16">
          {/* Outer Glowing Ring - Slower Rotation */}
          <div className="absolute inset-0 rounded-full border-[3px] border-primary/10 border-t-primary animate-[spin_1.5s_linear_infinite] shadow-[0_0_15px_rgba(var(--primary),0.3)]"></div>
          
          {/* Middle Ring - Faster Reverse Rotation */}
          <div className="absolute inset-2 rounded-full border-[2px] border-accent/10 border-t-accent animate-[spin_0.8s_linear_infinite_reverse]"></div>
          
          {/* Inner Core Pulse */}
          <div className="absolute inset-[18px] bg-primary/20 rounded-full animate-pulse"></div>
        </div>

        {/* Text with Letter Spacing & Sophisticated Pulse */}
        <div className="flex flex-col items-center">
          <p className="text-primary text-sm font-bold tracking-[0.2em] uppercase animate-pulse">
            Loading
          </p>
          {/* Progress bar line for extra premium feel */}
          <div className="h-[1px] w-12 bg-gradient-to-r from-transparent via-primary to-transparent mt-2 opacity-50"></div>
        </div>

      </div>
    </div>
  );
}