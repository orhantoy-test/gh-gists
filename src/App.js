import { useState, useEffect } from "react";

import GistForm from "./components/GistForm";
import GistOverview from "./components/GistOverview";

function App() {
  const [gistsResult, setGistsResult] = useState({});
  const [createGistResult, setCreateGistResult] = useState({});

  useEffect(() => {
    getGists()
      .then()
      .catch((e) => {
        alert(`Unexpected error: ${e}`);
        console.error(e);
      });
  }, []);

  const getGists = async () => {
    setGistsResult({ loading: true });
    const response = await fetch("/api/gh/gists");

    if (response.ok) {
      const data = await response.json();
      setGistsResult({ data });
      return;
    }

    alert("Received unexpected error from GitHub API");
    console.error("Received unexpected error from GitHub API", response.status);
    setGistsResult({ loading: false });
  };

  const createGist = async (payload) => {
    setCreateGistResult({ submitting: true });

    const response = await fetch("/api/gh/gists", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (response.ok) {
      setCreateGistResult({ lastCreatedId: data.id });
      return;
    }

    if ("message" in data) {
      setCreateGistResult({ errorMessage: data.message });
    } else {
      alert("Received unexpected error from GitHub API");
      console.error(
        "Received unexpected error from GitHub API",
        response.status,
        data
      );
      setCreateGistResult({ submitting: false });
    }
  };

  return (
    <div style={{ maxWidth: "720px", margin: "40px" }}>
      <GistForm
        createGist={createGist}
        submitting={!!createGistResult.submitting}
        lastCreatedId={createGistResult.lastCreatedId}
        errorMessage={createGistResult.errorMessage}
      />

      <hr />
      <h1>Your Gists</h1>
      <GistOverview
        getGists={getGists}
        loading={gistsResult.loading}
        data={gistsResult.data}
      />
    </div>
  );
}

export default App;
