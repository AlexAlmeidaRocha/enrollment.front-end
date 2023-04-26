import './App.css';
import Router from './router/Router';
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from './hooks/useAuth';
import { ToastContainer } from 'react-toastify';

function App() {
  return (    
    <div className="App">
      <ToastContainer/>
      <BrowserRouter>
        <AuthProvider>
          <Router />
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
