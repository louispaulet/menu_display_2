import { describe, it, expect } from 'vitest';
import * as wineFacets from '../src/lib/wineFacets';

describe('wineFacets', () => {
  describe('classifyWineStyle', () => {
    it('classifies Champagne correctly', () => {
      expect(wineFacets.classifyWineStyle({ name: 'Krug Grande Cuvee' }).key).toBe('champagne');
      expect(wineFacets.classifyWineStyle({ name: 'Dom Perignon 2012' }).key).toBe('champagne');
    });

    it('classifies White wine correctly', () => {
      expect(wineFacets.classifyWineStyle({ name: 'Chardonnay Estate' }).key).toBe('white');
      expect(wineFacets.classifyWineStyle({ name: 'Sauvignon Blanc' }).key).toBe('white');
    });

    it('classifies Red wine correctly', () => {
      expect(wineFacets.classifyWineStyle({ name: 'Cabernet Sauvignon' }).key).toBe('red');
      expect(wineFacets.classifyWineStyle({ name: 'Pinot Noir Reserve' }).key).toBe('red');
    });

    it('falls back to other for unknown styles', () => {
      expect(wineFacets.classifyWineStyle({ name: 'Unknown Beverage' }).key).toBe('other');
    });
  });

  describe('classifyWineCountry', () => {
    it('classifies countries correctly', () => {
      expect(wineFacets.classifyWineCountry({ name: 'Bordeaux Red' }).key).toBe('france');
      expect(wineFacets.classifyWineCountry({ name: 'Chianti Classico' }).key).toBe('italy');
      expect(wineFacets.classifyWineCountry({ name: 'Napa Valley Cab' }).key).toBe('united-states');
      expect(wineFacets.classifyWineCountry({ name: 'Mars Grown Grapes' }).key).toBe('outer-space');
    });
  });

  describe('getWinePriceBand', () => {
    it('returns correct bands based on price', () => {
      expect(wineFacets.getWinePriceBand({ base_price_eur_750ml: 30 }).key).toBe('under-50');
      expect(wineFacets.getWinePriceBand({ base_price_eur_750ml: 100 }).key).toBe('50-149');
      expect(wineFacets.getWinePriceBand({ base_price_eur_750ml: 300 }).key).toBe('150-399');
      expect(wineFacets.getWinePriceBand({ base_price_eur_750ml: 500 }).key).toBe('400-plus');
    });
  });

  describe('getWineRarityScore', () => {
    it('calculates a score based on various factors', () => {
      const score = wineFacets.getWineRarityScore({ 
        base_price_eur_750ml: 100, 
        confidence: 'high',
        michelin_markup_multiple_used: 3
      });
      expect(score).toBeGreaterThan(0);
    });
  });

  describe('rarityTier', () => {
    it('returns tiers based on score', () => {
      expect(wineFacets.rarityTier(110).key).toBe('legendary');
      expect(wineFacets.rarityTier(90).key).toBe('rare');
      expect(wineFacets.rarityTier(70).key).toBe('notable');
      expect(wineFacets.rarityTier(50).key).toBe('accessible');
    });
  });
});
