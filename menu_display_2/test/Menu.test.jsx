import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Menu from '../src/pages/Menu';

// Mock menuData
vi.mock('../src/menuData', () => ({
  default: [
    {
      restaurant_name: "L'Etoile d'Or",
      chef_name: 'Test Chef',
      location: 'Paris',
      tasting_menu: [{ course: 'First', description: 'Dish' }],
      grand_total: 100
    }
  ]
}));

describe('Menu', () => {
  it('renders menu page for valid id', () => {
    render(
      <MemoryRouter initialEntries={['/menu/0']}>
        <Routes>
          <Route path="/menu/:id" element={<Menu />} />
        </Routes>
      </MemoryRouter>
    );
    
    expect(screen.getByText("L'Etoile d'Or")).toBeInTheDocument();
  });

  it('renders not found for invalid id', () => {
    render(
      <MemoryRouter initialEntries={['/menu/99']}>
        <Routes>
          <Route path="/menu/:id" element={<Menu />} />
        </Routes>
      </MemoryRouter>
    );
    
    expect(screen.getByText('Menu not found')).toBeInTheDocument();
  });
});
