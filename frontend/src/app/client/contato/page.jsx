'use client'; // Adicionar para usar hooks do React

import { useEffect, useState } from 'react'; // Importar hooks
import './contato.css';
import Image from 'next/image'

export default function Contato() {
  const [faqItems, setFaqItems] = useState([]);
  const [loadingFaq, setLoadingFaq] = useState(true);
  const [errorFaq, setErrorFaq] = useState(null);

  useEffect(() => {
    fetch('/api/faq.json') // Caminho para o arquivo JSON na pasta public
      .then((response) => {
        if (!response.ok) {
          throw new Error('Falha ao carregar as Dúvidas Frequentes');
        }
        return response.json();
      })
      .then((data) => {
        setFaqItems(data);
        setLoadingFaq(false);
      })
      .catch((error) => {
        console.error('Erro ao buscar FAQ:', error);
        setErrorFaq(error.message);
        setLoadingFaq(false);
      });
  }, []);

  return (
    <>
      <img src="/imgs/Bannerpc/Contato.png" alt="" className="banner" />

      <section className="contatoSection">
        <div className="container py-5">
          <div className="row">
            {/* Bloco esquerdo */}
            <div className="col-md-6 mb-4">
              <div className="row cardBox">
                <div className="col-md-5 cardItem">
                  <i className="bi bi-telephone-fill"></i>
                  <h5>Horário de atendimento</h5>
                  <p>Segunda á Sexta - 7h ás 17h</p>
                </div>
                <div className="col-md-5 cardItem">
                  <i className="bi bi-whatsapp"></i>
                  <h5>Whatsapp</h5>
                  <p>(11) 95466-6323</p>
                </div>
                <div className="col-md-5 cardItem">
                  <i className="bi bi-envelope-fill"></i>
                  <h5>Email</h5>
                  <p>contatePedeAI@gmail.com</p>
                </div>
                <div className="col-md-5 cardItem">
                  <i className="bi bi-shop"></i>
                  <h5>Localização</h5>
                  <p>Cantina escolar - Bloco A</p>
                </div>
              </div>
              {/* Mapa */}
              <div className="mapa mt-4">
                <iframe
                  title="Google Maps"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.121299700009!2d-46.6569881849383!3d-23.56331878468117!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59b60353a761%3A0x8f1b15f5c5a4c53e!2sAv.%20Paulista%2C%20S%C3%A3o%20Paulo%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1678886590091!5m2!1spt-BR!2sbr" // Exemplo de src do Google Maps
                  width="100%"
                  height="200"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </div>
            </div>

            {/* Formulário */}
            <div className="col-md-6">
              <h1 className=" title fw-bold bi bi-telephone-fill me-2">
                {' '}
                Dúvida ou feedback?
              </h1>
              <h4 className="subtitle">Escreva seu comentário abaixo!</h4>
              <form className="form">
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <h5 className="titulo-h5">Nome </h5>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Ex: Jorge Daniel"
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <h5 className="titulo-h5">Email</h5>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Ex: jorge@emaileducacional.com"
                      required
                    />
                  </div>
                </div>
                <h5 className="titulo-h5">Assunto</h5>
                <div className="mb-3">
                  <select
                    className="form-select"
                    aria-label="Default select example"
                  >
                    <option>Escolha uma opção</option>
                    <option value="Duvida">Dúvida</option>
                    <option value="Feedback">Feedback</option>
                    <option value="Outro">Outro</option>
                  </select>
                </div>
                <h5 className="titulo-h5">Mensagem</h5>
                <div className="mb-3">
                  <textarea
                    className="form-control"
                    rows="5"
                    placeholder="Escreva sua mensagem aqui..."
                  ></textarea>
                </div>
                <button type="submit" className="submitButton">
                  Enviar Agora
                </button>
              </form>
            </div>

            <div className="d-flex flex-wrap mt-5">
  {/* Dúvidas Frequentes - 60% */}
  <div className="col-md-7 col-12">
    <h1 className="duvida title fw-bold bi bi-patch-question-fill me-2">
      Dúvidas frequentes
    </h1>
    <h4 className="subtitle">Confira se sua dúvida já foi respondida!</h4>

    {loadingFaq && <p>Carregando dúvidas frequentes...</p>}
    {errorFaq && (
      <p className="text-danger">
        Erro ao carregar dúvidas: {errorFaq}
      </p>
    )}

    {!loadingFaq && !errorFaq && faqItems.length > 0 && (
      <div className="accordion accordion-flush" id="accordionFlushExample">
        {faqItems.map((item) => (
          <div className="accordion-item" key={item.id}>
            <h2 className="accordion-header" id={`flush-heading-${item.id}`}>
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#flush-collapse-${item.id}`}
                aria-expanded="false"
                aria-controls={`flush-collapse-${item.id}`}
              >
                {item.pergunta}
              </button>
            </h2>
            <div
              id={`flush-collapse-${item.id}`}
              className="accordion-collapse collapse"
              aria-labelledby={`flush-heading-${item.id}`}
              data-bs-parent="#accordionFlushExample"
            >
              <div className="accordion-body">{item.resposta}</div>
            </div>
          </div>
        ))}
      </div>
    )}

    {!loadingFaq && !errorFaq && faqItems.length === 0 && (
      <p>Nenhuma dúvida frequente encontrada no momento.</p>
    )}
  </div>

  {/* Imagem do Mascote - 40% */}
  <div className="col-md-5 col-12 d-flex align-items-center justify-content-center">
    <Image
      src="/imgs/mascote/Faq.png"
      alt="Mascote"
      width={400}
      height={650}
    />
  </div>
</div>
</div>
        </div>
      </section>
    </>
  );
}
