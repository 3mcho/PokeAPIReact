import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setPokemon,
  setAll,
  nextPage,
  prevPage,
  setLoading,
} from "./store/pokemonSlice";

function App() {
  const dispatch = useDispatch();

  const { list, allPokemon, currentPage, loading } = useSelector(
    (state) => state.pokemon
  );

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=1300"
        );
        const data = await response.json();
        dispatch(setAll(data.results));
      } catch (error) {
        console.error("Error cargando lista global:", error);
      }
    };
    fetchAll();
  }, [dispatch]);

  useEffect(() => {
    const fetchPokemons = async () => {
      dispatch(setLoading(true));
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=6&offset=${currentPage}`
      );
      const data = await response.json();

      const details = await Promise.all(
        data.results.map(async (p) => {
          const res = await fetch(p.url);
          return res.json();
        })
      );
      dispatch(setPokemon(details));
      dispatch(setLoading(false));
    };

    fetchPokemons();
  }, [currentPage, dispatch]);

  const displayList = searchTerm
    ? (allPokemon || [])
        .filter((p) =>
          p?.name?.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .slice(0, 6)
    : list || [];

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredPokemon = (list || []).filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <header className="max-w-5xl mx-auto mb-10 text-center">
        <p className="text-3xl font-extrabold text-slate-900 mb-6">
          Lucio Emanuel Sandoval Interian
        </p>
        <div className="relative max-w-md mx-auto">
          <input
            type="text"
            placeholder="Buscar Pokémon (ej. Pecharunt)..."
            onChange={handleSearch}
            className="w-full px-5 py-3 rounded-2xl border-none shadow-lg ring-1 ring-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          />
        </div>
      </header>

      <main className="content">
        {loading ? (
          <p>Cargando...</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {displayList.map((p) => {
              const id = p.id || p.url.split("/").filter(Boolean).pop();
              const imageUrl =
                p.sprites?.front_default ||
                `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

              return (
                <div
                  key={id}
                  className="bg-white p-6 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-slate-100 group"
                >
                  <img
                    src={imageUrl}
                    alt={p.name}
                    className="w-32 h-32 mx-auto group-hover:scale-110 transition-transform"
                  />
                  <h3 className="text-center font-bold text-slate-700 capitalize text-lg">
                    {p.name}
                  </h3>
                </div>
              );
            })}
          </div>
        )}
      </main>

      <footer className="max-w-5xl mx-auto mt-12 flex justify-center items-center gap-6">
        <button
          onClick={() => dispatch(prevPage())}
          disabled={currentPage === 0}
          className="px-6 py-2 bg-white rounded-full shadow-sm border font-semibold disabled:opacity-30 hover:bg-slate-50 transition-colors"
        >
          Anterior
        </button>
        <button
          onClick={() => dispatch(nextPage())}
          className="px-6 py-2 bg-white rounded-full shadow-sm border font-semibold disabled:opacity-30 hover:bg-slate-50 transition-colors"
        >
          Siguiente
        </button>
      </footer>
    </div>
  );
}

export default App;
