import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Auth from "./Auth"
import View from "./View"
import Header from "./Header"

function App() {
  return (
  <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<><Header /><Auth /></>} />
        <Route path="/view" element={<><Header /><View /></>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App