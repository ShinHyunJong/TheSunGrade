// React Common Modules
import React, { Component } from "react";
// React Router
import { BrowserRouter as Router, Route, Link } from "react-router-dom"; // Material UI Provider for React
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import { green600 } from "material-ui/styles/colors";
// Own Modules
import {
  DefaultPage,
  DefaultReduxPage,
  HomePage,
  CategoryPage,
  LabelPage,
  BigLabelPage,
  TestPage,
  ActionPage,
  LevelPage,
  TestCreatePage,
  TestDetailPage,
  GradingPage,
  ChooseTest,
  ResultPage
} from "./Pages/";

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: green600
  },
  radioButton: {}
});

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <Router basename="/sungrade">
          <div>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/category" component={CategoryPage} />
            <Route path="/category/action" component={ActionPage} />
            <Route path="/category/level" component={LevelPage} />
            <Route exact path="/test" component={TestPage} />
            <Route path="/test/:test_id" component={TestDetailPage} />
            <Route path="/test/create" component={TestCreatePage} />
            <Route exact path="/grading" component={GradingPage} />
            <Route path="/grading/choose_test" component={ChooseTest} />
            <Route
              path="/grading/:exam_id/:student_name"
              component={ResultPage}
            />
          </div>
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default App;
