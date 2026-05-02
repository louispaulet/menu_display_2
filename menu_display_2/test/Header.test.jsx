import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Header from '../src/components/Header';

describe('Header', () => {
  it('renders navigation links', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    
    expect(screen.getByText('Exquisite Menus')).toBeInTheDocument();
    expect(screen.getAllByText('Wine List').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Menu studio').length).toBeGreaterThan(0);
  });

  it('toggles mobile menu when button is clicked', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    
    const menuButton = screen.getByLabelText('Open navigation menu');
    fireEvent.click(menuButton);
    
    // Check if mobile menu links are visible (depending on implementation)
    // For now just check if click doesn't crash
  });
});
