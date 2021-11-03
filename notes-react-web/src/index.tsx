import ReactDOM from 'react-dom';
import Routes from './routes';

import "./styles/output.css";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import GlobalContext from './context';


ReactDOM.render(
  <GlobalContext>
  <Routes />
  <ToastContainer />
  </GlobalContext>,
  document.getElementById('root')
);


