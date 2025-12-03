import { BrowserRouter, Routes, Route } from "react-router";
import { LoginPage } from "./pages/login";
import { Layout } from "./layout";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route index element={<Home />} /> */}

        <Route element={<Layout />}>
          <Route path="/" element={<LoginPage />} />
        </Route>
      </Routes>
    </BrowserRouter>

  )
}
