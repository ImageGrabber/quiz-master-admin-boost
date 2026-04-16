import type { NextApiRequest, NextApiResponse } from "next";
import kidsStoriesData from "@/data/kids-stories.json";

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  res.setHeader("Cache-Control", "public, s-maxage=60, stale-while-revalidate=300");
  res.status(200).json(kidsStoriesData);
}

