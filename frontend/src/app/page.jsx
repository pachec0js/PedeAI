'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function Home() {
  return (
    <div className="container text-center">
      <h1>Bem-vindo ao PedeAI</h1>
      <p>Escolha uma área para continuar:</p>
      <div className="d-flex justify-content-center gap-3">
        <a href="/client" className="btn btn-primary">
          Área do Cliente
        </a>
        <a href="/admin" className="btn btn-secondary">
          Área Administrativa
        </a>
      </div>
    </div>
  );
}
