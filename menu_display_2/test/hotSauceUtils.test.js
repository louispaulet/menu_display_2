import { describe, it, expect } from 'vitest';
import { sortSauces } from '../src/lib/hotSauceUtils';

describe('hotSauceUtils', () => {
  const mockSauces = [
    { name: 'B', price: 10, age_months: 12, scoville_units: 5000, hotness_level: 3, batch_size: 100 },
    { name: 'A', price: 20, age_months: 6, scoville_units: 10000, hotness_level: 5, batch_size: 50 },
    { name: 'C', price: 15, age_months: 24, scoville_units: 1000, hotness_level: 1, batch_size: 200 },
  ];

  describe('sortSauces', () => {
    it('sorts by name ascending by default', () => {
      const sorted = sortSauces(mockSauces, 'name-asc');
      expect(sorted[0].name).toBe('A');
      expect(sorted[1].name).toBe('B');
      expect(sorted[2].name).toBe('C');
    });

    it('sorts by price ascending', () => {
      const sorted = sortSauces(mockSauces, 'price-asc');
      expect(sorted[0].price).toBe(10);
      expect(sorted[1].price).toBe(15);
      expect(sorted[2].price).toBe(20);
    });

    it('sorts by price descending', () => {
      const sorted = sortSauces(mockSauces, 'price-desc');
      expect(sorted[0].price).toBe(20);
      expect(sorted[1].price).toBe(15);
      expect(sorted[2].price).toBe(10);
    });

    it('sorts by age descending', () => {
      const sorted = sortSauces(mockSauces, 'age-desc');
      expect(sorted[0].age_months).toBe(24);
      expect(sorted[1].age_months).toBe(12);
      expect(sorted[2].age_months).toBe(6);
    });

    it('sorts by scoville descending', () => {
      const sorted = sortSauces(mockSauces, 'scoville-desc');
      expect(sorted[0].scoville_units).toBe(10000);
      expect(sorted[1].scoville_units).toBe(5000);
      expect(sorted[2].scoville_units).toBe(1000);
    });

    it('sorts by hotness descending', () => {
      const sorted = sortSauces(mockSauces, 'hotness-desc');
      expect(sorted[0].hotness_level).toBe(5);
      expect(sorted[1].hotness_level).toBe(3);
      expect(sorted[2].hotness_level).toBe(1);
    });

    it('sorts by batch size ascending', () => {
      const sorted = sortSauces(mockSauces, 'batch-asc');
      expect(sorted[0].batch_size).toBe(50);
      expect(sorted[1].batch_size).toBe(100);
      expect(sorted[2].batch_size).toBe(200);
    });
  });
});
