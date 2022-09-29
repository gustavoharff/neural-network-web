import { useEffect, useState } from "react";
import axios from "axios";
import { styled } from "@stitches/react";
import { blackA } from "@radix-ui/colors";
import * as LabelPrimitive from "@radix-ui/react-label";

import "./styles.css";

const StyledLabel = styled(LabelPrimitive.Root, {
  fontSize: 15,
  fontWeight: 500,
  color: "white",
  userSelect: "none",
});

// Exports
const Label = StyledLabel;

// Your app...
const Flex = styled("div", { display: "flex" });
const Input = styled("input", {
  all: "unset",
  width: 200,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 4,
  padding: "0 10px",
  height: 35,
  fontSize: 15,
  lineHeight: 1,
  color: "white",
  backgroundColor: blackA.blackA5,
  boxShadow: `0 0 0 1px ${blackA.blackA9}`,
  "&:focus": { boxShadow: `0 0 0 2px black` },
});

function App() {
  const [file, setFile] = useState<FileList[number] | null>(null);

  const [result, setResult] = useState<string | null>(null);

  useEffect(() => {
    if (!file) return;

    const data = new FormData();
    data.append("file", file);

    axios
      .post("http://104.248.123.250:80", data)
      .then((response) => {
        setResult(JSON.stringify(response.data, null, 4));
      })
      .catch((error) => {
        if (axios.isAxiosError(error) && error.response?.status === 413) {
          alert("Arquivo muito grande.");
        } else {
          alert("Ocorreu um erro" + error);
        }
      });
  }, [file]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100vw",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage:
          "linear-gradient(330deg, hsl(272 51.0% 54.0%) 0%, hsl(226 70.0% 55.5%) 100%)",
      }}
    >
      <Flex
        css={{
          padding: "0 20px",
          flexWrap: "wrap",
          gap: 15,
          alignItems: "center",
        }}
      >
        <Label
          htmlFor="file"
          css={{
            lineHeight: "35px",
            border: "1px solid #ccc",
            display: "inline-block",
            padding: "6px 12px",
            cursor: "pointer",
          }}
        >
          Arquivo
        </Label>
        <Input
          id="file"
          type="file"
          name="file"
          onChange={(event) => {
            if (event.target.files?.[0]) {
              setFile(event.target.files?.[0]);
            }
          }}
          style={{
            display: "none",
          }}
        />
      </Flex>
      {result && (
        <pre
          style={{
            padding: 20,
            background: "#ffff",
            color: "rgb(111, 110, 119)",
            fontSize: 15,
            lineHeight: 1.5,
            borderRadius: 6,
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
