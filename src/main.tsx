import React from 'react';
import ReactDOM from 'react-dom';
import { IntlProvider } from 'react-intl-redux';
import { Provider as ReduxProvider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

import { createHashHistory } from 'history';

import { createStore } from './store';

import TableView from './containers/TableView';

import '../styles/main.scss';

const history = createHashHistory();

const reduxStore = createStore(history);

ReactDOM.render(
  <ReduxProvider store={reduxStore}>
    <IntlProvider>
      <ConnectedRouter history={history}>
		<TableView />
      </ConnectedRouter>
    </IntlProvider>
  </ReduxProvider>,
  document.getElementById('app'),
);