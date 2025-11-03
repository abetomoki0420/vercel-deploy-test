import Image from "next/image"

type Pokemon = {
  id: number
  name: string
  sprites: {
    other?: {
      ["official-artwork"]?: {
        front_default: string | null
      }
    }
  }
  types: Array<{
    type: {
      name: string
    }
  }>
}

async function getPokemon(): Promise<Pokemon> {
  // Simulate slow backend by pausing before the API request.
  await new Promise((resolve) => setTimeout(resolve, 2000))

  const res = await fetch("https://pokeapi.co/api/v2/pokemon/pikachu", {
    next: { revalidate: 60 },
  })

  if (!res.ok) {
    throw new Error("Failed to fetch Pokémon data")
  }

  const data = (await res.json()) as Pokemon

  return data
}

export default async function RSCTest() {
  const pokemon = await getPokemon()
  const artwork =
    pokemon.sprites.other?.["official-artwork"]?.front_default ?? null

  return (
    <div className="mx-auto flex max-w-sm flex-col gap-4 rounded-xl border border-zinc-200 bg-white p-6 shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex items-baseline justify-between font-mono uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
        <span>Pokémon</span>
        <span>#{pokemon.id}</span>
      </div>

      <h2 className="text-3xl font-semibold capitalize text-zinc-900 dark:text-zinc-100">
        {pokemon.name}
      </h2>

      {artwork ? (
        <div className="flex justify-center">
          <Image
            src={artwork}
            alt={pokemon.name}
            width={256}
            height={256}
            className="h-48 w-48 object-contain"
            priority
          />
        </div>
      ) : (
        <div className="flex h-48 items-center justify-center rounded-lg bg-zinc-100 text-sm text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
          Artwork unavailable
        </div>
      )}

      <ul className="flex items-center gap-2">
        {pokemon.types.map(({ type }) => (
          <li
            key={type.name}
            className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium uppercase tracking-wide text-amber-800 dark:bg-amber-900 dark:text-amber-100"
          >
            {type.name}
          </li>
        ))}
      </ul>

      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        Data fetched from PokeAPI and cached for one minute.
      </p>
    </div>
  )
}
