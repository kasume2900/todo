
import './App.scss';
import TodoInput from './components/TodoInput';
import Complited from './components/Complited'
import { useSelector } from 'react-redux';

const App = () => {

  const complited = useSelector(state => state.todos.complited)


  return (
    <div className="App">
      <div className='conteiner'>
        {
          complited ? <Complited /> :<TodoInput />
        }
      </div>
    </div>
  );
}

export default App;
