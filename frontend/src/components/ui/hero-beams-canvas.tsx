import { Beams } from "@/components/ui/ethereal-beams";

export default function HeroBeamsCanvas() {
  return (
    <Beams
      beamWidth={2.5}
      beamHeight={18}
      beamNumber={15}
      lightColor="#ffffff"
      speed={2.5}
      noiseIntensity={2}
      scale={0.15}
      rotation={43}
    />
  );
}
