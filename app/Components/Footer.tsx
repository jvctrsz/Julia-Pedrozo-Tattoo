import Link from "next/link";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { EMAIL, INSTAGRAM_URL, WHATSAPP_URL } from "@/src/config";

const Footer = () => {
  return (
    <footer className="bg-black text-white divide-y divide-white/10 ">
      <div className="grid md:grid-cols-3 gap-12 max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div>
          <h3 className="text-2xl mb-4">
            JULIA<span className="text-white/60">PEDROZO</span>
          </h3>
          <p className="text-white/60">
            Tatuadora especialista em Blackwork, Fine Line e outros estilos. Sinop - MT.
          </p>
        </div>

        <div>
          <h4 className="text-sm uppercase tracking-wider mb-4">
            Acesso Rápido
          </h4>
          <ul className="flex flex-col gap-2">
            <li>
              <Link
                href="/portfolio"
                className="text-white/60 hover:text-white transition-colors"
              >
                Portfólio
              </Link>
            </li>
            <li>
              <Link
                href="/sobre"
                className="text-white/60 hover:text-white transition-colors"
              >
                Sobre
              </Link>
            </li>
            <li>
              <Link
                href="/contatos"
                className="text-white/60 hover:text-white transition-colors"
              >
                Contatos
              </Link>
            </li>
            <li>
              <Link
                href="/faq"
                className="text-white/60 hover:text-white transition-colors"
              >
                Dúvidas Frequentes
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm uppercase tracking-wider mb-4">Contatos</h4>
          <ul className="flex gap-4" aria-label="Redes sociais">
            <li>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-white transition-colors hover:scale-110"
                aria-label="Instagram de Julia Pedrozo"
              >
                <FaInstagram />
              </a>
            </li>
            <li>
              <a
                href={`mailto:${EMAIL}`}
                className="text-white/60 hover:text-white transition-colors hover:scale-110"
                aria-label="Enviar email para Julia Pedrozo"
              >
                <MdEmail />
              </a>
            </li>
            <li>
              <a
                href={WHATSAPP_URL}
                className="text-white/60 hover:text-white transition-colors hover:scale-110"
                aria-label="WhatsApp de Julia Pedrozo"
              >
                <FaWhatsapp />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <small className="block py-8 text-center text-white/40 text-sm">
        &copy; {new Date().getFullYear()} JULIA PEDROZO. Todos os direitos reservados.
      </small>
    </footer>
  );
};

export default Footer;
