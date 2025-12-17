
// import './App.css'

// function App() {

//   return (
//     <>
//       <div>
//         <p>hello</p>
//         <Text />
//         <Hello display="hello (display)" />
//       </div>
//     </>
//   )
// }

// function Text(){
//   return(
//     <div><p>hello2</p></div>
//   )
// }

// function Hello({display}){
//   return(
//     <div><p>{display}</p></div>
//   )
// }

// export default App
// import './App.css'
// import MovieCard from './components/MovieCard';

// function App() {
//   return (
//     <>
//     <MovieCard movie = {{title: "tim" , release_date: "2222"}} />

//     </>
//   )
// }

// export default App


// import './App.css'
// import MovieCard from './components/MovieCard';

// function App() {
//   const movieNumber = 2;
//   return (
//     <>
//     {movieNumber === 1 ? <MovieCard movie = {{title: "tim" , release_date: "2222"}} /> : <MovieCard movie = {{title: "dim" , release_date: "2223"}} />}

//     </>
//   )
// }

// export default App

// import './App.css'
// import Home from './pages/Home.jsx';

// function App() {
//   return (
//     <>
//     <Home />

//     </>
//   )
// }

// export default App

import "./css/App.css";
import Favorites from "./pages/Favorites";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import { MovieProvider } from "./contexts/MovieContext";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

function App() {
  return (
    <MovieProvider>
      <NavBar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </main>
      <Footer /> {/* 👈 Add here */}
    </MovieProvider>
  );
}

export default App;
