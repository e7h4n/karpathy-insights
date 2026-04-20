"use client";

import { useState } from "react";
import type { DataPoint } from "@/lib/data";
import { ChevronUp, ChevronDown, ChevronsUpDown } from "lucide-react";

interface DataPointsViewProps {
  dataPoints: DataPoint[];
}

type SortKey = "dt" | "cl" | "cx";
type SortDir = "asc" | "desc";

function formatDate(dt: string) {
  const d = new Date(dt + "T00:00:00");
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function SortIcon({
  col,
  sortKey,
  sortDir,
}: {
  col: SortKey;
  sortKey: SortKey;
  sortDir: SortDir;
}) {
  if (sortKey !== col)
    return <ChevronsUpDown size={12} className="text-[#333] ml-1 shrink-0" />;
  if (sortDir === "asc")
    return <ChevronUp size={12} className="text-[#888] ml-1 shrink-0" />;
  return <ChevronDown size={12} className="text-[#888] ml-1 shrink-0" />;
}

export function DataPointsView({ dataPoints }: DataPointsViewProps) {
  const [sortKey, setSortKey] = useState<SortKey>("dt");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  function toggleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  }

  const sorted = [...dataPoints].sort((a, b) => {
    const av = a[sortKey];
    const bv = b[sortKey];
    const cmp = av < bv ? -1 : av > bv ? 1 : 0;
    return sortDir === "asc" ? cmp : -cmp;
  });

  if (sorted.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-[#444]">
        <p className="text-[14px]">No data points match your filters.</p>
        <p className="text-[12px] mt-1 text-[#333]">
          Try adjusting your search or filters.
        </p>
      </div>
    );
  }

  const thClass =
    "px-4 py-2.5 text-left text-[10px] uppercase tracking-widest font-semibold text-[#444] select-none cursor-pointer hover:text-[#777] transition-colors";

  return (
    <div>
      <p className="text-[11px] text-[#444] mb-4">
        {sorted.length} data point{sorted.length !== 1 ? "s" : ""}
      </p>
      <div className="rounded-lg border border-[#1e1e1e] overflow-hidden">
        <table className="w-full text-[12px]">
          <thead>
            <tr className="border-b border-[#1e1e1e] bg-[#0f0f0f]">
              <th
                className={`${thClass} w-[130px]`}
                onClick={() => toggleSort("dt")}
              >
                <span className="flex items-center">
                  Date
                  <SortIcon col="dt" sortKey={sortKey} sortDir={sortDir} />
                </span>
              </th>
              <th
                className={thClass}
                onClick={() => toggleSort("cl")}
              >
                <span className="flex items-center">
                  Claim
                  <SortIcon col="cl" sortKey={sortKey} sortDir={sortDir} />
                </span>
              </th>
              <th
                className={`${thClass} w-[200px]`}
                onClick={() => toggleSort("cx")}
              >
                <span className="flex items-center">
                  Context
                  <SortIcon col="cx" sortKey={sortKey} sortDir={sortDir} />
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((dp, i) => {
              const isEven = i % 2 === 0;
              const bg = isEven ? "#0f0f0f" : "#141414";
              return (
                <tr
                  key={`${dp.dt}-${dp.cl}`}
                  style={{ backgroundColor: bg }}
                  className="border-b border-[#1a1a1a] last:border-0 hover:brightness-110 transition-all"
                >
                  <td className="px-4 py-3 text-[#555] whitespace-nowrap tabular-nums">
                    {formatDate(dp.dt)}
                  </td>
                  <td className="px-4 py-3 text-[#ccc] leading-relaxed">
                    {dp.cl}
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-medium bg-[#1a1a1a] text-[#666] border border-[#252525]">
                      {dp.cx}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
