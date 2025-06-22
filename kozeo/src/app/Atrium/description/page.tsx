import { Suspense } from "react";
import DescriptionClient from "./DescriptionClient";

export default function DescriptionPage() {
  return (
    <Suspense fallback={<p className="text-white p-10">Loading...</p>}>
      <DescriptionClient />
    </Suspense>
  );
}
