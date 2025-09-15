import React from 'react';
import { createRoot } from "react-dom/client";
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import App from "./App.tsx";
import "./index.css";

// Clear localStorage once for fresh app start (demo purposes)
if (!localStorage.getItem('mitra_demo_cleared')) {
  const keysToKeep = ['mitra-theme', 'mitra_theme']; // Keep theme preference
  const savedTheme = localStorage.getItem('mitra-theme') || localStorage.getItem('mitra_theme');
  localStorage.clear();
  if (savedTheme) {
    localStorage.setItem('mitra_theme', savedTheme);
  }
  localStorage.setItem('mitra_demo_cleared', 'true');
}

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem={false}
        storageKey="mitra-theme"
      >
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
