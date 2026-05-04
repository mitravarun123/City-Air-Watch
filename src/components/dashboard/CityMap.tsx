import { lazy, Suspense, useEffect, useState } from "react";

const InnerMap = lazy(() => import("./CityMapInner"));

export function CityMap() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) {
    return <div className="h-[460px] w-full rounded-lg border border-border bg-muted/30" />;
  }
  return (
    <Suspense fallback={<div className="h-[460px] w-full rounded-lg border border-border bg-muted/30" />}>
      <InnerMap />
    </Suspense>
  );
}
