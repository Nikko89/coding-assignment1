import React, { useState } from "react";
import "./App.css";
import StartingView from "./components/presentational/StartingView";
import PageControl from "./components/containers/PageControl";

function App() {
  const [appStarted, startApp] = useState(false);
  return (
    <div className="App">
      {appStarted ? (
        <PageControl />
      ) : (
        <StartingView onClick={() => startApp(true)}></StartingView>
      )}
    </div>
  );
}

export default App;
