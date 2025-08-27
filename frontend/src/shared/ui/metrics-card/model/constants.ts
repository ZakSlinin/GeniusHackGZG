export const MetricsCardColors = {
  Blue: "#B9CEFB",
  Cyan: "#B9EDFB",
  Yellow: "#FBFBB9",
  Green: "#CEFBB9",
  Red: "#FBB9B9",
};

export type MetricsCardColor =
  (typeof MetricsCardColors)[keyof typeof MetricsCardColors];
