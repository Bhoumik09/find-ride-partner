'use client'

import { useEffect } from "react";
import { redirect, useRouter } from "next/navigation";

export default function Home() {
  return redirect('/find-rides'); // ✅ this works just fine
}
