import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage'
import authReducer from "../features/authSlice";

const persistenceConfig = {
  key: "root",
  storage: storage,
};

const combined = combineReducers({
  auth: authReducer,
});

const persisted = persistReducer(persistenceConfig, combined);

export default persisted;
