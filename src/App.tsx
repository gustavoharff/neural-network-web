import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState<FileList[number] | null>(null);

  const [result, setResult] = useState<string | null>(null);

  useEffect(() => {
    if (!file) return;

    const data = new FormData();
    data.append("file", file);

    axios.post("http://104.248.123.250:80", data).then((response) => {
      setResult(JSON.stringify(response.data, null, 4));
    });
  }, [file]);

  return (
    <div>
      <input
        type="file"
        name="file"
        onChange={(event) => {
          if (event.target.files?.[0]) {
            setFile(event.target.files?.[0]);
          }
        }}
      />
      {result && (
        <pre
          style={{
            padding: 16,
            background: "#333131",
            color: "#ffff",
            fontSize: 24,
            borderRadius: 8,
            margin: "16px 32px",
          }}
        >
          {result}
        </pre>
      )}
    </div>
  );
}

export default App;
