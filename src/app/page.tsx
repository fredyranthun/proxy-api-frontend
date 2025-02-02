"use client";

import StoreProvider from "./StoreProvider";
import MainPage from "./components/MainPage";

export default function Home() {
  return (
    <StoreProvider>
      <MainPage />
    </StoreProvider>
  );
}
