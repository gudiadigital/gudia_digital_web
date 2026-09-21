import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ev dizinindeki alakasız bir package-lock.json'ın kök olarak seçilmesini engeller.
  turbopack: { root: path.resolve(__dirname) },
};

export default nextConfig;
