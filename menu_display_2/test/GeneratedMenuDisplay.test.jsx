import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import GeneratedMenuDisplay from '../src/components/GeneratedMenuDisplay';

describe('GeneratedMenuDisplay', () => {
  const mockMenu = {
    restaurantName: 'Test Restaurant',
    sections: [
      {
        name: 'Main Courses',
        items: [
          { name: 'Steak', description: 'Good steak', price: 25 }
        ],
        notes: ['Note 1']
      }
    ],
    extractionWarnings: ['Warning 1']
  };

  it('renders generated menu content', () => {
    render(<GeneratedMenuDisplay menu={mockMenu} />);
    
    expect(screen.getByText('Test Restaurant')).toBeInTheDocument();
    expect(screen.getByText('Main Courses')).toBeInTheDocument();
    expect(screen.getByText('Steak')).toBeInTheDocument();
    expect(screen.getByText('Warning 1')).toBeInTheDocument();
  });

  it('renders null if menu is missing', () => {
    const { container } = render(<GeneratedMenuDisplay menu={null} />);
    expect(container.firstChild).toBeNull();
  });
});
