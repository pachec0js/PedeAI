'use client';
import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const Loader = () => {
  return (
    <div
      style={{
        height: '50vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <DotLottieReact
        src="https://lottie.host/b3a51e21-a5f9-4ee2-889f-0ccdf8e77e82/tlwKbViqEB.lottie"
        loop
        autoplay
        style={{ width: '200px', height: '200px' }}
      />
      <h2 style={{ color: '#ff9d00', fontWeight: 'bold', marginTop: '20px' }}>
        Separando os melhores pedidos pra você...
      </h2>
    </div>
  );
};

export default Loader;
