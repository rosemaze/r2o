import * as intl from 'react-intl-redux';
import * as router from 'react-router-redux';
import * as redux from 'redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import thunk from 'redux-thunk';

import { History } from 'history';

import translations from 'translations/en';
import * as tables from '../reducers';
import { TableConstants } from '../actions';


export interface Table{
	tableNo: number;
	status: string;
}

export interface IntlState {
  locale: string;
  defaultLocale?: string;
  messages: {
    [key: string]: string;
  };
}

export interface TableViewState {
	tables: Table[];
}

export interface State {
  readonly intl: Readonly<IntlState>;
  readonly router: Readonly<router.RouterState>;

  // INFO: add your state interfaces here
  tableView: TableViewState;
}


// Need to define the initial state in reducer, initial state defined in stores does not get passed in here at init
// Notes: https://stackoverflow.com/questions/36619093/why-do-i-get-reducer-returned-undefined-during-initialization-despite-pr
const NUMBER_OF_TABLES = 12;
var initTables:Table[] = [], n:number = 1;
while(n <= NUMBER_OF_TABLES) { 
	initTables.push({ tableNo: n, status: TableConstants.STATUS_AVAILABLE });
	n++;
}
export const initialTableViewState: TableViewState = {
	tables: initTables
}

const initialState: State = {
  intl: {
    locale: 'en',
    messages: translations,
    defaultLocale: 'en',
  },
  router: {
    location: null,
  },

  // INFO: add your initial states here
  tableView: initialTableViewState
};

/**
 * Create the redux store.
 */

 export function createStore(history: History, state: State = initialState) {

  const reducer = redux.combineReducers({
    intl: intl.intlReducer,
    router: router.routerReducer,

    // INFO: add your reducers here
	tableView: tables.tablesReducer
  });
  
  const sagas = createSagaMiddleware();

  const middlewares = redux.applyMiddleware(
    thunk,
    sagas,
    router.routerMiddleware(history),
    logger,
  );

  const store = redux.createStore(
    reducer,
    state,
    middlewares,
  );
  
  sagas.run(function*() {
    yield all([

      // INFO: add your sagas here
    ]);
  });
  
  return store;
}
