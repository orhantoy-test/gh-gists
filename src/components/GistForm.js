import { useEffect, useState } from "react";

const INITIAL_FIELDS = {
  description: "",
  isPublic: true,
  fileName: "",
  fileContent: "",
};

export default function GistForm(props) {
  const { createGist, submitting, lastCreatedId } = props;

  const [fields, setFields] = useState(INITIAL_FIELDS);
  const { description, isPublic, fileName, fileContent } = fields;

  useEffect(() => {
    if (lastCreatedId) {
      setFields(INITIAL_FIELDS);
    }
  }, [lastCreatedId]);

  const setField = (field, value) => {
    setFields((prev) => ({ ...prev, [field]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const payload = {
      description,
      files: {
        [fileName]: { content: fileContent },
      },
      public: isPublic,
    };

    createGist(payload)
      .then(() => {})
      .catch((e) => {
        alert(`Unexpected error: ${e}`);
        console.error(e);
      });
  };

  return (
    <form onSubmit={onSubmit}>
      <h1>Create Gist</h1>
      <div>
        <input
          type="text"
          style={{ fontSize: "24px", width: "500px" }}
          placeholder="Gist description"
          value={description}
          onChange={(e) => setField("description", e.target.value)}
        />
      </div>
      <div style={{ margin: "20px 0" }}>
        <div style={{ margin: "5px 0" }}>
          <input
            type="text"
            style={{ fontSize: "14px", width: "250px" }}
            placeholder="Filename"
            value={fileName}
            onChange={(e) => setField("fileName", e.target.value)}
          />
        </div>
        <div style={{ margin: "5px 0" }}>
          <textarea
            style={{ fontFamily: "monospace", width: "500px", height: "200px" }}
            value={fileContent}
            onChange={(e) => setField("fileContent", e.target.value)}
          />
        </div>
      </div>
      <div style={{ margin: "20px 0" }}>
        <label>
          <input
            type="checkbox"
            checked={!isPublic}
            onChange={(e) => setField("isPublic", !e.target.checked)}
          />{" "}
          <strong style={{ fontSize: "14px" }}>
            This gist should not be public
          </strong>
        </label>
      </div>
      <div style={{ margin: "20px 0" }}>
        <button
          disabled={submitting}
          type="submit"
          style={{ fontSize: "18px", cursor: "pointer" }}
        >
          {submitting ? "Creating gist..." : "Create gist"}
        </button>
      </div>
    </form>
  );
}
