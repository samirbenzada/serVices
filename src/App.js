import React, { Suspense, lazy, useState, useMemo, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import { UserContext } from './UserContext';

import Footer from './js/components/Footer/Footer';
import NotFound from './js/components/NotFound/NotFound';
import ServiceNavbar from './js/components/Navbar/Navbar';

const Home = lazy(() => import('./js/views/home/home'));
const Login = lazy(() => import('./js/views/Login/Login'));
const LoggedHome = lazy(() => import('./js/views/LoggedHome/LoggedHome'));
const Register = lazy(() => import('./js/views/Register/Register'));
const Profile = lazy(() => import('./js/views/Profile/Profile'));

function App() {

  let tokenAuth = localStorage.getItem('token');
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [backen_url] = useState('https://iwash-backend.herokuapp.com/');
  const [Auth, setAuth] = useState(null);

  useEffect(() => {
    const handleResize = () => setWindowHeight(window.innerHeight);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  },[])

  const providerValue = useMemo(() => ({ windowHeight, backen_url, Auth, setAuth }), [ windowHeight, backen_url, Auth, setAuth ]);

  return (
    <Router>
      <UserContext.Provider value={providerValue}>
        <Suspense fallback={<div>Loading...</div>}>
          <ServiceNavbar/>
          <section style={{minHeight: windowHeight}}>
            <Switch>
              {!tokenAuth ? <Route exact path="/" component={Home} /> : <Route exact path="/" component={LoggedHome}/> }
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/profile" component={Profile} />
              <Route render={() => <NotFound/>} />
            </Switch>
            </section>
          <Footer/>
        </Suspense>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
