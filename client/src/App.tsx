import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Navbar from './components/Navbar';
import { Provider } from 'react-redux';
import store from './redux/store';
import PhishingAttemptForm from './components/PhishingForm';
import PhishingAttemptsTable from './components/PhishingAttemptsTable';

function App() {
  return (
    <Provider store={store}>
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/phishing-form' element={<PhishingAttemptForm/>}></Route>
        <Route path='/phishing-table' element={<PhishingAttemptsTable/>}></Route>
        <Route></Route>
      </Routes>
    </BrowserRouter>
    </Provider>
  );
}

export default App;
