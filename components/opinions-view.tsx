"use client";

import type { Opinion } from "@/lib/data";
import { TOPIC_COLORS } from "@/lib/data";

interface OpinionsViewProps {
  opinions: Opinion[];
}

const CONF_DOT: Record<string, { color: string; label: string }> = {
  h: { color: "#22c55e", label: "Confident" },
  m: { color: "#eab308", label: "Hedged" },
  l: { color: "#ef4444", label: "Speculative" },
};

function formatDate(dt: string) {
  const d = new Date(dt + "T00:00:00");
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function OpinionCard({ op }: { op: Opinion }) {
  const topicColor = TOPIC_COLORS[op.bk] ?? "#555";
  const conf = CONF_DOT[op.cf] ?? CONF_DOT.h;

  return (
    <article className="break-inside-avoid mb-3 bg-[#111] border border-[#1e1e1e] rounded-lg p-3.5 flex flex-col gap-2.5 hover:border-[#2a2a2a] transition-colors">
      {/* Bucket chip + confidence dot */}
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <span
          className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold uppercase tracking-wide"
          style={{
            backgroundColor: topicColor + "22",
            color: topicColor,
            border: `1px solid ${topicColor}44`,
          }}
        >
          {op.bk}
        </span>
        <span
          className="flex items-center gap-1.5 text-[11px]"
          style={{ color: conf.color }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full shrink-0"
            style={{ backgroundColor: conf.color }}
          />
          {conf.label}
        </span>
      </div>

      {/* Topic */}
      <p className="text-[11px] text-[#555] font-medium leading-snug">
        {op.tp}
      </p>

      {/* Stance */}
      <p className="text-[13px] text-[#ccc] leading-relaxed">{op.st}</p>

      {/* Date */}
      <p className="text-[10px] text-[#444] mt-0.5">{formatDate(op.dt)}</p>
    </article>
  );
}

export function OpinionsView({ opinions }: OpinionsViewProps) {
  if (opinions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-[#444]">
        <p className="text-[14px]">No opinions match your filters.</p>
        <p className="text-[12px] mt-1 text-[#333]">
          Try adjusting your search or filters.
        </p>
      </div>
    );
  }

  return (
    <div>
      <p className="text-[11px] text-[#444] mb-4">
        {opinions.length} opinion{opinions.length !== 1 ? "s" : ""}
      </p>
      <div className="masonry-3 max-[900px]:masonry-2 max-[600px]:masonry-1">
        {opinions.map((op) => (
          <OpinionCard key={op.id} op={op} />
        ))}
      </div>
    </div>
  );
}
