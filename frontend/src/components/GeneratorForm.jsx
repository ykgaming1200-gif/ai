import React, { useState } from "react";

export default function GeneratorForm() {
  const [name, setName] = useState("todo-app");
  const [platform, setPlatform] = useState("react");
  const [description, setDescription] = useState("A todo app with localStorage persistence and dark mode");
  const [features, setFeatures] = useState("persistence:localStorage,darkMode:true");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleGenerate(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const payload = { name, platform, description, features: features.split(",").map(s => s.trim()) };
      const res = await fetch("/api/generate-app", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to generate app");
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${name}.zip`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      setError(String(err.message));
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleGenerate}>
      <label>App name<br />
        <input value={name} onChange={e => setName(e.target.value)} />
      </label>
      <div style={{ height: 8 }} />
      <label>Platform<br />
        <select value={platform} onChange={e => setPlatform(e.target.value)}>
          <option value="react">React (Vite)</option>
          <option value="next">Next.js</option>
          <option value="expo">React Native (Expo)</option>
        </select>
      </label>
      <div style={{ height: 8 }} />
      <label>Description<br />
        <textarea value={description} onChange={e => setDescription(e.target.value)} rows={3}/>
      </label>
      <div style={{ height: 8 }} />
      <label>Features (comma separated)<br />
        <input value={features} onChange={e => setFeatures(e.target.value)} />
      </label>
      <div style={{ height: 12 }} />
      <button type="submit" disabled={loading}>{loading ? "Generating…" : "Generate App"}</button>
      {error && <div style={{ color: "red", marginTop: 8 }}>{error}</div>}
      <div style={{ marginTop: 12, color: "#666", fontSize: 13 }}>
        Note: The frontend proxies /api to the backend (localhost:3000).
      </div>
    </form>
  );
}
