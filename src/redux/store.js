import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/user";
import { categoryReducer } from "./reducers/category.js";
import { productReducer } from "./reducers/product.js";
import { tagReducer } from "./reducers/tag.js";
import { wishlistReducer } from "./reducers/wishlist.js";
import { cartReducer } from "./reducers/cart.js";

const store = configureStore({
    reducer: {
        user: userReducer,
        category: categoryReducer,
        tag: tagReducer,
        product: productReducer,
        wishlist: wishlistReducer,
        cart: cartReducer
    }
});

export default store;