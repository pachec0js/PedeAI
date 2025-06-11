'use client';
import NavClient from '@/components/NavClient/Nav';
import FooterClient from '@/components/FooterClient/Footer';
import BotBread from '@/components/BotBread/BotBread';
import { ToastContainer } from 'react-toastify';
import '../../components/ToastPedeAI/ToastPedeAI.css'
import '../../components/ModalPedeAI/ModalPedeAI.css'

export default function ClientLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <NavClient />
        <div>{children}</div>
        <BotBread />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          toastClassName="toast-pedeai"
          bodyClassName="toast-body"
          progressClassName="toast-barra"
        />
        <FooterClient />
      </body>
    </html>
  );
}
