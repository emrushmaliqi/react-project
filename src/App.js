import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import WatchList from "./pages/WatchList";
import Wallet from "./pages/Wallet";
import Coin from "./pages/Coin";
import NavBar from "./components/NavBar";
import { CoinsContext } from "./context/CoinsContext";
import { useState } from "react";
import Search from "./pages/Search";

function App() {
  const [coins, setCoins] = useState([]);

  return (
    <div className="App">
      <CoinsContext.Provider value={{ coins, setCoins }}>
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/watchlist" element={<WatchList />} />
          <Route exact path="/wallet" element={<Wallet />} />
          <Route exact path="/coin/:id" element={<Coin />} />
          <Route exact path="search/:query" element={<Search />} />
        </Routes>
      </CoinsContext.Provider>
    </div>
  );
}

export default App;
