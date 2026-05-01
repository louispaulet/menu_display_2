import { render } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import ScrollToTop from '../src/components/scrollToTop';

describe('ScrollToTop', () => {
  beforeEach(() => {
    window.scrollTo = vi.fn();
  });

  it('calls window.scrollTo(0, 0) on mount', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <ScrollToTop />
      </MemoryRouter>
    );
    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
  });
});
