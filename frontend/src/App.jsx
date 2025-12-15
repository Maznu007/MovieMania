
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
import Home from './pages/Home.jsx';
import Favourite from './pages/Favourites.jsx';
import {Routes, Route} from 'react-router-dom';
import NavBar from './components/NavBar.jsx';
function App() {
  return (
    <>
    <div>
      <NavBar/>
      <main className='main-content'>
     <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/favourites' element={<Favourite />} />
     </Routes>
      </main>
    </div>


    </>
  )
}

export default App