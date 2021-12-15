import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AboutUs from './Components/About';
import Landing from './Components/Landing';
import Rooms from './Components/RoomView/Rooms';
import RoomInfo from './Components/RoomView/RoomInfo';
import NotFound from './Components/Other/404';
import Contact from './Components/Contact';

function App() {

  sessionStorage.setItem('firebaseConfig', JSON.stringify({
    apiKey: "AIzaSyBdbqoJLSoYiFIOUECteUdrpLLRuSPLtAU",
    authDomain: "m150-shop.firebaseapp.com",
    projectId: "m150-shop",
    storageBucket: "m150-shop.appspot.com",
    messagingSenderId: "147834709976",
    appId: "1:147834709976:web:c07a3d89f716597e68f4ad"
  }));

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/about" component={AboutUs} />
        <Route exact path="/rooms" component={Rooms} />
        <Route exact path="/rooms/:name" component={RoomInfo} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
