export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black relative overflow-hidden">
      {/* Gradient Grid Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-linear-to-b from-transparent to-black/50" />
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(to right, #4f46e5 1px, transparent 1px),
              linear-gradient(to bottom, #4f46e5 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-gray-400">© {currentYear} | Portfolio</p>

          <div className="hidden sm:block w-1 h-1 bg-gray-700 rounded-full" />

          <p className="text-sm text-gray-400">
            Crafted by{" "}
            <span className="text-white font-medium">Chairul Ikhsan</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
