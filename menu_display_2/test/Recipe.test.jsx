import { render } from '@testing-library/react';
import { describe, it, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Recipe from '../src/components/Recipe';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useParams: () => ({ recipeName: 'test-recipe' }),
  };
});

describe('Recipe', () => {
  const mockMarkdown = '# Test Recipe\n## Ingredients\n- Item 1\n## Instructions\n1. Step 1';

  beforeEach(() => {
    globalThis.fetch = vi.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        text: () => Promise.resolve(mockMarkdown),
      })
    );
  });

  it('renders loading or error state', async () => {
    render(
      <MemoryRouter>
        <Recipe />
      </MemoryRouter>
    );
  });
});
