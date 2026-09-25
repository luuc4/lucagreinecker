"use client";

// Greift nur, wenn das Root-Layout selbst wirft; muss html und body
// mitbringen, weil das Layout dann nicht gerendert wurde (deshalb auch
// Inline-Styles statt Tailwind).
export default function GlobalerFehler({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="de-AT">
      <body
        style={{
          margin: 0,
          minHeight: "100dvh",
          display: "grid",
          placeItems: "center",
          background: "#fafaf9",
          color: "#1c1917",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <main style={{ padding: "2rem", maxWidth: "40rem" }}>
          <h1>Da ist etwas schiefgegangen</h1>
          <button
            type="button"
            onClick={reset}
            style={{ marginTop: "1rem", minHeight: 44, padding: "0.5rem 1rem" }}
          >
            Noch einmal versuchen
          </button>
        </main>
      </body>
    </html>
  );
}
