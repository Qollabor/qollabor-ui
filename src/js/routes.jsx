import React from 'react';
import { Route } from 'react-router';

import MainLayout from './layouts/mainLayout';
import HomePage from './pages/home';
import InfoPage from './pages/info';
import CreditsPage from './pages/credits';

export default (
  <Route>
    <Route component={MainLayout}>
      <Route path="/" component={HomePage} />
      <Route path="/info" component={InfoPage} />
      <Route path="/credits" component={CreditsPage} />
    </Route>
  </Route>
);
