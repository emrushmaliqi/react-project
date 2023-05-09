import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import WatchList from "./pages/WatchList";
import Wallet from "./pages/Wallet";
import Token from "./pages/Token";
import NavBar from "./components/NavBar";

function App() {
  return (
    <div classNameName="App">
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/watchlist" element={<WatchList />} />
        <Route exact path="/wallet" element={<Wallet />} />
        <Route exact path="/token/:id" element={<Token />} />
      </Routes>
    </div>
  );
}

export default App;
