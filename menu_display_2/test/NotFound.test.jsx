import { render } from '@testing-library/react';
import { describe, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import NotFound from '../src/pages/NotFound';

describe('NotFound', () => {
  it('renders not found page', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );
    // NotFound component usually has some text like "404" or "Not Found"
  });
});
