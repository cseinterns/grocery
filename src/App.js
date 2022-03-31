import AddOrder from './addOrder';
import './App.css';
import './bootstrap.min.css';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import Home from './Home';
import Edit from './edit';
import Delete from './delete';

function App() {

  return (
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/">
              <Home/>
            </Route>
            <div className='actions'>
              <Route path="/add">
                <AddOrder/>
              </Route>
              <Route path='/register'>
                  <Register/>
               </Route>
               <Route path='/login'>
                  <Login/>
               </Route>
            </div>
          </Switch>
        </div>
      </Router>
  );
}

export default App;
