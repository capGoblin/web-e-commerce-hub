"use client";
import axios from "axios";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState<string>("");

  useEffect(() => {
    //   fetch('http://localhost:8080', {
    //     method: "GET",
    //     headers: {'Content-Type': 'application/json'},
    //     // body: JSON.stringify({
    //     //     username,
    //     //     message
    //     // })
    // }).then(response => response.text())
    // .then(data => setData(data));;

    fetch("http://localhost:8080")
      .then((response) => response.text())
      .then((data) => setData(data));
  }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:8080', {
  //         headers: {'Content-Type': 'application/json'},
  //       });
  //       setData(response.data);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {data && <div>{data}</div>}
    </main>
  );
}
