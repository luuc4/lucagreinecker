"use client";

// Greift nur, wenn das Root-Layout selbst wirft; muss html und body
// mitbringen, weil das Layout dann nicht gerendert wurde (deshalb auch
// Inline-Styles statt Tailwind; light-dark() folgt dem System wie
// globals.css). Ohne Layout gibt es keine Sprache und keine Nachrichten:
// beide Sätze stehen hier fest, Deutsch zuerst.
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
          colorScheme: "light dark",
          background: "light-dark(#f5f5f2, #141413)",
          color: "light-dark(#000000, #f5f5f2)",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <main style={{ padding: "2rem", maxWidth: "40rem" }}>
          <h1>Da ist etwas schiefgegangen</h1>
          <p lang="en">Something went wrong.</p>
          <button
            type="button"
            onClick={reset}
            style={{ marginTop: "1rem", minHeight: 44, padding: "0.5rem 1rem" }}
          >
            Noch einmal versuchen <span lang="en">/ Try again</span>
          </button>
        </main>
      </body>
    </html>
  );
}
