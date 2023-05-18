import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import { Link, useNavigate, useParams } from "react-router-dom";
import Button from "@atlaskit/button";
import { view } from "@forge/bridge";

function LandingPage() {
  return (
    <>
      <h2>Intro</h2>
      <p>
        This is an example of an app written in JavaScript to showcase Jira
        Project Subpages.
        <br />
        Subpages are used within a <code>jira:projectPage</code> module to
        create more than one page accessible to users from your Forge
        application.
        <br />
        The routing between all existing subpages is done by the framework used
        for building your Custom UI (for instance <code>react-router</code>):
      </p>
      <ul>
        <li>
          <Link to="/another-page">Route to another page</Link>
        </li>
        <li>
          <Link to="/with-parameter/foo">Route with parameter: foo</Link>
        </li>
        <li>
          <Link to="/with-parameter/bar">Route with parameter: bar</Link>
        </li>
      </ul>
    </>
  );
}

function AnotherPage() {
  const navigate = useNavigate();

  const handleClick = () => navigate("/with-parameter/foo");

  return (
    <>
      <h2>Another page</h2>
      <p>
        Here&#39;s another subpage from which users can navigate back and forth.
        <br />
        Routing is handled by the frontend framework picking for building your
        Custom UI.
        <br />
        Example of programmatic routing:
        <br />
      </p>
      <Button appearance="primary" onClick={handleClick} >
        Click to navigate to next page
      </Button>
      <p>
        <Link to="/landing-page">Return to landing page</Link>
      </p>
    </>
  );
}

function WithParam() {
  const { param } = useParams();

  return (
    <>
      <h2>Using Route param: {param}</h2>
      <p>
        Subpages can be wrapped with a header in their definition in{" "}
        <code>manifest.yaml</code>.
      </p>
      <p>
        <Link to="/landing-page">Return to landing page</Link>
      </p>
    </>
  );
}



function SubPagesApp() {
  const [history, setHistory] = useState(null);

  useEffect(() => {
    view.createHistory().then((newHistory) => {
      setHistory(newHistory);
    });
  }, []);

  const [historyState, setHistoryState] = useState(null);

  useEffect(() => {
    if (!historyState && history) {
      setHistoryState({
        action: history.action,
        location: history.location,
      });
    }
  }, [history, historyState]);

  useEffect(() => {
    if (history) {
      history.listen((location, action) => {
        setHistoryState({
          action,
          location,
        });
      });
    }
  }, [history]);

  return (
    <div>
      {history && historyState ? (
        <Router
          navigator={history}
          navigationType={historyState.action}
          location={historyState.location}
        >
          <Routes>
            <Route path="/landing-page" element={<LandingPage />}></Route>
            <Route path="/another-page" element={<AnotherPage />}></Route>
            <Route path="/with-parameter/:param" element={<WithParam />}></Route>
          </Routes>
        </Router>
      ) : (
        "Loading..."
      )}
    </div>
  );
}

export default SubPagesApp;
