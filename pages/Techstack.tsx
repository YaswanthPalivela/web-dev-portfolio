import { InfiniteMovingCards } from "@/components/infintemovingcards";
import { TechRowOne, TechRowTwo } from '@/constants/index'

export default function TechStack() {
  return (
    <section className="py-10 bg-black">
      <h2 className="text-center text-3xl md:text-4xl font-semibold mb-8">
        Tech Stack
      </h2>

      <div className="flex flex-col gap-3">
        
        {/* Row 1 */}
        <InfiniteMovingCards
          items={TechRowOne}
          direction="left"
          speed="fast"
        />

        {/* Row 2 */}
        <InfiniteMovingCards
          items={TechRowTwo}
          direction="right"
          speed="fast"
        />

      </div>
    </section>
  );
}