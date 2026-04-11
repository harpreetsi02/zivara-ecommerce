"use client";

import { Suspense } from "react";
import SearchComponent from "./SearchComponent";

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-4 mt-16">Loading...</div>}>
      <SearchComponent />
    </Suspense>
  );
}