import { description, title } from "@/lib/metadata";
import { generateMetadata } from "@/lib/farcaster-embed";

export { generateMetadata };
import ColorMemoryFlip from "@/components/color-memory-flip";

export default function Home() {
  // NEVER write anything here, only use this page to import components
  return (
    <main className="flex flex-col gap-3 place-items-center place-content-center px-4 grow">
      <ColorMemoryFlip />
    </main>
  );
}
