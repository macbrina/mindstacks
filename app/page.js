import Image from "next/image";
import ClientOnly from "@/app/_components/ClientOnly";
import Landing from "@/app/_components/Landing/Landing";

export default function Home() {
  return (
    <ClientOnly>
      <Landing />
    </ClientOnly>
  );
}
