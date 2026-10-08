import { describe, expect, it } from "vitest";
import {
  applyPromo,
  discountInfo,
  effectivePrice,
  formatPrice,
} from "../currency";
import type { Promotion } from "../../types";

const ACTIVE_PCT: Promotion = {
  id: "promo-test",
  code: "TEST20",
  name: "Test",
  description: "Test",
  discount_type: "percentage",
  discount_value: 20,
  starts_at: "2000-01-01T00:00:00.000Z",
  ends_at: "2100-01-01T00:00:00.000Z",
  is_active: true,
};

describe("formatPrice", () => {
  it("formate en FCFA avec groupement francophone", () => {
    expect(formatPrice(13400)).toMatch(/13[\s\u202f]400 FCFA/);
    expect(formatPrice(0)).toBe("0 FCFA");
  });

  it("arrondit les centimes", () => {
    expect(formatPrice(99.6)).toBe("100 FCFA");
  });
});

describe("effectivePrice / discountInfo", () => {
  it("priorise le prix solde", () => {
    expect(effectivePrice(10000, 8000)).toBe(8000);
    expect(effectivePrice(10000, null)).toBe(10000);
  });

  it("calcule remise et economies", () => {
    expect(discountInfo(10000, 8000)).toEqual({
      hasDiscount: true,
      discountPct: 20,
      savings: 2000,
    });
    expect(discountInfo(10000, null)).toEqual({
      hasDiscount: false,
      discountPct: 0,
      savings: 0,
    });
  });
});

describe("applyPromo", () => {
  it("rejette les codes inconnus", () => {
    const result = applyPromo(50000, null, "NOPE");
    expect(result.applied).toBe(false);
    expect(result.totalAfterDiscount).toBe(50000);
  });

  it("applique un pourcentage", () => {
    const result = applyPromo(50000, ACTIVE_PCT, "test20");
    expect(result.applied).toBe(true);
    expect(result.discountAmount).toBe(10000);
    expect(result.totalAfterDiscount).toBe(40000);
  });

  it("plafonne une remise fixe au sous-total", () => {
    const fixed: Promotion = { ...ACTIVE_PCT, discount_type: "fixed", discount_value: 999999 };
    const result = applyPromo(5000, fixed, "TEST20");
    expect(result.discountAmount).toBe(5000);
    expect(result.totalAfterDiscount).toBe(0);
  });

  it("rejette les promos inactives ou expirees", () => {
    const inactive: Promotion = { ...ACTIVE_PCT, is_active: false };
    expect(applyPromo(50000, inactive, "TEST20").applied).toBe(false);
    const expired: Promotion = { ...ACTIVE_PCT, ends_at: "2001-01-01T00:00:00.000Z" };
    expect(applyPromo(50000, expired, "TEST20").applied).toBe(false);
  });
});
