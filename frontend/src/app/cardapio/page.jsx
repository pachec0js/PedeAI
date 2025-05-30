'use client';

import { useEffect, useState } from 'react';
import connectBack from '../../services/connectBack';

export default function Cardapio() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    connectBack.get('/produtos').then((res) => {
      setProdutos(res.data);
    });
  }, []);

  return (
    <div>
      <h1>Cardápio</h1>
      <div className="row">
        {produtos.map((p) => (
          <div className="col-3" key={p.id}>
            <div className="card mb-3">
              <div className="card-body">
                <h5>{p.nome}</h5>
                <p>R$ {p.preco}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
