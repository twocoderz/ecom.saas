import { describe, expect, it } from "vitest";
import {
  computeOrderTotals,
  validateInformation,
  validatePayment,
} from "../checkout";
import type { Promotion } from "../../types";

const BUNDLE: Promotion = {
  id: "promo-bundle-10",
  code: "BUNDLE10",
  name: "Pack",
  description: "Fixe",
  discount_type: "fixed",
  discount_value: 6050,
  starts_at: "2000-01-01T00:00:00.000Z",
  ends_at: "2100-01-01T00:00:00.000Z",
  is_active: true,
};

describe("computeOrderTotals", () => {
  it("sous-total - remise + port + TVA 18 %", () => {
    const totals = computeOrderTotals({
      subtotal: 100000,
      count: 2,
      promo: BUNDLE,
      promoCode: "BUNDLE10",
      shippingMethodId: "standard",
    });
    expect(totals.discount).toBe(6050);
    expect(totals.shippingFee).toBe(2500);
    expect(totals.taxes).toBe(Math.round(93950 * 0.18));
    expect(totals.total).toBe(93950 + 2500 + totals.taxes);
  });

  it("franco des 100 000 F en standard, retrait toujours gratuit", () => {
    const free = computeOrderTotals({
      subtotal: 200000,
      count: 3,
      promo: null,
      promoCode: "",
      shippingMethodId: "standard",
    });
    expect(free.shippingFree).toBe(true);
    expect(free.shippingFee).toBe(0);

    const pickup = computeOrderTotals({
      subtotal: 10000,
      count: 1,
      promo: null,
      promoCode: "",
      shippingMethodId: "retrait",
    });
    expect(pickup.shippingFee).toBe(0);
  });
});

describe("validateInformation", () => {
  it("signale tous les champs invalides", () => {
    const errors = validateInformation({
      firstName: "A",
      lastName: "",
      email: "nope",
      phone: "12",
      address: "",
      city: "",
      country: "",
    });
    expect(Object.keys(errors)).toHaveLength(7);
  });

  it("accepte un formulaire valide", () => {
    expect(
      validateInformation({
        firstName: "Awa",
        lastName: "Diallo",
        email: "awa@example.com",
        phone: "+221770000000",
        address: "12 rue 10",
        city: "Dakar",
        country: "Sénégal",
      }),
    ).toEqual({});
  });
});

describe("validatePayment", () => {
  const empty = { payerPhone: "", cardNumber: "", cardExpiry: "" };

  it("cash sans champ supplementaire", () => {
    expect(validatePayment("cash", empty)).toEqual({});
  });

  it("mobile money exige un numero", () => {
    expect(validatePayment("mixx", { ...empty, payerPhone: "12" })).toHaveProperty(
      "payerPhone",
    );
    expect(
      validatePayment("flooz", { ...empty, payerPhone: "+221770000000" }),
    ).toEqual({});
  });

  it("visa exige 16 chiffres + MM/AA", () => {
    expect(
      validatePayment("visa", {
        ...empty,
        cardNumber: "4242 4242 4242 4242",
        cardExpiry: "12/28",
      }),
    ).toEqual({});
    expect(
      validatePayment("visa", { ...empty, cardNumber: "123", cardExpiry: "99" }),
    ).toEqual({ cardNumber: expect.any(String), cardExpiry: expect.any(String) });
  });
});
