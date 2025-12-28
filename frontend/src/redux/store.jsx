import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userAuthReducer from "./Slice/userAuthSlice";

const userAuthPersistConfig = {
    key: "userAuth",
    storage,
    whitelist: ["user", "access", "isAuthenticated"],
};

const persistedUserAuthReducer = persistReducer(userAuthPersistConfig, userAuthReducer);

const rootReducer = combineReducers({
    userAuth: persistedUserAuthReducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ["persist/PERSIST", "persist/REHYDRATE", "persist/PAUSE", "persist/FLUSH", "persist/PURGE", "persist/REGISTER"],
            },
        }),
});

export const persistor = persistStore(store);
