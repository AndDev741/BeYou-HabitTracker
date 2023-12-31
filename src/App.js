import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './views/login/login';
import RenderForms from './views/login/renderForms';
import Dashboard from './views/pages/dashboard/dashboard';

function App() {
  return (
    <BrowserRouter>
      <div className='Components'>

      </div>
      <div className='font-mainFont'>
        <Routes>
          <Route path='/' element={<RenderForms />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
      </div>
    </BrowserRouter>

  );
}

export default App;
