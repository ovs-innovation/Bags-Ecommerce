import React from 'react';
import { Check } from 'lucide-react';
import { useAuthPrompt } from '../../context/AuthPromptContext';

export const GlobalToast = () => {
  const { toastMessage } = useAuthPrompt();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[120] bg-ink text-accent px-5 py-3.5 rounded-xs shadow-elevated border border-white/10 flex items-center gap-3 text-xs font-bold tracking-wide animate-fade-in pointer-events-none">
      <Check className="w-4 h-4 text-accent flex-shrink-0" />
      <span>{toastMessage}</span>
    </div>
  );
};

export default GlobalToast;
