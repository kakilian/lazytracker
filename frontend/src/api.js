const API_BASE = "/api";

export async function checkText(text) {
    const res = await fetch(`${API_BASE}/check`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
    });

    if (!res.ok) {
        const msg = await res.text();
        throw new Error(`Check failed (${res.status}): ${msg}`);
    }

    return res.json();
}
