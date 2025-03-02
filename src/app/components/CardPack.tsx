"use client";

import { useEffect, useState } from "react";
import Card from "../types/Card";
import axios from "axios";
import Image from "next/image";

export default function CardPack() {
  const [cardData, setCardData] = useState<Card[]>([]);
  const [isClient, setIsClient] = useState(false);
  const [loading, setLoading] = useState(true);
  const [packs, setPacks] = useState(0);

  useEffect(() => {
    setIsClient(true);
    const randomPage = Math.floor(Math.random() * 3115);

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.pokemontcg.io/v2/cards?page=${randomPage}&pageSize=6`
        );
        setCardData(response.data.data);
      } catch (error) {
        console.error("Erro ao buscar os cards:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [packs]);

  if (!isClient) return null;

  const openPack = () => {
    setPacks(packs + 1);
    setLoading(true)
  };

  return (
    <>
      <main className="flex min-h-screen justify-center gap-5 items-center flex-wrap flex-col">
        <button
          onClick={openPack}
          className={`bg-blue-500 ${
            !packs && "mb-20"
          } text-white h-10 px-4 py-2 rounded cursor-pointer`}
        >
          Abrir Pacote de Cartas
        </button>
        {packs > 0 &&
          (loading ? (
            <div className="flex flex-wrap mb-12 min-h-screen justify-center items-center">
              <Image
                src="/loading.gif"
                alt="loading"
                width={200}
                height={200}
                unoptimized
                className="rounded-full"
              />
            </div>
          ) : (
            <div className="flex flex-wrap justify-around gap-10 p-5 w-full">
              {cardData.map((card) => {
                return (
                  <Image
                    key={card.id}
                    src={card.images.large}
                    alt={card.name}
                    width={300}
                    height={412.5}
                    className="rounded-md select-none pointer-events-none"
                  />
                );
              })}
            </div>
          ))}
      </main>
    </>
  );
}
