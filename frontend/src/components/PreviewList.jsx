export default function PreviewList({
    preview,
    removedIds,
    onRemove,
    onUndo,
}) {
    if (!preview) return null;

    const { items = [], total = 0, unparsed = [] } = preview;

    const visibleItems = items.filter((it) => !removedIds.has(it._id));
    const removedItems = items.filter((it) => removedIds.has(it._id));

    const visibleTotal = visibleItems.reduce((sum, it) => sum + it.amount, 0);

    return (
        <div style={{ display: "grid", gap: 12, marginTop: 18 }}>
            <div style={{ fontWeight: 700, fontSize: 16 }}>Preview</div>

            <div
                style={{
                    padding: 12,
                    borderRadius: 10,
                    border: "1px solid #ddd",
                    background: "#fafafa",
                    display: "flex",
                    justifyContent: "space-between",
                }}
            >
                <span style={{ color: "#555" }}>Total (after removals)</span>
                <span style={{ fontWeight: 800 }}>
                    {visibleTotal.toFixed(2)}
                </span>
            </div>

            <div style={{ display: "grid", gap: 8 }}>
                {visibleItems.length === 0 ? (
                    <div style={{ color: "#666" }}>No parsed items.</div>
                ) : (
                    visibleItems.map((it) => (
                        <div
                            key={it._id}
                            style={{
                                display: "grid",
                                gridTemplateColumns: "1fr auto auto",
                                gap: 10,
                                alignItems: "center",
                                padding: 10,
                                borderRadius: 10,
                                border: "1px solid #eee",
                            }}
                        >
                            <div style={{ fontWeight: 600 }}>{it.label}</div>
                            <div style={{ fontVariantNumeric: "tabular-nums" }}>
                                {it.amount.toFixed(2)}
                            </div>
                            <button
                                onClick={() => onRemove(it._id)}
                                style={{
                                    borderRadius: 10,
                                    padding: "6px 10px",
                                    border: "1px solid #999",
                                    background: "#fff",
                                    cursor: "pointer",
                                }}
                            >
                                Remove
                            </button>
                        </div>
                    ))
                )}
            </div>

            {removedItems.length > 0 && (
                <div style={{ display: "grid", gap: 8 }}>
                    <div style={{ fontWeight: 700 }}>Excluded (Undo)</div>
                    {removedItems.map((it) => (
                        <div
                            key={it._id}
                            style={{
                                display: "grid",
                                gridTemplateColumns: "1fr auto auto",
                                gap: 10,
                                alignItems: "center",
                                padding: 10,
                                borderRadius: 10,
                                border: "1px dashed #ccc",
                                background: "#fff",
                            }}
                        >
                            <div style={{ color: "#666" }}>{it.label}</div>
                            <div style={{ color: "#666" }}>{it.amount.toFixed(2)}</div>
                            <button
                                onClick={() => onUndo(it._id)}
                                style={{
                                    borderRadius: 10,
                                    padding: "6px 10px",
                                    border: "1px solid #333",
                                    background: "#fff",
                                    cursor: "pointer",
                                    fontWeight: 600,
                                }}
                            >
                                Undo
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {unparsed.length > 0 && (
                <div style={{ display: "grid", gap: 8 }}>
                    <div style={{ fontWeight: 700, color: "#b45309" }}>
                        Needs attention
                    </div>
                    {unparsed.map((u, idx) => (
                        <div
                            key={`${u}-${idx}`}
                            style={{
                                padding: 10,
                                borderRadius: 10,
                                border: "1px solid #f59e0b",
                                background: "#fff7ed",
                                color: "#7c2d12",
                            }}
                        >
                            {u}
                        </div>
                    ))}
                </div>
            )}

            {/* This just shows what backend total said, for comparison/debug */}
            <div style={{ color: "#888", fontSize: 12 }}>
                Backend total (raw parse): {Number(total).toFixed(2)}
            </div>
        </div>
    );
}
