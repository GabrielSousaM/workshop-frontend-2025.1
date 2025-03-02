"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Card from "../types/Card";

export default function CardList() {
  const [cardData, setCardData] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setIsClient(true);

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.pokemontcg.io/v2/cards?page=${page}&pageSize=20`
        );
        setCardData(response.data.data);
      } catch (error) {
        console.error("Erro ao buscar os cards:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page]);

  const nextPage = () => {
    setPage(page + 1);
    setLoading(true)
  };

  const previousPage = () => {
    setPage(page - 1);
    setLoading(true)
  };

  if (!isClient) return null;

  return (
    <>
      {loading ? (
        <div className="flex flex-wrap min-h-screen justify-center items-center">
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
        <ul className="flex flex-wrap min-h-screen justify-around gap-5 mt-5 p-20">
          {cardData.map((card) => (
            <li
              key={card.id}
              className="flex flex-col gap-2.5 p-2 items-center bg-[#606060] w-[320px] min-h-[430px] rounded-2xl shadow"
            >
              <Image
                src={card.images.large}
                alt={card.name}
                width={300}
                height={412.5}
                className="rounded-md"
              />
              <p className="w-20 text-center p-0.5 bg-[#404040] rounded-sm font-extrabold text-white">
                Nome
              </p>
              <p className="text-md text-white">{card.name}</p>
              {card.types && (
                <p className="w-20 text-center p-0.5 bg-[#404040] rounded-sm font-extrabold text-white">
                  Tipo
                </p>
              )}
              <p className="text-md text-white">
                {card.types && card.types.join(" ")}
              </p>
            </li>
          ))}
        </ul>
      )}
      <div
        className={`fixed flex pointer-events-none ${
          page == 1 ? "justify-end" : "justify-between"
        } p-5 w-full min-h-screen top-0 left-0`}
      >
        {page > 1 && (
          <button
            onClick={previousPage}
            className="bg-blue-500 text-white pointer-events-auto h-10 px-4 py-2 rounded cursor-pointer"
          >
            Anterior
          </button>
        )}
        {page < 935 && (
          <button
            onClick={nextPage}
            className="bg-blue-500 text-white pointer-events-auto h-10 px-4 py-2 rounded cursor-pointer"
          >
            Próxima
          </button>
        )}
      </div>
    </>
  );
}
