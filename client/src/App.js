import React, { useState, useEffect } from 'react';
import './styles/app.scss';
//Redux
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsersAction } from './actions/usersActions';
//Router
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
// Pages
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import TeamPage from './pages/TeamPage';
import SolutionsPage from './pages/SolutionsPage';
import SecondPage from './pages/SecondPage';
import ChatPage from './pages/ChatPage';
import ToolsPage from './pages/ToolsPage';
// Components
import Navbar from './components/common/Navbar';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import CreateSolutionPage from './pages/CreateSolutionPage';

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const history = useHistory();
  const [title, setTitle] = useState('Dashboard');
  // if (!user) history.push('/login')

  useEffect(() => {
    const fetchUsers = async () => {
      dispatch(fetchUsersAction());
    };
    fetchUsers();
  }, [dispatch, user]);

  return (
    <div className='app'>
      {!user ? (
        <LoginPage key='loginPage' />
      ) : (
        <div className='app__container'>
          <Navbar history={history} setTitle={setTitle} />
          <div className='app_mainContent'>
            <Header title={title} />
            <Switch>
              <Route exact path='/'>
                <Redirect to={user ? '/dashboard' : '/login'} />
              </Route>
              <Route path={('/', '/dashboard')} component={DashboardPage} />
              <Route
                path={['/createSolution', '/manageSolution/:id']}
                component={CreateSolutionPage}
              />
              <Route path='/team' component={TeamPage} />
              <Route path='/solutions' component={SolutionsPage} />
              <Route path='/second' component={SecondPage} />
              <Route path='/chat' component={ChatPage} />
              <Route path='/tools' component={ToolsPage} />
            </Switch>
            <Footer />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
