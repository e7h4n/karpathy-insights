"use client";

import { X } from "lucide-react";
import type { ConfidenceFilter } from "./top-bar";
import { TOPIC_COLORS } from "@/lib/data";

interface FilterBarProps {
  activeTopic: string | null;
  onTopicRemove: () => void;
  activeConfidence: ConfidenceFilter;
  onConfidenceRemove: () => void;
  search: string;
  onSearchRemove: () => void;
  onClearAll: () => void;
}

const CONF_LABEL: Record<ConfidenceFilter, string> = {
  all: "All",
  h: "Confident",
  m: "Hedged",
  l: "Speculative",
};

export function FilterBar({
  activeTopic,
  onTopicRemove,
  activeConfidence,
  onConfidenceRemove,
  search,
  onSearchRemove,
  onClearAll,
}: FilterBarProps) {
  const hasAny =
    activeTopic !== null || activeConfidence !== "all" || search !== "";

  if (!hasAny) return null;

  const chipClass =
    "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium border border-[#2a2a2a] bg-[#141414] text-[#aaa]";

  return (
    <div className="flex items-center flex-wrap gap-2 mb-4">
      <span className="text-[11px] text-[#444] mr-1">Active filters:</span>

      {search && (
        <span className={chipClass}>
          Search: &ldquo;{search}&rdquo;
          <button
            onClick={onSearchRemove}
            className="text-[#555] hover:text-[#999] transition-colors"
            aria-label="Remove search filter"
          >
            <X size={11} />
          </button>
        </span>
      )}

      {activeTopic && (
        <span
          className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium border"
          style={{
            borderColor: (TOPIC_COLORS[activeTopic] ?? "#555") + "44",
            backgroundColor: (TOPIC_COLORS[activeTopic] ?? "#555") + "18",
            color: TOPIC_COLORS[activeTopic] ?? "#aaa",
          }}
        >
          {activeTopic}
          <button
            onClick={onTopicRemove}
            className="opacity-70 hover:opacity-100 transition-opacity"
            aria-label="Remove topic filter"
          >
            <X size={11} />
          </button>
        </span>
      )}

      {activeConfidence !== "all" && (
        <span className={chipClass}>
          {CONF_LABEL[activeConfidence]}
          <button
            onClick={onConfidenceRemove}
            className="text-[#555] hover:text-[#999] transition-colors"
            aria-label="Remove confidence filter"
          >
            <X size={11} />
          </button>
        </span>
      )}

      <button
        onClick={onClearAll}
        className="text-[11px] text-[#555] hover:text-[#888] underline underline-offset-2 transition-colors ml-1"
      >
        Clear all
      </button>
    </div>
  );
}
