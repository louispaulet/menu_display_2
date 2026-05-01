import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import MenuDisplay from '../src/components/MenuDisplay';

// Mock scrollToTop component since it uses window.scrollTo
vi.mock('./scrollToTop', () => ({
  default: () => null
}));

describe('MenuDisplay', () => {
  it('renders restaurant name and courses', () => {
    const tastingMenu = [
      { course: 'First', description: 'Dish 1' },
      { course: 'Second', description: 'Dish 2' }
    ];
    
    render(
      <MemoryRouter>
        <MenuDisplay 
          restaurantName="Test Restaurant"
          chefName="Test Chef"
          location="Test Location"
          tastingMenu={tastingMenu}
          diningRoomDescription="Nice place"
          grandTotal={100}
        />
      </MemoryRouter>
    );
    
    expect(screen.getByText('Test Restaurant')).toBeInTheDocument();
    expect(screen.getByText('Test Chef')).toBeInTheDocument();
    expect(screen.getByText('Dish 1')).toBeInTheDocument();
    expect(screen.getByText('Dish 2')).toBeInTheDocument();
  });
});
