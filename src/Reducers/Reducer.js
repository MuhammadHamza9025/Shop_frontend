import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    users: '',
    value: 0,
    categories: [],
    products: [],
    cart: [],
    cartitems: []
}
const customreducer = createSlice({
    name: 'customreducer',
    initialState,
    reducers: {
        setUsers(state, action) {
            return { ...state, users: action.payload }

        },
        setcategories(state, action) {
            return { ...state, categories: action.payload }

        },
        setproducts(state, action) {
            return { ...state, products: action.payload }

        },
        clearcookie(state, action) {
            return { ...state, users: '', cartitems: [] }

        },
        setcarts(state, action) {

            state.cart.push(action.payload)
        },
        setcartsitems(state, action) {

            return { ...state, cartitems: action.payload }
        }

    }
})

export const { setUsers, clearcookie, setcategories, setproducts, setcarts, setcartsitems } = customreducer.actions;
export default customreducer.reducer;