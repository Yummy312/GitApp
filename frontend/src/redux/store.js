import {configureStore} from "@reduxjs/toolkit";
import {authReducer} from "./slices/auth.js";
import {repoReducer} from "./slices/repo.js";
import {searchReducer} from "./slices/search.js";


export const store = configureStore({
    reducer: {
        auth: authReducer,
        repo: repoReducer,
        search: searchReducer
    },
    devTools: true,

})

