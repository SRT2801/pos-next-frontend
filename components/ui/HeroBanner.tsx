"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"

const slides = [
    {
        tag: "Nueva Colección",
        title: "Moda Natural & Elegante",
        description: "Descubre prendas con estilo minimalista y materiales naturales para el día a día.",
        image: "/hero-1.jpg",
    },
    {
        tag: "Tendencia",
        title: "Tenis de Alto Rendimiento",
        description: "Comodidad y estilo se unen en nuestra colección de calzado deportivo.",
        image: "/hero-2.jpg",
    },
    {
        tag: "Accesorios",
        title: "Lentes con Estilo Retro",
        description: "Completa tu look con los lentes más exclusivos de la temporada.",
        image: "/hero-3.jpg",
    },
]

export default function HeroBanner() {
    const [current, setCurrent] = useState(0)

    const next = useCallback(() => {
        setCurrent((prev) => (prev + 1) % slides.length)
    }, [])

    const prev = useCallback(() => {
        setCurrent((prev) => (prev - 1 + slides.length) % slides.length)
    }, [])

    useEffect(() => {
        const timer = setInterval(next, 5000)
        return () => clearInterval(timer)
    }, [next])

    const slide = slides[current]

    return (
        <section className="relative h-40 sm:h-52 md:h-64 rounded-xl sm:rounded-2xl overflow-hidden shadow-xl group cursor-pointer mb-6 sm:mb-8">
            <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
            />
            <div className="absolute inset-0 bg-linear-to-r from-black/60 to-transparent flex items-center p-4 sm:p-8 md:p-12">
                <div className="max-w-md">
                    <span className="bg-emerald-500 text-white px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase mb-2 sm:mb-4 inline-block">
                        {slide.tag}
                    </span>
                    <h1 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-white mb-1 sm:mb-4">{slide.title}</h1>
                    <p className="text-slate-200 text-xs sm:text-sm md:text-base mb-2 sm:mb-6 line-clamp-2">{slide.description}</p>
                </div>
            </div>

            {/* Navigation arrows */}
            <button
                onClick={prev}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
            >
                <span className="material-icons-round text-lg sm:text-2xl">chevron_left</span>
            </button>
            <button
                onClick={next}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
            >
                <span className="material-icons-round text-lg sm:text-2xl">chevron_right</span>
            </button>

            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {slides.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrent(i)}
                        className={`w-2 h-2 rounded-full transition-all cursor-pointer ${i === current ? "bg-white w-6" : "bg-white/50"
                            }`}
                    />
                ))}
            </div>
        </section>
    )
}
