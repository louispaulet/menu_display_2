import { describe, it, expect, vi } from 'vitest';
import { scrollToZone } from '../src/lib/homepageUtils';

describe('homepageUtils', () => {
  describe('scrollToZone', () => {
    it('calls window.scrollTo if element exists', () => {
      const mockElement = {
        getBoundingClientRect: () => ({ top: 100 }),
      };
      document.getElementById = vi.fn().mockReturnValue(mockElement);
      window.scrollTo = vi.fn();
      
      scrollToZone('test-zone');
      
      expect(window.scrollTo).toHaveBeenCalled();
    });

    it('does nothing if element does not exist', () => {
      document.getElementById = vi.fn().mockReturnValue(null);
      window.scrollTo = vi.fn();
      
      scrollToZone('missing-zone');
      
      expect(window.scrollTo).not.toHaveBeenCalled();
    });
  });
});
