import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { Toaster } from 'react-hot-toast';


function App() {

  return (
    <>

      <Header />

      <main className='min-h-[calc(100vh-100px)] flex items-center justify-center'>
        <Outlet />
      </main>

      <Footer />
      <Toaster />
    </>
  )
}

export default App;
