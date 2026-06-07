import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
  } from "recharts";
  
  import type { GithubResponse } from "../types/github";
  
  interface Props {
    data: GithubResponse;
  }
  
  const COLORS = [
    "#3b82f6",
    "#8b5cf6",
    "#10b981",
    "#f59e0b",
    "#ef4444",
  ];
  
  export default function LanguageChart({
    data,
  }: Props) {
    const chartData =
      data.analytics.topLanguages.map(
        ([language, count]) => ({
          name: language,
          value: count,
        })
      );
  
    return (
      <div className="chart-card">
        <h2>📊 Language Distribution</h2>
  
        <ResponsiveContainer
          width="100%"
          height={300}
        >
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              label
            >
              {chartData.map(
                (_, index) => (
                  <Cell
                    key={index}
                    fill={
                      COLORS[
                        index %
                          COLORS.length
                      ]
                    }
                  />
                )
              )}
            </Pie>
  
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  }