import { useState, useRef, useEffect } from "react";
import { callClaude, buildCoachSystem } from "../lib/claude";
import { QUICK_PROMPTS } from "../lib/constants";

export default function AICoach({ data, stepId }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);

  // Reset messages when step changes, set welcome message
  useEffect(() => {
    const welcomes = {
      headline:  "I am here to help sharpen your headline. A great PRFAQ headline announces the customer benefit like a real news story — specific, compelling, and free of jargon. Share what you are thinking.",
      problem:   "Let us define the problem your initiative solves. The strongest problem statements are written in the customer's voice — what they experience, not what the org chart says.",
      solution:  "Now describe the solution from the customer's perspective. What did you build, how does it work at a high level, and why is it meaningfully better than what existed before?",
      benefits:  "List the concrete benefits customers will experience. Be specific and measurable. 'Customers save time' is weak. 'Customers resolve billing questions in under 90 seconds, without hold time' is strong.",
      quotes:    "Quotes bring the PRFAQ to life. The executive quote should articulate the vision. The customer quote should feel like something a real person would actually say — emotional, specific, human.",
      faqs:      "FAQs are where skeptics get answered. Customer FAQs cover how this affects them. Internal FAQs address whether you can build it and whether it makes financial sense. Do not avoid the hard questions.",
      review:    "You have drafted all the sections. Ask me anything — I can critique it, identify what is missing, or help strengthen any section before you finalize.",
      output:    "Your Working Backwards framework has been generated. Use the chat below to ask me to expand any section, explain the reasoning, or explore implications for your team.",
    };
    setMessages(welcomes[stepId] ? [{ role: "ai", text: welcomes[stepId] }] : []);
    setInput("");
  }, [stepId]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const send = async (text) => {
    const txt = text.trim();
    if (!txt || loading) return;
    setMessages((m) => [...m, { role: "user", text: txt }]);
    setInput("");
    setLoading(true);

    const history = [...messages, { role: "user", text: txt }]
      .filter((m) => m.role !== "system")
      .map((m) => ({ role: m.role === "ai" ? "assistant" : "user", content: m.text }));

    try {
      const reply = await callClaude(history, buildCoachSystem(data, stepId));
      setMessages((m) => [...m, { role: "ai", text: reply }]);
    } catch (e) {
      setMessages((m) => [...m, { role: "ai", text: `⚠ ${e.message}` }]);
    }
    setLoading(false);
  };

  const quickPrompts = QUICK_PROMPTS[stepId] || [];

  return (
    <aside className="ai-panel">
      <div className="ai-panel-header">
        <div className="ai-panel-icon">✦</div>
        <span className="ai-panel-title">AI Coach</span>
        <span className="ai-panel-meta">Claude · Working Backwards Expert</span>
      </div>

      <div className="ai-messages">
        {messages.map((m, i) => (
          <div key={i} className={`msg msg-${m.role}`}>
            <span className="msg-label">{m.role === "user" ? "You" : "Claude"}</span>
            <div className="msg-bubble">{m.text}</div>
          </div>
        ))}
        {loading && (
          <div className="msg msg-ai">
            <span className="msg-label">Claude</span>
            <div className="msg-bubble typing">
              <span className="dot" /><span className="dot" /><span className="dot" />
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      {quickPrompts.length > 0 && (
        <div className="quick-prompts">
          {quickPrompts.map((p, i) => (
            <button key={i} className="quick-btn" onClick={() => send(p)}>{p}</button>
          ))}
        </div>
      )}

      <div className="ai-input-row">
        <textarea
          className="ai-input"
          rows={2}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask for feedback, a rewrite, or a harder question…"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(input); }
          }}
        />
        <button className="ai-send" disabled={!input.trim() || loading} onClick={() => send(input)}>
          ↑
        </button>
      </div>
    </aside>
  );
}
