import { useState } from "react";
import type { Utility } from "../../data/Utilities";
import { Container } from "../layout/Container";

/**
 * Thin top utility strip.
 * JD mapping: promo line and service shortcuts shown above main navigation.
 */

export type UtilityBarProps = {
  utilities: Utility[];
};

export function UtilityBar(props: UtilityBarProps) {
  const { utilities } = props;

  const [currentIndex, setCurrentIndex] = useState(0);
  if (utilities.length === 0) return null;
  const currentUtility = utilities[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? utilities.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === utilities.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="bg-white py-2 text-black-80">
      <Container>
        <p className="text-xs font-medium">{currentUtility.pText}</p>
        <a href={currentUtility.href} className="underline">
          {currentUtility.aText}
        </a>
      </Container>
    </div>
  );
}
