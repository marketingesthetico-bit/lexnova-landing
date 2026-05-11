import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="bg-navy-dark text-white/70">
      <div className="container-narrow py-10 sm:py-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-7">
          <Logo monoColor="#E8F2EC" taglineColor="#E8F2EC" size={38} />

          <nav aria-label="Enlaces legales">
            <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[14px]">
              <li>
                <a
                  href="#aviso-legal"
                  className="hover:text-brand transition-colors"
                >
                  Aviso Legal
                </a>
              </li>
              <li aria-hidden="true" className="text-white/30">·</li>
              <li>
                <a
                  href="#politica-privacidad"
                  className="hover:text-brand transition-colors"
                >
                  Política de Privacidad
                </a>
              </li>
              <li aria-hidden="true" className="text-white/30">·</li>
              <li>
                <a
                  href="#politica-cookies"
                  className="hover:text-brand transition-colors"
                >
                  Política de Cookies
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-8 pt-6 border-t border-white/10 text-[13px] text-white/50 text-center md:text-left">
          © 2026 LexNova. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
