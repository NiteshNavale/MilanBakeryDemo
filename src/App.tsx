/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import OwnerDashboard from "./pages/OwnerDashboard";
import ProductionFlow from "./pages/ProductionFlow";
import SalesmanApp from "./pages/SalesmanApp";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<OwnerDashboard />} />
          <Route path="production" element={<ProductionFlow />} />
          <Route path="salesman" element={<SalesmanApp />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
