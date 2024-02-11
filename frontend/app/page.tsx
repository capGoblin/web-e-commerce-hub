"use client";
import axios from "axios";

import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Component } from "@/components/component";
import supabase from "@/lib/supabaseClient";
interface Product {
  title: string;
  imgSrc: string;
  price: string;
}

// interface Site {
//   id: number;
//   name: string;
//   products: Product[];
// }

interface SiteData {
  amazonPagee: Product[];
  ebayPagee: Product[];
}

interface MyComponentProps {
  sites: SiteData;
}
export default function Home() {
  const [data, setData] = useState<SiteData>();

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
      .then((response) => response.json()) // Extract JSON data from the response
      .then((data): void => {
        console.log(data);
        // data.forEach((item) => {
        //   // Log the products string before parsing it
        //   console.log(item.products);
        //   try {
        //     // Ensure item.products is a string before parsing it
        //     if (typeof item.products === "string") {
        //       item.products = JSON.parse(item.products);
        //     }
        //   } catch (error) {
        //     console.error("Error parsing products:", error);
        //   }
        // });
        setData(data);
        // Assuming setData is your state setter function
      })
      .catch((error) => console.error(error));
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
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Component data={data} />
      {/* {data && (
        <div>
          {data.map((site) => (
            <div key={site.id}>{site.name}</div>
          ))}
        </div>
      )} */}
    </main>
  );
}
