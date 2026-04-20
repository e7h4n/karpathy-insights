"use client";

import { useState, useMemo } from "react";
import { OPINIONS, DATA_POINTS } from "@/lib/data";
import { TopBar } from "@/components/top-bar";
import type { ViewTab, ConfidenceFilter } from "@/components/top-bar";
import { Sidebar } from "@/components/sidebar";
import { FilterBar } from "@/components/filter-bar";
import { OpinionsView } from "@/components/opinions-view";
import { DataPointsView } from "@/components/data-points-view";

export default function Home() {
  const [view, setView] = useState<ViewTab>("opinions");
  const [search, setSearch] = useState("");
  const [confidence, setConfidence] = useState<ConfidenceFilter>("all");
  const [activeTopic, setActiveTopic] = useState<string | null>(null);

  const filteredOpinions = useMemo(() => {
    return OPINIONS.filter((op) => {
      if (confidence !== "all" && op.cf !== confidence) return false;
      if (activeTopic && op.bk !== activeTopic) return false;
      if (search) {
        const q = search.toLowerCase();
        return (
          op.tp.toLowerCase().includes(q) ||
          op.st.toLowerCase().includes(q) ||
          op.bk.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [confidence, activeTopic, search]);

  const filteredDataPoints = useMemo(() => {
    if (!search) return DATA_POINTS;
    const q = search.toLowerCase();
    return DATA_POINTS.filter(
      (dp) =>
        dp.cl.toLowerCase().includes(q) ||
        dp.cx.toLowerCase().includes(q) ||
        dp.ep.toLowerCase().includes(q)
    );
  }, [search]);

  function handleClearAll() {
    setSearch("");
    setActiveTopic(null);
    setConfidence("all");
  }

  // When switching tabs, keep filters but reset topic if on data points
  function handleViewChange(v: ViewTab) {
    setView(v);
  }

  const topBarHeight = "89px";

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#ededed] font-sans">
      <TopBar
        view={view}
        onViewChange={handleViewChange}
        search={search}
        onSearchChange={setSearch}
        confidence={confidence}
        onConfidenceChange={setConfidence}
      />

      <div className="flex" style={{ minHeight: `calc(100vh - ${topBarHeight})` }}>
        {/* Sidebar */}
        <Sidebar
          activeTopic={activeTopic}
          onTopicChange={setActiveTopic}
          activeConfidence={confidence}
          onConfidenceChange={setConfidence}
        />

        {/* Main content */}
        <main className="flex-1 min-w-0 px-6 py-5">
          <FilterBar
            activeTopic={activeTopic}
            onTopicRemove={() => setActiveTopic(null)}
            activeConfidence={confidence}
            onConfidenceRemove={() => setConfidence("all")}
            search={search}
            onSearchRemove={() => setSearch("")}
            onClearAll={handleClearAll}
          />

          {view === "opinions" ? (
            <OpinionsView opinions={filteredOpinions} />
          ) : (
            <DataPointsView dataPoints={filteredDataPoints} />
          )}
        </main>
      </div>
    </div>
  );
}
