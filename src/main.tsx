import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import "./styles/tokens.css";
import "./styles/global.css";
import "./styles/motion.css";
import "./styles/sections.css";

// Demo + pilot are lazy-loaded so the marketing route stays light.
const DemoApp = lazy(() =>
  import("./demo/DemoApp").then((m) => ({ default: m.DemoApp }))
);
const PilotUploadStub = lazy(() =>
  import("./pilot/PilotUploadStub").then((m) => ({
    default: m.PilotUploadStub,
  }))
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
          <Route path="/pilot/upload" element={<PilotUploadStub />} />
          <Route path="*" element={<App />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </React.StrictMode>
);
