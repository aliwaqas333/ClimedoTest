import mongoose from "mongoose";

export type TabDocument = mongoose.Document & {
  name: string;
  description: string;
  dataPoints: dataPoints[];
};

export interface dataPoints {
  dataType: string;
  label: string;
  description: string;
  options?: Array<string>;
}

const tabSchema = new mongoose.Schema<TabDocument>({
  name: String,
  description: String,
  dataPoints: [
    {
      dataType: String,
      label: String,
      description: String,
      options: [String],
    },
  ],
});

export const Tab = mongoose.model<TabDocument>("Tab", tabSchema);
