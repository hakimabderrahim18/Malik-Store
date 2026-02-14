export default function Footer() {
  return (
    <footer className="bg-blue-950 text-white text-sm">
      <div className="container mx-auto px-4 py-4 grid md:grid-cols-3 gap-4">

        {/* Logo & Description */}
        <div>
          <h2 className="text-xl font-bold mb-1">
            Stock<span className="text-[#3DE0FC]">Manager</span>
          </h2>
          <p className="text-xs text-gray-300 leading-tight">
            Application de gestion de stock simple et efficace pour les petits commerces.
          </p>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-base font-semibold mb-2 text-[#E977F5]">
            Contact
          </h3>
          <ul className="space-y-1 text-xs">
            <li>📍 Tiaret, Algérie</li>
            <li>📞 +213 797060052</li>
            <li>✉️ Hakimaitabderrahim18@gmail.com</li>
          </ul>
        </div>

      </div>

      <div className="border-t border-white/10 text-center py-2 text-xs text-gray-400">
        © {new Date().getFullYear()} StockManager — Tous droits réservés.
      </div>
    </footer>
  );
}
