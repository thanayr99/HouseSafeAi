import type { ReactNode } from "react";
import { Card } from "./card";

type ChartCardProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
};

export function ChartCard({ title, subtitle, children }: ChartCardProps) {
  return (
    <Card className="h-full">
      <div className="mb-6">
        <p className="text-sm font-medium text-slate-300">{title}</p>
        <p className="mt-1 text-sm text-slate-400">{subtitle}</p>
      </div>
      <div className="h-[260px]">{children}</div>
    </Card>
  );
}
