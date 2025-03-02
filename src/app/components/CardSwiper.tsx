"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import Card from "../types/Card";

export default function CardSwiper() {
  const [cardData, setCardData] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);

    const randomPage = Math.floor(Math.random() * 935) + 1;

    const fetchData = async () => {
      try {
        const response = await axios.get(`https://api.pokemontcg.io/v2/cards?page=${randomPage}&pageSize=20`);
        setCardData(response.data.data.sort(() => Math.random() - 0.5));
      } catch (error) {
        console.error("Erro ao buscar os cards:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (!hasMounted) return;

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
        <Swiper
          spaceBetween={50}
          slidesPerView={3}
          navigation={true}
          autoplay={{delay: 3000}}
          pagination={{ clickable: true }}
          loop={true}
          modules={[Pagination, Navigation, Autoplay]}
          className="w-[80%] mt-[50px]"
        >
          {cardData.slice(0, 10).map((card) => (
            <SwiperSlide key={card.id}>
              <Image
                src={card.images.large}
                alt={card.name}
                width={300}
                height={412.5}
                className="rounded-md select-none pointer-events-none"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </>
  );
}
