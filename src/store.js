import { createStore } from "vuex" 

const store = createStore({
    state: {
        books: {}
      },
      mutations: {
        SET_BOOKS(state, payload) {
            state.books = payload.newBooks;
          }
      },
})

export default store