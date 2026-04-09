"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import MenuSection from "@/components/MenuSection";
import Statement from "@/components/Statement";
import Gallery from "@/components/Gallery";
import InfoSection from "@/components/InfoSection";
import AccessSection from "@/components/AccessSection";
import ReservationCTA from "@/components/ReservationCTA";
import Footer from "@/components/Footer";
import ReservationModal from "@/components/ReservationModal";
import type { MenuItem } from "@/lib/types";

type Props = {
  menuItems: MenuItem[];
};

export default function HomeClient({ menuItems }: Props) {
  const [reserveOpen, setReserveOpen] = useState(false);
  const openReserve = () => setReserveOpen(true);

  return (
    <>
      <Header onReserve={openReserve} />
      <main>
        <Hero onReserve={openReserve} />
        <Marquee />
        <About />
        <MenuSection menuItems={menuItems} />
        <Statement />
        <Gallery />
        <InfoSection />
        <AccessSection />
        <ReservationCTA onReserve={openReserve} />
      </main>
      <Footer onReserve={openReserve} />
      <ReservationModal isOpen={reserveOpen} onClose={() => setReserveOpen(false)} />
    </>
  );
}
