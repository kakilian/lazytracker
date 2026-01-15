import { useMemo, useState } from "react";
import CaptureBox from "./components/CaptureBox.jsx";
import PreviewList from "./components/PreviewList.jsx";
import { checkText } from "./api.js";

function addIds(preview) {
    // Add stable IDs to items so Remove/Undo works even if labels repeat.
    const items = (preview.items || []).map((it, idx) => ({
        ...it,
        _id: `${it.label}-${it.amount}-${idx}`,
    }));
    return { ...preview, items };
}

export default function App() {
    const [text, setText] = useState("");
    const [checking, setChecking] = useState(false);
    const [error, setError] = useState("");
    const [preview, setPreview] = useState(null);

    // Remove/Undo state (IDs)
    const [removed, setRemoved] = useState(() => new Set());

    const removedIds = useMemo(() => removed, [removed]);

    async function onCheck() {
        setError("");
        setChecking(true);
        try {
            const res = await checkText(text);
            setPreview(addIds(res));
            setRemoved(new Set()); // reset removes on new check
        } catch (e) {
            setPreview(null);
            setRemoved(new Set());
            setError(e.message || "Check failed");
        } finally {
            setChecking(false);
        }
    }

    function onRemove(id) {
        setRemoved((prev) => new Set(prev).add(id));
    }

    function onUndo(id) {
        setRemoved((prev) => {
            const next = new Set(prev);
            next.delete(id);
            return next;
        });
    }

    return (
        <div
            style={{
                maxWidth: 720,
                margin: "40px auto",
                padding: 16,
                fontFamily:
                    'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial',
            }}
        >
            <div style={{ fontWeight: 900, fontSize: 26, marginBottom: 16 }}>
                LazyTracker
            </div>

            <CaptureBox
                text={text}
                setText={setText}
                onCheck={onCheck}
                checking={checking}
                error={error}
            />

            <PreviewList
                preview={preview}
                removedIds={removedIds}
                onRemove={onRemove}
                onUndo={onUndo}
            />
        </div>
    );
}
