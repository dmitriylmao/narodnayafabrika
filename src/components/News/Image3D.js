"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import styles from "@/app/news/[slug]/NewsDetailPage.module.css";

export default function Image3D({ src, alt, isLocalFallback }) {
    const wrapperRef = useRef(null);
    const imageRef = useRef(null);

    useEffect(() => {
        const card = wrapperRef.current;
        const image = imageRef.current;

        if (!card || !image) return;

        const handleMove = (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const rotateY = ((x / rect.width) - 0.5) * 10;
            const rotateX = ((y / rect.height) - 0.5) * -10;

            image.style.transform = `scale(1.07) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        };

        const reset = () => {
            image.style.transform = "scale(1)";
        };

        card.addEventListener("mousemove", handleMove);
        card.addEventListener("mouseleave", reset);

        return () => {
            card.removeEventListener("mousemove", handleMove);
            card.removeEventListener("mouseleave", reset);
        };
    }, []);

    return (
        <div className={styles.imageWrapper} ref={wrapperRef}>
            <Image
                src={src}
                alt={alt}
                fill
                sizes="100vw"
                className={styles.image}
                unoptimized={isLocalFallback}
                ref={imageRef}
            />
        </div>
    );
}
