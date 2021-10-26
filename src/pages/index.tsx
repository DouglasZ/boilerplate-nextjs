import React from 'react';
import Main from '../components/Main';
import dynamic from 'next/dynamic';

const Apollo = dynamic(() => import('../contexts/Apollo'), { ssr: false });

export default function Home() {
  return (
    <Apollo>
      <Main />
    </Apollo>
  );
}
