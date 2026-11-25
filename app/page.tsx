import SiteHeader from "@/components/site/SiteHeader";
import HomeHero from "@/components/site/HomeHero";
import About from "@/components/site/About";
import News from "@/components/site/News";
import PopularMenu from "@/components/site/PopularMenu";
import InstaBand from "@/components/site/InstaBand";
import ShopInfo from "@/components/site/ShopInfo";
import ReserveBand from "@/components/site/ReserveBand";
import SiteFooter from "@/components/site/SiteFooter";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <HomeHero />
        <About />
        <News />
        <PopularMenu />
        <InstaBand />
        <ShopInfo />
        <ReserveBand />
      </main>
      <SiteFooter />
    </>
  );
}
