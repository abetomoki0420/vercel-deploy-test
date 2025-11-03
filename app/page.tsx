import { Suspense } from "react"
import RSCTest from "./_components/RSCTest"
import SceneCanvas from "./_components/SceneCanvas"

function PokemonFallback() {
  return (
    <div className="mx-auto flex max-w-sm animate-pulse flex-col gap-4 rounded-xl border border-zinc-200 bg-white p-6 shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex items-baseline justify-between">
        <div className="h-3 w-24 rounded bg-zinc-200 dark:bg-zinc-700" />
        <div className="h-3 w-12 rounded bg-zinc-200 dark:bg-zinc-700" />
      </div>
      <div className="h-7 w-32 rounded bg-zinc-200 dark:bg-zinc-700" />
      <div className="h-48 w-full rounded-lg bg-zinc-200 dark:bg-zinc-800" />
      <div className="flex gap-2">
        <div className="h-6 w-16 rounded-full bg-amber-100 dark:bg-amber-900" />
        <div className="h-6 w-16 rounded-full bg-amber-100 dark:bg-amber-900" />
      </div>
      <div className="h-3 w-40 rounded bg-zinc-200 dark:bg-zinc-700" />
    </div>
  )
}

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 bg-zinc-50 p-6 font-sans dark:bg-black">
      <div className="w-full max-w-6xl">
        <SceneCanvas className="h-[60vh] min-h-[400px] w-full" />
      </div>

      <Suspense fallback={<PokemonFallback />}>
        <RSCTest />
      </Suspense>
    </div>
  )
}
