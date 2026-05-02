import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Footer from '../src/components/Footer';

describe('Footer', () => {
  it('renders footer text and links', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    
    expect(screen.getByText(/Exquisite Menus V3/)).toBeInTheDocument();
    expect(screen.getByText(/Built with React/)).toBeInTheDocument();
  });
});
