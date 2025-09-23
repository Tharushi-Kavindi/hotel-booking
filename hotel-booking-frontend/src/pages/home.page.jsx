import Hero from "../components/Hero";

import HotelListings from "../components/HotelListings";
import { Button } from "@/components/ui/button";

function HomePage() {
  return (
    <main>
      <div className="relative min-h-[85vh]">
        <Hero />
      </div>
      {/* <Button>GET HOTELS</Button> */}
      <HotelListings />
    </main>
  );
}

export default HomePage;
