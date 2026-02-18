"use client";

import React from "react";
import { ShieldAlert } from "lucide-react"; // <--- Ye import add karein error hatane ke liye

interface AccessControlModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AccessControlModal = ({ isOpen, onClose }: AccessControlModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-300 px-4">
      <div className="bg-white dark:bg-zinc-900 border border-border w-full max-w-sm p-6 rounded-2xl shadow-2xl relative animate-in zoom-in-95 duration-300">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="p-3 bg-red-500/10 rounded-full">
            <ShieldAlert className="w-8 h-8 text-red-600" />
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-bold text-foreground font-sans">
              Access Restricted
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Administrative portal access is restricted. Please use the
              authorized link to sign in.
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-full bg-red-600 text-white py-2.5 rounded-lg font-semibold hover:bg-red-700 transition-colors shadow-lg shadow-red-500/20"
          >
            Acknowledge
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccessControlModal;
