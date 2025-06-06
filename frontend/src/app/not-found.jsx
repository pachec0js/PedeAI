import FooterClient from '@/components/FooterClient/Footer';
import NavClient from '@/components/NavClient/Nav';
import Link from 'next/link';

export default async function NotFound() {
  return (
    <>
      <NavClient />
      <div className="container text-center not-found mt-4 mb-4">
        <div className="row">
          <div className="col-md-12 text-center">
            <img
              src="https://placehold.co/400x200"
              className="w-50 img-fluid img-speak"
              alt="404"
            />
          </div>
          <h1>Nenhum resultado encontrado</h1>
          <p>
            Parece que essa página saiu para o recreio ou nunca esteve no nosso
            cardápio!
          </p>
          <Link href="/client">
            <button type="submit" className="btn btn-danger not-found-btn">
              Voltar ao início
            </button>
          </Link>
        </div>
      </div>
      <FooterClient />
    </>
  );
}
