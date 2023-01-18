import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Listing from '../components/CreditMemoListing/Listing';
import CreditMemoDetailsContainer from '../components/CreditMemoDetails/CreditMemoDetailsContainer';

const App = () => (
  <BrowserRouter data-e2e="App" basename="/channel/marketplace/credit-memo">
    <Routes>
      <Route path="/" element={<Listing />} />
      <Route
        path="/:id"
        element={<CreditMemoDetailsContainer key={`${Date.now()}`} />}
      />
    </Routes>
  </BrowserRouter>
);

export default App;
