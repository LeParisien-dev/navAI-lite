import { useEffect, useState } from "react";

export default function Status() {
    const [status, setStatus] = useState<string>("Loading...");

    useEffect(() => {
        fetch("http://localhost:3000/health")
            .then((res) => res.json())
            .then((data) => setStatus(`API status: ${data.status} (${data.timestamp})`))
            .catch(() => setStatus("API not reachable"));
    }, []);

    return (
        <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
            <h1>Status de l’API</h1>
            <p>{status}</p>
        </div>
    );
}
