"use client"
import Image from 'next/image'
import { useEffect, useState } from 'react';

export default function Home() {

  const [data, setData] = useState<string>('');

  useEffect(() => {
    fetch('http://localhost:8080')
      .then(response => response.text())
      .then(data => setData(data));
  }, []);

  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {data && <div>{data}</div>}
    </main>
  )
}
