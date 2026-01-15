import { useEffect, useRef } from "react";

export default function CaptureBox({
    text,
    setText,
    onCheck,
    checking,
    error,
}) {
    const taRef = useRef(null);

    // Auto-grow textarea as you type
    useEffect(() => {
        const ta = taRef.current;
        if (!ta) return;
        ta.style.height = "auto";
        ta.style.height = `${ta.scrollHeight}px`;
    }, [text]);

    return (
        <div style={{ display: "grid", gap: 12 }}>
            <div style={{ fontWeight: 700, fontSize: 18 }}>Ready to capture</div>
            <div style={{ color: "#666" }}>
                Type or paste: <code>petrol 50, hotel 220, food 65</code>
            </div>

            <textarea
                ref={taRef}
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Start typing…"
                rows={3}
                style={{
                    width: "100%",
                    resize: "none",
                    padding: 12,
                    fontSize: 16,
                    lineHeight: 1.4,
                    borderRadius: 10,
                    border: "1px solid #ccc",
                    outline: "none",
                }}
            />

            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <button
                    onClick={onCheck}
                    disabled={checking || !text.trim()}
                    style={{
                        padding: "10px 14px",
                        borderRadius: 10,
                        border: "1px solid #333",
                        background: checking ? "#eee" : "#fff",
                        cursor: checking ? "not-allowed" : "pointer",
                        fontWeight: 600,
                    }}
                >
                    {checking ? "Checking…" : "Check"}
                </button>

                {error ? (
                    <span style={{ color: "crimson" }}>{error}</span>
                ) : (
                    <span style={{ color: "#666" }}>Nothing is saved yet.</span>
                )}
            </div>
        </div>
    );
}
