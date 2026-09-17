import { useState } from "react";

export default function useSpecialtySelection() {
  const [hoveredSpecialty, setHoveredSpecialty] = useState<number | null>(null);
  const [selectedSpecialty, setSelectedSpecialty] = useState<number | null>(null);
  const [pressedSpecialty, setPressedSpecialty] = useState<number | null>(null);

  const activateSpecialty = (index: number) => {
    setHoveredSpecialty(null);
    setSelectedSpecialty((current) => (current === index ? null : index));
    setPressedSpecialty(index);
  };

  const clearSpecialty = () => {
    setHoveredSpecialty(null);
    setSelectedSpecialty(null);
    setPressedSpecialty(null);
  };

  return {
    activeSpecialty: selectedSpecialty ?? hoveredSpecialty,
    activateSpecialty,
    clearSpecialty,
    pressedSpecialty,
    selectedSpecialty,
    setHoveredSpecialty,
    setPressedSpecialty,
  };
}
