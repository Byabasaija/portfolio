import { NextWebVitalsMetric } from "next/app";

export const sendToGA4 = (
  metric: NextWebVitalsMetric,
  gaId: string | undefined,
) => {
  const metricValue = Math.round(
    metric.name === "CLS" ? metric.value * 1000 : metric.value,
  );

  if (gaId && typeof window !== "undefined" && window.gtag) {
    window.gtag("event", metric.name, {
      value: metricValue,
      event_label: metric.id,
      non_interaction: true,
    });
  }
};
