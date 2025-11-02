export default function About() {
    return (
        <section
            style={{
                maxWidth: "600px",
                margin: "2rem auto",
                padding: "1.5rem",
                background: "rgba(255,255,255,0.05)",
                borderRadius: "6px",
                lineHeight: "1.6",
                color: "var(--color-light)",
                textAlign: "left",
            }}
        >
            <h1
                style={{
                    fontSize: "1.6rem",
                    marginBottom: "1rem",
                    color: "var(--color-pink)",
                    borderBottom: "2px solid var(--color-border)",
                    paddingBottom: "0.4rem",
                }}
            >
                Tentang Aplikasi
            </h1>

            <p style={{ marginBottom: "0.8rem" }}>
                <strong>UTS Pemrograman Web</strong> — Varasina Farmadani (
                <span style={{ color: "var(--color-teal)" }}>123140107</span>)
            </p>

            <p style={{ marginBottom: "0.8rem" }}>
                Aplikasi ini dibangun menggunakan <strong>React</strong> dan memanfaatkan{" "}
                <strong>iTunes Search API</strong> untuk menampilkan daftar musik secara real-time.
                Aplikasi mendukung pencarian global, manajemen playlist lokal, serta pemutar musik mini
                dengan <em>seekbar</em> interaktif.
            </p>

            <p style={{ marginBottom: "1.2rem" }}>
                Tujuan utama aplikasi ini adalah sebagai implementasi konsep
                <strong> komponen dinamis, event-driven state management,</strong> dan
                integrasi API eksternal pada pengembangan web modern.
            </p>

            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.4rem",
                    marginTop: "1.2rem",
                }}
            >
                <a
                    href="https://github.com/sinavarasina/uts-pemweb-123140107"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        color: "var(--color-teal)",
                        textDecoration: "none",
                        fontWeight: "500",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.4rem",
                        transition: "opacity 0.2s ease",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = 0.75)}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = 1)}
                >
                    <img
                        src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/github.svg"
                        alt="GitHub"
                        width="20"
                        height="20"
                        style={{ filter: "invert(80%)" }}
                    />
                    Lihat Repository di GitHub
                </a>

                <p style={{ fontSize: "0.8rem", opacity: 0.7 }}>
                    Dibuat dengan buru buru karena mengerjakan di hari terakhir sebelum deadline — 2 NOV 2025
                </p>
            </div>
        </section>
    );
}

