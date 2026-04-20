"use client";

import { Search, X } from "lucide-react";

export type ViewTab = "opinions" | "datapoints";
export type ConfidenceFilter = "all" | "h" | "m" | "l";

interface TopBarProps {
  view: ViewTab;
  onViewChange: (v: ViewTab) => void;
  search: string;
  onSearchChange: (s: string) => void;
  confidence: ConfidenceFilter;
  onConfidenceChange: (c: ConfidenceFilter) => void;
}

const CONF_OPTIONS: { label: string; value: ConfidenceFilter }[] = [
  { label: "All", value: "all" },
  { label: "Confident", value: "h" },
  { label: "Hedged", value: "m" },
  { label: "Speculative", value: "l" },
];

export function TopBar({
  view,
  onViewChange,
  search,
  onSearchChange,
  confidence,
  onConfidenceChange,
}: TopBarProps) {
  return (
    <header
      className="sticky top-0 z-30 border-b border-[#222] bg-[#0a0a0a]"
      style={{ backdropFilter: "blur(8px)" }}
    >
      <div className="px-5 pt-4 pb-3 flex flex-col gap-3">
        {/* Title row */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-[15px] font-semibold tracking-tight text-[#ededed] leading-tight">
              Karpathy &middot; Opinions &amp; Facts
            </h1>
            <p className="text-[11px] text-[#888] mt-0.5">
              Apr 2025–Apr 2026 &nbsp;&middot;&nbsp; 636 opinions &nbsp;&middot;&nbsp; 458 data points
            </p>
          </div>

          {/* Search */}
          <div className="relative flex-1 max-w-xs">
            <Search
              size={13}
              className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#555] pointer-events-none"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search…"
              className="w-full bg-[#141414] border border-[#252525] rounded-md py-1.5 pl-7 pr-7 text-[12px] text-[#ededed] placeholder:text-[#444] outline-none focus:border-[#333] transition-colors"
            />
            {search && (
              <button
                onClick={() => onSearchChange("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-[#555] hover:text-[#888] transition-colors"
              >
                <X size={12} />
              </button>
            )}
          </div>
        </div>

        {/* Controls row */}
        <div className="flex items-center justify-between gap-4 flex-wrap">
          {/* View tabs */}
          <div className="flex items-center gap-1 bg-[#111] border border-[#222] rounded-md p-0.5">
            {(["opinions", "datapoints"] as ViewTab[]).map((v) => (
              <button
                key={v}
                onClick={() => onViewChange(v)}
                className={`px-3 py-1 text-[12px] font-medium rounded transition-colors ${
                  view === v
                    ? "bg-[#1e1e1e] text-[#ededed]"
                    : "text-[#666] hover:text-[#aaa]"
                }`}
              >
                {v === "opinions" ? "Opinions" : "Data Points"}
              </button>
            ))}
          </div>

          {/* Confidence pills */}
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] text-[#555] mr-1">Confidence:</span>
            {CONF_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => onConfidenceChange(opt.value)}
                className={`px-2.5 py-0.5 rounded-full text-[11px] font-medium border transition-colors ${
                  confidence === opt.value
                    ? "bg-[#ededed] text-[#0a0a0a] border-[#ededed]"
                    : "bg-transparent text-[#777] border-[#2a2a2a] hover:border-[#444] hover:text-[#aaa]"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
