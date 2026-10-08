import { describe, expect, it } from "vitest";
import { getPlpBySlug } from "../catalogApi";

describe("getPlpBySlug (contrat catalogue mock)", () => {
  it("filtre les marques par slug", () => {
    const nike = getPlpBySlug("nike", { per_page: 50 });
    expect(nike.items.length).toBeGreaterThan(0);
    expect(
      nike.items.every((item) => item.brand.toLowerCase() === "nike"),
    ).toBe(true);
  });

  it("expose les genres normalises women/kids (non-regression P0-3)", () => {
    const all = getPlpBySlug("all", { per_page: 50 });
    const genders = all.facets.find((facet) => facet.key === "gender");
    const values = (genders?.values ?? []).map((value) => value.value);
    expect(values).toContain("women");
    expect(values).toContain("kids");
    expect(values).not.toContain("femme");
    expect(values).not.toContain("enfant");
  });

  it("le filtre prix FCFA repartit le catalogue", () => {
    const cheap = getPlpBySlug("all", { price_range: "under-30k", per_page: 50 });
    const mid = getPlpBySlug("all", { price_range: "30-120k", per_page: 50 });
    expect(cheap.pagination.total_items).toBeGreaterThan(0);
    expect(mid.pagination.total_items).toBeGreaterThan(0);
    expect(
      cheap.items.every((item) => (item.sale_price ?? item.price) < 30000),
    ).toBe(true);
  });

  it("pagine avec metadonnees coherentes", () => {
    const page1 = getPlpBySlug("all", { page: 1, per_page: 5 });
    expect(page1.items).toHaveLength(5);
    expect(page1.pagination.has_next).toBe(true);
    expect(page1.pagination.total_pages).toBe(
      Math.ceil(page1.pagination.total_items / 5),
    );
  });

  it("recherche textuelle sur nom et marque", () => {
    const results = getPlpBySlug("search-results", { q: "nike", per_page: 50 });
    expect(results.pagination.total_items).toBeGreaterThan(0);
  });
});
