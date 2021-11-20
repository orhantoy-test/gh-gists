export default function GistOverview(props) {
  const { loading, data } = props;

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <ul>
      {Array.isArray(data) &&
        data.map((gist) => {
          const fileName = Object.keys(gist.files)[0];
          const file = gist.files[fileName];

          return (
            <li key={gist.id}>
              <h2>
                <a href={gist.html_url} target="_blank" rel="noreferrer">
                  {gist.description ? (
                    gist.description
                  ) : (
                    <code style={{ fontSize: "18px" }}>{gist.id}</code>
                  )}
                </a>
                {!gist.public && (
                  <>
                    {" "}
                    <strong style={{ backgroundColor: "#ffb" }}>
                      🔒 Secret
                    </strong>
                  </>
                )}
              </h2>
              <div>
                <p>
                  <a href={file.raw_url} target="_blank" rel="noreferrer">
                    {file.filename}
                  </a>{" "}
                  ({file.language})
                </p>
              </div>
            </li>
          );
        })}
    </ul>
  );
}
