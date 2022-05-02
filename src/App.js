import './App.css';
import Sidebar from "./Components/Sidebar/Sidebar.jsx";
import Dashboard from './Components/Main/Dashboard.jsx';

function App() {
  return (
    <div className='flex flex-wrap'>
      <div className='basis-full lg:basis-2/12 relative z-10'>
        <Sidebar />
      </div>
      <div className='basis-full lg:basis-10/12'>
        <Dashboard />
      </div>
    </div>
  );
}

export default App;
