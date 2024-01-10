import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import RenderForms from './views/login/renderForms';
import Dashboard from './views/pages/dashboard/dashboard';
import Settings from './views/pages/settings/settings';
import HabitsRender from './views/pages/habits/habitsRender';

function App() {
  return (
    <BrowserRouter>
      <div className='Components'>

      </div>
      <div className='font-mainFont'>
        <Routes>
          <Route path='/' element={<RenderForms />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/settings' element={<Settings/>} />
          <Route path='/habits' element={<HabitsRender/>} />
        </Routes>
      </div>
    </BrowserRouter>

  );
}

export default App;
