'use client'

import React, { useState } from "react";
import { Carousel } from "react-bootstrap";
import { img_2 } from './../../../data/carrusel.json';
import "bootstrap/dist/css/bootstrap.min.css";
import styles from './../styles/Carrusel.css';

export default function BootstrapCarousel() {
    const { carrusel_img } = img_2;
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    return (
        <Carousel activeIndex={index} onSelect={handleSelect}>
          {carrusel_img.map((item) => (
            <Carousel.Item key={item.id} className={styles.itemP} interval={4000}>
              <img src={item.imageUrl} alt="slides" className="w-2/3 m-auto object-cover"/>
            </Carousel.Item>
          ))}
        </Carousel>
      );
    }

