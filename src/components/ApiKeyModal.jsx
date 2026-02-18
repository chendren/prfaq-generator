import { useState } from "react";
import { saveUserKey } from "../lib/claude";

export default function ApiKeyModal({ onKeySet }) {
  const [key, setKey]       = useState("");
  const [error, setError]   = useState("");
  const [testing, setTesting] = useState(false);

  const handleSubmit = async () => {
    const trimmed = key.trim();
    if (!trimmed.startsWith("sk-ant-")) {
      setError("Anthropic API keys start with sk-ant- — please check your key.");
      return;
    }

    setTesting(true);
    setError("");

    // Validate the key with a minimal API call through the proxy
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type":    "application/json",
          "x-user-api-key":  trimmed,
        },
        body: JSON.stringify({
          messages:   [{ role: "user", content: "Hi" }],
          system:     "Reply with one word: Ready",
          max_tokens: 10,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Key validation failed — please check the key and try again.");
        setTesting(false);
        return;
      }

      // Key is good — save to session and continue
      saveUserKey(trimmed);
      onKeySet();
    } catch {
      setError("Could not reach the server. Please try again.");
      setTesting(false);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-card">
        <div className="modal-header">
          <div className="modal-icon">✦</div>
          <div>
            <div className="modal-title">Anthropic API Key Required</div>
            <div className="modal-sub">Your key is used for this session only</div>
          </div>
        </div>

        <div className="modal-body">
          <p className="modal-desc">
            This tool uses Claude to coach your PRFAQ and generate your Working Backwards framework.
            Enter your Anthropic API key to get started — it is stored only in your browser session
            and sent only to this app's server-side proxy. It is never logged or stored.
          </p>

          <div className="modal-field">
            <label className="modal-label">Anthropic API Key</label>
            <input
              className={`modal-input${error ? " modal-input-error" : ""}`}
              type="password"
              value={key}
              onChange={(e) => { setKey(e.target.value); setError(""); }}
              placeholder="sk-ant-api03-..."
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              autoFocus
            />
            {error && <div className="modal-error">{error}</div>}
          </div>

          <div className="modal-links">
            <a
              href="https://console.anthropic.com/settings/keys"
              target="_blank"
              rel="noopener noreferrer"
              className="modal-link"
            >
              Get your API key at console.anthropic.com →
            </a>
          </div>

          <div className="modal-security">
            <div className="modal-security-title">🔒 How your key is protected</div>
            <ul className="modal-security-list">
              <li>Stored in <strong>sessionStorage only</strong> — cleared when you close the tab</li>
              <li>Sent to <strong>this app's server proxy</strong>, never to Anthropic directly from your browser</li>
              <li>The proxy forwards it to Anthropic and <strong>does not log or store it</strong></li>
              <li>You can clear it any time from the settings icon in the header</li>
            </ul>
          </div>
        </div>

        <div className="modal-footer">
          <button
            className="btn-gold"
            onClick={handleSubmit}
            disabled={!key.trim() || testing}
            style={{ width: "100%" }}
          >
            {testing ? "Validating key…" : "Save Key & Continue →"}
          </button>
        </div>
      </div>
    </div>
  );
}
