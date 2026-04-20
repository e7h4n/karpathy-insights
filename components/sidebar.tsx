"use client";

import { OPINIONS, TOPIC_COLORS } from "@/lib/data";
import type { ConfidenceFilter } from "./top-bar";

interface SidebarProps {
  activeTopic: string | null;
  onTopicChange: (t: string | null) => void;
  activeConfidence: ConfidenceFilter;
  onConfidenceChange: (c: ConfidenceFilter) => void;
}

const CONF_LABELS: Record<ConfidenceFilter, string> = {
  all: "All",
  h: "Confident",
  m: "Hedged",
  l: "Speculative",
};

const CONF_DOT_COLORS: Record<string, string> = {
  h: "#22c55e",
  m: "#eab308",
  l: "#ef4444",
};

// Compute topic counts
const topicCounts = OPINIONS.reduce<Record<string, number>>((acc, op) => {
  acc[op.bk] = (acc[op.bk] ?? 0) + 1;
  return acc;
}, {});

const sortedTopics = Object.entries(topicCounts).sort((a, b) => b[1] - a[1]);

// Compute confidence counts
const confCounts = OPINIONS.reduce<Record<string, number>>((acc, op) => {
  acc[op.cf] = (acc[op.cf] ?? 0) + 1;
  return acc;
}, {});

export function Sidebar({
  activeTopic,
  onTopicChange,
  activeConfidence,
  onConfidenceChange,
}: SidebarProps) {
  return (
    <aside className="w-[220px] shrink-0 sticky top-[89px] h-[calc(100vh-89px)] overflow-y-auto scrollbar-thin flex flex-col gap-6 py-5 px-3 border-r border-[#1a1a1a]">
      {/* Topics */}
      <section>
        <p className="text-[10px] uppercase tracking-widest text-[#444] font-semibold mb-2 px-1">
          Topics
        </p>
        <ul className="flex flex-col gap-0.5">
          <li>
            <button
              onClick={() => onTopicChange(null)}
              className={`w-full flex items-center justify-between gap-2 px-2 py-1.5 rounded-md text-[12px] transition-colors ${
                activeTopic === null
                  ? "bg-[#1a1a1a] text-[#ededed]"
                  : "text-[#666] hover:text-[#aaa] hover:bg-[#141414]"
              }`}
            >
              <span className="flex items-center gap-2">
                <span
                  className="w-2 h-2 rounded-full shrink-0 bg-[#444]"
                />
                All topics
              </span>
              <span className="text-[11px] text-[#444] tabular-nums">
                {OPINIONS.length}
              </span>
            </button>
          </li>
          {sortedTopics.map(([topic, count]) => (
            <li key={topic}>
              <button
                onClick={() =>
                  onTopicChange(activeTopic === topic ? null : topic)
                }
                className={`w-full flex items-center justify-between gap-2 px-2 py-1.5 rounded-md text-[12px] transition-colors ${
                  activeTopic === topic
                    ? "bg-[#1a1a1a] text-[#ededed]"
                    : "text-[#666] hover:text-[#aaa] hover:bg-[#141414]"
                }`}
              >
                <span className="flex items-center gap-2 min-w-0">
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{
                      backgroundColor:
                        TOPIC_COLORS[topic] ?? "#555",
                    }}
                  />
                  <span className="truncate">{topic}</span>
                </span>
                <span className="text-[11px] text-[#444] tabular-nums shrink-0">
                  {count}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </section>

      {/* Confidence */}
      <section>
        <p className="text-[10px] uppercase tracking-widest text-[#444] font-semibold mb-2 px-1">
          Confidence
        </p>
        <ul className="flex flex-col gap-0.5">
          {(["all", "h", "m", "l"] as ConfidenceFilter[]).map((cf) => (
            <li key={cf}>
              <button
                onClick={() => onConfidenceChange(cf)}
                className={`w-full flex items-center justify-between gap-2 px-2 py-1.5 rounded-md text-[12px] transition-colors ${
                  activeConfidence === cf
                    ? "bg-[#1a1a1a] text-[#ededed]"
                    : "text-[#666] hover:text-[#aaa] hover:bg-[#141414]"
                }`}
              >
                <span className="flex items-center gap-2">
                  {cf === "all" ? (
                    <span className="w-2 h-2 rounded-full bg-[#444] shrink-0" />
                  ) : (
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: CONF_DOT_COLORS[cf] }}
                    />
                  )}
                  {CONF_LABELS[cf]}
                </span>
                <span className="text-[11px] text-[#444] tabular-nums">
                  {cf === "all"
                    ? OPINIONS.length
                    : (confCounts[cf] ?? 0)}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </section>
    </aside>
  );
}
