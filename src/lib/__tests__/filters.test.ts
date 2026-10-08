import { describe, expect, it } from "vitest";
import {
  applyPriceRange,
  normalizeFilters,
  parsePlpFiltersFromSearchParams,
  toggleFilterValue,
} from "../filters";

describe("normalizeFilters", () => {
  it("applique les defauts", () => {
    expect(normalizeFilters({})).toMatchObject({
      q: "",
      gender: [],
      price_range: "all",
      sort: "relevance",
      page: 1,
      per_page: 12,
    });
  });

  it("rejette tri et prix inconnus", () => {
    expect(
      normalizeFilters({ sort: "nope" as never, price_range: "nope" as never }),
    ).toMatchObject({ sort: "relevance", price_range: "all" });
  });
});

describe("parsePlpFiltersFromSearchParams", () => {
  it("lit les cles FCFA", () => {
    const parsed = parsePlpFiltersFromSearchParams(
      new URLSearchParams("price=30-120k&sort=price-low-high&page=2"),
    );
    expect(parsed.price_range).toBe("30-120k");
    expect(parsed.sort).toBe("price-low-high");
    expect(parsed.page).toBe(2);
  });

  it("convertit les anciennes cles $ (compat liens partages)", () => {
    expect(
      parsePlpFiltersFromSearchParams(new URLSearchParams("price=under-50"))
        .price_range,
    ).toBe("under-30k");
    expect(
      parsePlpFiltersFromSearchParams(new URLSearchParams("price=500-plus"))
        .price_range,
    ).toBe("300k-plus");
  });
});

describe("toggleFilterValue", () => {
  it("ajoute puis retire (insensible casse/espaces)", () => {
    expect(toggleFilterValue([], " Nike ")).toEqual(["nike"]);
    expect(toggleFilterValue(["nike"], "NIKE")).toEqual([]);
  });
});

describe("applyPriceRange (seuils FCFA)", () => {
  it("repartit le catalogue 18k-126k utilement", () => {
    expect(applyPriceRange(18150, "under-30k")).toBe(true);
    expect(applyPriceRange(30000, "under-30k")).toBe(false);
    expect(applyPriceRange(30000, "30-120k")).toBe(true);
    expect(applyPriceRange(120000, "30-120k")).toBe(true);
    expect(applyPriceRange(120001, "120-300k")).toBe(true);
    expect(applyPriceRange(300001, "120-300k")).toBe(false);
    expect(applyPriceRange(300001, "300k-plus")).toBe(true);
    expect(applyPriceRange(1, "all")).toBe(true);
  });
});
