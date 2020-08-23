import { createStore } from 'redux';
import rootReducer from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

//set up store with middleware and redux dev tools
const store = createStore(rootReducer, composeWithDevTools());

export default store;
