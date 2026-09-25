"use client";

import React, { useEffect } from "react";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { MagneticButton } from "@/components/ui/MagneticButton";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error caught:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#050816] text-white flex items-center justify-center p-6">
      <GlassCard glowColor="purple" padding="lg" className="max-w-md text-center space-y-5">
        <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 mx-auto flex items-center justify-center shadow-[0_0_30px_rgba(244,63,94,0.3)]">
          <AlertTriangle className="w-7 h-7" />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-white">System Signal Interrupted</h2>
          <p className="text-xs sm:text-sm text-slate-400">
            An unexpected error occurred in the neural interface. Don&apos;t worry, your destination can be recovered.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <MagneticButton
            variant="primary"
            size="sm"
            onClick={() => reset()}
            icon={<RotateCcw className="w-4 h-4" />}
          >
            Re-establish Link
          </MagneticButton>

          <MagneticButton
            variant="secondary"
            size="sm"
            href="/"
            icon={<Home className="w-4 h-4" />}
          >
            Return to Origin
          </MagneticButton>
        </div>
      </GlassCard>
    </div>
  );
}
