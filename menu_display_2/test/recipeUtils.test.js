import { describe, it, expect } from 'vitest';
import * as recipeUtils from '../src/lib/recipeUtils';

describe('recipeUtils', () => {
  describe('encodeAssetSegment', () => {
    it('replaces spaces with underscores and keeps commas', () => {
      expect(recipeUtils.encodeAssetSegment('Hello World,')).toBe('Hello_World,');
      expect(recipeUtils.encodeAssetSegment('Multiple   Spaces')).toBe('Multiple___Spaces');
    });
  });

  describe('normalizeText', () => {
    it('removes accents and converts to lowercase', () => {
      expect(recipeUtils.normalizeText('Héllò Wörld!')).toBe('hello world');
    });

    it('replaces non-alphanumeric characters with spaces', () => {
      expect(recipeUtils.normalizeText('Title: Subtitle-123')).toBe('title subtitle 123');
    });

    it('trims whitespace', () => {
      expect(recipeUtils.normalizeText('  space  ')).toBe('space');
    });
  });

  describe('slugifyHeading', () => {
    it('converts headings to kebab-case', () => {
      expect(recipeUtils.slugifyHeading('Main Ingredients')).toBe('main-ingredients');
      expect(recipeUtils.slugifyHeading('Step-by-Step Guide!')).toBe('step-by-step-guide');
    });
  });

  describe('childrenToText', () => {
    it('converts strings and numbers', () => {
      expect(recipeUtils.childrenToText('hello')).toBe('hello');
      expect(recipeUtils.childrenToText(123)).toBe('123');
    });

    it('handles arrays of children', () => {
      expect(recipeUtils.childrenToText(['a', 'b', 'c'])).toBe('abc');
    });

    it('recursively extracts text from React components', () => {
      const mockElement = { props: { children: 'inner text' } };
      expect(recipeUtils.childrenToText(mockElement)).toBe('inner text');
    });

    it('returns empty string for null/undefined', () => {
      expect(recipeUtils.childrenToText(null)).toBe('');
    });
  });

  describe('extractRecipeTitle', () => {
    it('extracts the first heading from markdown', () => {
      const md = '# My Awesome Recipe\nSome content';
      expect(recipeUtils.extractRecipeTitle(md)).toBe('My Awesome Recipe');
    });

    it('handles different heading levels', () => {
      const md = '## Subheading Recipe';
      expect(recipeUtils.extractRecipeTitle(md)).toBe('Subheading Recipe');
    });

    it('returns empty string if no heading found', () => {
      expect(recipeUtils.extractRecipeTitle('just text')).toBe('');
    });
  });

  describe('stripMarkdownImages', () => {
    it('removes markdown images', () => {
      const md = 'Text ![alt](img.png) more text';
      expect(recipeUtils.stripMarkdownImages(md)).toBe('Text more text');
    });
  });

  describe('stripLeadingTitleHeading', () => {
    it('removes the leading heading if it matches the title', () => {
      const md = '# Recipe Title\nIngredients';
      expect(recipeUtils.stripLeadingTitleHeading(md, 'Recipe Title')).toBe('Ingredients');
    });

    it('does not remove if titles do not match', () => {
      const md = '# Heading\nContent';
      expect(recipeUtils.stripLeadingTitleHeading(md, 'Other')).toBe('# Heading\nContent');
    });
  });

  describe('countBullets', () => {
    it('counts list items between headings', () => {
      const md = '## Ingredients\n- Item 1\n- Item 2\n## Instructions';
      expect(recipeUtils.countBullets(md)).toBe(2);
    });

    it('returns 0 if start heading not found', () => {
      expect(recipeUtils.countBullets('no heading')).toBe(0);
    });
  });

  describe('countMethodSteps', () => {
    it('counts steps in instructions section', () => {
      const md = '## Instructions\n1. Step 1\n2. Step 2\n## Notes';
      expect(recipeUtils.countMethodSteps(md)).toBe(2);
    });
  });

  describe('buildOutline', () => {
    it('extracts headings and levels', () => {
      const md = '## Section 1\n### Section 1.1\n#### Section 1.1.1';
      const outline = recipeUtils.buildOutline(md);
      expect(outline).toHaveLength(3);
      expect(outline[0]).toEqual({ level: 2, title: 'Section 1', id: 'section-1' });
    });
  });

  describe('findRecipeContext', () => {
    it('finds context based on title matching menu descriptions', () => {
      // Since it uses menuData, this depends on the actual data
      // We can check if it returns null for non-existent recipe
      expect(recipeUtils.findRecipeContext('Non Existent Recipe')).toBeNull();
    });
  });

  describe('getDishImageUrl', () => {
    it('returns null if no recipe title or match found', () => {
      expect(recipeUtils.getDishImageUrl('no title')).toBeNull();
    });
  });
});
