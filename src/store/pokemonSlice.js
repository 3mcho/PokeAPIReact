import { createSlice, current } from "@reduxjs/toolkit";

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState: {
    list: [],
    allPokemon: [],
    currentPage: 0,
    loading: false,
  },
  reducers: {
    setPokemon: (state, action) => {
      state.list = action.payload;
    },
    setAll: (state, action) => {
      state.allPokemon = action.payload;
    },
    nextPage: (state) => {
      state.currentPage += 6;
    },
    prevPage: (state) => {
      if (state.currentPage > 0) state.currentPage -= 6;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setPokemon, setAll, nextPage, prevPage, setLoading } =
  pokemonSlice.actions;
export default pokemonSlice.reducer;
