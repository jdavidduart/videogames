  
import { createStore, applyMiddleware, compose} from "redux";
import rootReducer from "../reducer/reducer";
import thunk from "redux-thunk";
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
/*     rootReducer, 
    compose(applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), */
    rootReducer,
    composeEnhancer(applyMiddleware(thunk)
));

export default store;