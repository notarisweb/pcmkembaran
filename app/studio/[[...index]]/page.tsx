"use client";

import { NextStudio } from "next-sanity/studio";
import config from "@/sanity.config"; // Pastikan path ke file config Sanity kamu benar

export default function StudioPage() {
  return <NextStudio config={config} />;
}