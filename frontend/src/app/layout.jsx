import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './globals.css';
import NavClient from '@/components/NavClient/Nav';
import FooterClient from '@/components/FooterClient/Footer';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <div>{children}</div>
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-j1CDi7MgGQ12Z7Qab0qlWQ/Qqz24Gc6BM0thvEMVjHnfYGF0rmFCozFSxQBxwHKO"
          crossOrigin="anonymous"
        ></script>
      </body>
    </html>
  );
}
