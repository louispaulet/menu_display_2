import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Homepage from '../src/pages/Homepage';

// Mock menuData
vi.mock('../src/menuData', () => ({
  default: [
    {
      restaurant_name: "L'Etoile d'Or",
      chef_name: 'Test Chef',
      location: 'Paris',
      tasting_menu: [{}, {}],
      grand_total: 100
    }
  ]
}));

describe('Homepage', () => {
  it('renders homepage content', () => {
    render(
      <MemoryRouter>
        <Homepage />
      </MemoryRouter>
    );
    
    expect(screen.getAllByText("L'Etoile d'Or")[0]).toBeInTheDocument();
    expect(screen.getAllByText('French Excellence')[0]).toBeInTheDocument();
  });
});
