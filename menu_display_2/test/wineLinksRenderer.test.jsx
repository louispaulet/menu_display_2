import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { linkifyWineText, linkifyWineMarkdown } from '../src/lib/wineLinksRenderer';

describe('wineLinksRenderer', () => {
  const mockContext = {
    pattern: /Krug/g,
    routeByName: new Map([['Krug', '/wine/1']])
  };

  describe('linkifyWineText', () => {
    it('returns original text if no pattern or context', () => {
      expect(linkifyWineText('Hello', null)).toBe('Hello');
    });

    it('wraps matched wine names in Links', () => {
      const result = linkifyWineText('A glass of Krug please.', mockContext);
      render(<MemoryRouter>{result}</MemoryRouter>);
      
      const link = screen.getByRole('link', { name: 'Krug' });
      expect(link).toHaveAttribute('href', '/wine/1');
    });
    
    it('handles text with no matches', () => {
      expect(linkifyWineText('No wine here.', mockContext)).toEqual(['No wine here.']);
    });

    it('handles matched text that is not in routeByName', () => {
      const result = linkifyWineText('A glass of Krug please.', {
        pattern: /Krug/g,
        routeByName: new Map()
      });
      expect(result).toEqual(['A glass of ', 'Krug', ' please.']);
    });
  });

  describe('linkifyWineMarkdown', () => {
    it('replaces wine names with markdown links', () => {
      const result = linkifyWineMarkdown('Try some Krug.', mockContext);
      expect(result).toBe('Try some [Krug](/wine/1).');
    });
    
    it('returns original markdown if no context', () => {
      expect(linkifyWineMarkdown('Try some Krug.', null)).toBe('Try some Krug.');
    });
  });
});
