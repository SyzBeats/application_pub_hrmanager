import { ApolloClient, ApolloProvider, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import DashboardContainer from "./components/dashboard/DashboardContainer";
import theme from "./components/layout/theme";
import { ThemeProvider } from "styled-components";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import PublicRoute from "./components/routes/PublicRoute";

import "./App.css";
import LoginContainer from "./components/layout/LoginContainer";
import AdminRoute from "./components/routes/AdminRoute.js";
import { cache } from "./config/cache";

// enably link system
const httpLink = createHttpLink({
  uri: "http://localhost:4000",
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage
  const token = localStorage.getItem("token");
  // return headers to context to supply httpLink
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <ThemeProvider theme={theme}>
          <Router>
            <Switch>
              <PublicRoute exact path="/" component={LoginContainer} />
              <AdminRoute exact path="/dashboard" component={DashboardContainer} />
              {/*Could be integrated as next feature */}
            </Switch>
          </Router>
        </ThemeProvider>
      </div>
    </ApolloProvider>
  );
}

export default App;
