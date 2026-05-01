import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import "./styles/tokens.css";
import "./styles/global.css";
import "./styles/motion.css";
import "./styles/sections.css";

const DemoApp = lazy(() =>
  import("./demo/DemoApp").then((m) => ({ default: m.DemoApp }))
);
const PilotUpload = lazy(() =>
  import("./pilot/PilotUpload").then((m) => ({ default: m.PilotUpload }))
);
const PilotResults = lazy(() =>
  import("./pilot/PilotResults").then((m) => ({ default: m.PilotResults }))
);

const root = document.getElementById("root");
if (!root) {
  throw new Error("Root element not found");
}

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <BrowserRouter>
      <Suspense fallback={<div style={{ padding: 32 }}>Loading…</div>}>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/demo" element={<DemoApp />} />
          <Route path="/demo/:persona" element={<DemoApp />} />
          <Route path="/pilot/upload" element={<PilotUpload />} />
          <Route path="/pilot/results/:id" element={<PilotResults />} />
          <Route path="*" element={<App />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </React.StrictMode>
);
