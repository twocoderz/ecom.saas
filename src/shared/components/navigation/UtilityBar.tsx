import { Container } from "../layout/Container";

/**
 * Thin top utility strip.
 * JD mapping: promo line and service shortcuts shown above main navigation.
 */

export type UtilityBarProps = {
  href: string;
  pText: string;
  aText: string;
};

export function UtilityBar(props: UtilityBarProps) {
  const { href, pText, aText } = props;

  return (
    <div className="bg-white py-2 text-black-80">
      <Container>
        <p className="text-xs font-medium">{pText}</p>
        <a href={href} className="underline">
          {aText}
        </a>
      </Container>
    </div>
  );
}
