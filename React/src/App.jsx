
import AppRoute from './Routes/AppRoute';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
    <AppRoute />
    <ToastContainer position="top-center" />
    </>
  )
}

export default App