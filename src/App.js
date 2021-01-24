import "./App.css";
import { Header } from "./components/Header";
import { Book } from "./components/Book";
import { Books } from "./components/Books";
import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route component={Books} exact path="/" />
        <Route component={Books} exact path="/books" />
        <Route component={Book} exact path="/book/:id" />
      </Switch>
    </div>
  );
}

export default App;
