import { describe, it, expect } from 'vitest';
import * as wineListUtils from '../src/lib/wineListUtils';

describe('wineListUtils', () => {
  describe('formatPrice', () => {
    it('formats numbers as Euro currency', () => {
      // Note: Intl behavior can vary slightly by environment, but should be consistent in Vitest
      const result = wineListUtils.formatPrice(100);
      expect(result).toMatch(/€100/);
    });

    it('returns a dash for non-numbers', () => {
      expect(wineListUtils.formatPrice(null)).toBe('—');
      expect(wineListUtils.formatPrice('100')).toBe('—');
    });
  });

  describe('medianPrice', () => {
    it('calculates median for odd number of wines', () => {
      const wines = [
        { wine: { base_price_eur_750ml: 10 } },
        { wine: { base_price_eur_750ml: 20 } },
        { wine: { base_price_eur_750ml: 30 } },
      ];
      expect(wineListUtils.medianPrice(wines)).toBe(20);
    });

    it('calculates median for even number of wines', () => {
      const wines = [
        { wine: { base_price_eur_750ml: 10 } },
        { wine: { base_price_eur_750ml: 20 } },
        { wine: { base_price_eur_750ml: 30 } },
        { wine: { base_price_eur_750ml: 40 } },
      ];
      expect(wineListUtils.medianPrice(wines)).toBe(25);
    });

    it('returns null for empty array', () => {
      expect(wineListUtils.medianPrice([])).toBeNull();
    });
  });

  describe('tastingNoteFor', () => {
    it('returns provided tasting note if available', () => {
      const wine = { tasting_note: 'Delicious' };
      expect(wineListUtils.tastingNoteFor(wine)).toBe('Delicious');
    });

    it('returns fictional note for fictional wines', () => {
      const wine = { is_fictional_or_unpriceable: true };
      expect(wineListUtils.tastingNoteFor(wine)).toContain('Fantasized profile');
    });

    it('returns default notes based on price bands', () => {
      expect(wineListUtils.tastingNoteFor({ base_price_eur_750ml: 30 })).toContain('Fresh citrus');
      expect(wineListUtils.tastingNoteFor({ base_price_eur_750ml: 100 })).toContain('Layered orchard');
      expect(wineListUtils.tastingNoteFor({ base_price_eur_750ml: 300 })).toContain('Silky texture');
      expect(wineListUtils.tastingNoteFor({ base_price_eur_750ml: 600 })).toContain('Opulent');
    });
  });

  describe('cardToneForStyle', () => {
    it('returns correct classes for styles', () => {
      expect(wineListUtils.cardToneForStyle('red')).toContain('text-clay');
      expect(wineListUtils.cardToneForStyle('white')).toContain('text-amber-900');
      expect(wineListUtils.cardToneForStyle('unknown')).toContain('text-olive');
    });
  });

  describe('buildGroupedSections', () => {
    const mockWines = [
      { 
        wine: { id: 1, base_price_eur_750ml: 100 }, 
        country: { key: 'france', label: 'France' },
        style: { key: 'red', label: 'Red' },
        priceBand: { key: '50-149', label: 'Mid' },
        popularityScore: 10,
        rarityScore: 5
      },
      { 
        wine: { id: 2, base_price_eur_750ml: 200 }, 
        country: { key: 'italy', label: 'Italy' },
        style: { key: 'white', label: 'White' },
        priceBand: { key: '150-399', label: 'High' },
        popularityScore: 5,
        rarityScore: 10
      }
    ];

    it('groups by countries', () => {
      const sections = wineListUtils.buildGroupedSections(mockWines, 'countries');
      expect(sections).toHaveLength(2);
      expect(sections.map(s => s.key)).toContain('france');
      expect(sections.map(s => s.key)).toContain('italy');
    });

    it('groups by styles', () => {
      const sections = wineListUtils.buildGroupedSections(mockWines, 'styles');
      expect(sections).toHaveLength(2);
      expect(sections[0].key).toBe('red');
      expect(sections[1].key).toBe('white');
    });

    it('groups by prices', () => {
      const sections = wineListUtils.buildGroupedSections(mockWines, 'prices');
      expect(sections).toHaveLength(2);
    });

    it('groups by popularity', () => {
      const sections = wineListUtils.buildGroupedSections(mockWines, 'popularity');
      expect(sections).toHaveLength(4); // All 4 buckets are returned
      expect(sections[0].items).toHaveLength(1);
    });

    it('returns a single section for "all" mode', () => {
      const sections = wineListUtils.buildGroupedSections(mockWines, 'all');
      expect(sections).toHaveLength(1);
      expect(sections[0].key).toBe('all');
    });
  });
});
