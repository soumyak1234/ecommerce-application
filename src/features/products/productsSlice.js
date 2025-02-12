import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  products: [],
  status: 'idle',
  error: null,
}

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload
    },
  },
})

export const { setProducts } = productsSlice.actions
export default productsSlice.reducer 