import { describe, it, expect } from 'vitest';
import { formatBytes, getClientFileError } from '../src/lib/menuStudioUtils';

describe('menuStudioUtils', () => {
  describe('formatBytes', () => {
    it('formats bytes to KB', () => {
      expect(formatBytes(1024)).toBe('1 KB');
      expect(formatBytes(500000)).toBe('488 KB');
    });

    it('formats bytes to MB', () => {
      expect(formatBytes(1024 * 1024)).toBe('1.0 MB');
      expect(formatBytes(2.5 * 1024 * 1024)).toBe('2.5 MB');
    });

    it('returns 0 KB for falsy input', () => {
      expect(formatBytes(0)).toBe('0 KB');
      expect(formatBytes(null)).toBe('0 KB');
    });
  });

  describe('getClientFileError', () => {
    it('returns error for missing file', () => {
      expect(getClientFileError(null)).toBe('Choose a menu image first.');
    });

    it('returns error for invalid type', () => {
      const file = { type: 'text/plain', size: 100 };
      expect(getClientFileError(file)).toBe('Upload a JPEG, PNG, or WebP menu image.');
    });

    it('returns error for oversized file', () => {
      const file = { type: 'image/jpeg', size: 11 * 1024 * 1024 };
      expect(getClientFileError(file)).toBe('Keep the menu image under 10MB.');
    });

    it('returns empty string for valid file', () => {
      const file = { type: 'image/jpeg', size: 1024 };
      expect(getClientFileError(file)).toBe('');
    });
  });
});
