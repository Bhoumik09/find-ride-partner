'use client'

import { redirect} from "next/navigation";

export default function Home() {
  return redirect('/find-rides'); // ✅ this works just fine
}
