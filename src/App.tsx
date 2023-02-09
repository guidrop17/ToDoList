import { ToDoList } from "./ToDoList/ToDoList"
import "./global.css"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
      <>
        <ToDoList />
        <ToastContainer position="top-right" theme="dark" pauseOnHover/>
      </>
  )
}

export default App
