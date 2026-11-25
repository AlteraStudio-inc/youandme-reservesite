import SiteHeader from "@/components/site/SiteHeader";
import Hero from "@/components/site/Hero";
import Snapshot from "@/components/site/Snapshot";
import Route from "@/components/site/Route";
import Story from "@/components/site/Story";
import Visit from "@/components/site/Visit";
import SiteFooter from "@/components/site/SiteFooter";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <Snapshot />
        <Route />
        <Story />
        <Visit />
      </main>
      <SiteFooter />
    </>
  );
}
