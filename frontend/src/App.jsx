import React from "react";
import GeneratorForm from "./components/GeneratorForm";

export default function App() {
  return (
    <div style={{ fontFamily: "sans-serif", maxWidth: 880, margin: "24px auto", padding: 12 }}>
      <h1>AppBuilder AI</h1>
      <p>Describe an app and download a ready-to-run project scaffold.</p>
      <GeneratorForm />
    </div>
  );
}
