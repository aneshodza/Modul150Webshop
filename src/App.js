import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AboutUs from './Components/About';
import Landing from './Components/Landing';
import Rooms from './Components/RoomView/Rooms';
import RoomInfo from './Components/RoomView/RoomInfo';
import NotFound from './Components/Other/404';
import Contact from './Components/Contact';
import Login from './Components/Login';
import Register from './Components/Register';
import Account from './Components/Account';
import { AuthProvider } from './Context/AuthContext';

function App() {

  return (
    <AuthProvider>
    <Router>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/about" component={AboutUs} />
        <Route exact path="/rooms" component={Rooms} />
        <Route exact path="/rooms/:name" component={RoomInfo} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/account" component={Account} />
        <Route component={NotFound} />
      </Switch>
    </Router>
    </AuthProvider>
  );
}

export default App;
