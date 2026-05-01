import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import V1 from '../src/pages/V1';

describe('V1', () => {
  it('renders V1 page content', () => {
    render(<V1 />);
    expect(screen.getByText('Exquisite Menus V1')).toBeInTheDocument();
    expect(screen.getByText('Visit Exquisite Menus V1')).toBeInTheDocument();
  });
});
