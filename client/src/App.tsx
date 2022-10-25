import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { Top } from "./pages/Top";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";

import { Header } from "./components/header/header";
import { Show } from "./pages/Show";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Top />} />
          <Route path="/people/:id" element={<Show />} />
          <Route path="*" element={<Navigate replace to={"/"} />} />
        </Routes>
      </div>
    </ApolloProvider>
  );
}

export default App;
