import { describe, it, expect } from 'vitest';
import { findZoneByRestaurantName, getZoneAccentForRestaurant, CONTENT_ZONES } from '../src/lib/siteThemes';

describe('siteThemes', () => {
  describe('findZoneByRestaurantName', () => {
    it('finds a zone by restaurant name', () => {
      const result = findZoneByRestaurantName("L'Etoile d'Or");
      expect(result).not.toBeNull();
      expect(result.id).toBe('french');
    });

    it('returns null if restaurant name not found', () => {
      expect(findZoneByRestaurantName('Unknown Restaurant')).toBeNull();
    });
  });

  describe('getZoneAccentForRestaurant', () => {
    it('returns specific accent for known restaurant', () => {
      const accent = getZoneAccentForRestaurant('Sakura No Hana');
      expect(accent.text).toBe('text-slate-700');
    });

    it('returns default accent for unknown restaurant', () => {
      const accent = getZoneAccentForRestaurant('Unknown');
      expect(accent.text).toBe('text-stone-700');
    });
  });

  describe('CONTENT_ZONES', () => {
    it('has required structure for each zone', () => {
      CONTENT_ZONES.forEach(zone => {
        expect(zone).toHaveProperty('id');
        expect(zone).toHaveProperty('title');
        expect(zone).toHaveProperty('accent');
        expect(zone.accent).toHaveProperty('text');
      });
    });
  });
});
