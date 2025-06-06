'use client';
import NavClient from '@/components/NavClient/Nav';
import FooterClient from '@/components/FooterClient/Footer';
import BotBread from '@/components/BotBread/BotBread';

export default function ClientLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <NavClient />
        <div>{children}</div>
        <BotBread />
        <FooterClient />
      </body>
    </html>
  );
}
