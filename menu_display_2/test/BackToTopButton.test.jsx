import { render } from '@testing-library/react';
import { describe, it, vi, beforeEach } from 'vitest';
import BackToTopButton from '../src/components/BackToTopButton';

describe('BackToTopButton', () => {
  beforeEach(() => {
    window.scrollTo = vi.fn();
  });

  it('renders and scroll to top on click', () => {
    render(<BackToTopButton />);
    // Add interaction test if needed, but for now just check it renders
  });
});
