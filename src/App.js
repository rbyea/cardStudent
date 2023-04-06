import { Route, Switch } from "react-router-dom";
import logo from "./logo.svg";
import MainPage from "./layouts/MainPage";
import CreatePage from "./layouts/CreatePage";

function App() {
  return (
    <div className="container">
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route path="/create" component={CreatePage}></Route>
      </Switch>
    </div>
  );
}

export default App;