import { BrowserRouter } from "react-router-dom";
import { MainLayout } from "./components/layout";
function App() {
  return (
    <BrowserRouter>
      <MainLayout />
    </BrowserRouter>
  );
}

export default App;
