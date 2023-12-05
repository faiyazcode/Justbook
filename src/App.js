import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
//login, searchFlight, FlightList, PrivateRoutes
import Login from './pages/login/Login';
import SearchFlights from './pages/searchFlights/searchFlights';
import FlightLists from './pages/flightLists/FlightLists';
import PrivateRoutes from './layout/PrivateRoutes';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/login" exact element={<Login />}></Route>
      <Route element={<PrivateRoutes />}>
        <Route path="/search-flight" element={<SearchFlights />}></Route>
        <Route path="/flight/list" element={<FlightLists />}></Route>
        <Route path="*" element={<SearchFlights />}></Route>
      </Route>
    </Routes>
</BrowserRouter>
  );
}

export default App;
