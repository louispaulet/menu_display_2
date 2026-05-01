import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import GeneratedMenuItem from '../src/components/GeneratedMenuDisplay/GeneratedMenuItem';

describe('GeneratedMenuItem', () => {
  const mockItem = {
    name: 'Steak',
    description: 'A juicy steak',
    notes: 'Optional sides',
    dietaryTags: ['GF', 'DF']
  };

  it('renders item details', () => {
    render(<GeneratedMenuItem item={mockItem} formattedPrice="$25" />);
    
    expect(screen.getByText('Steak')).toBeInTheDocument();
    expect(screen.getByText('A juicy steak')).toBeInTheDocument();
    expect(screen.getByText('Optional sides')).toBeInTheDocument();
    expect(screen.getByText('GF')).toBeInTheDocument();
    expect(screen.getByText('DF')).toBeInTheDocument();
    expect(screen.getByText('$25')).toBeInTheDocument();
  });

  it('renders without optional fields', () => {
    const minimalItem = {
      name: 'Water',
      dietaryTags: []
    };
    render(<GeneratedMenuItem item={minimalItem} />);
    expect(screen.getByText('Water')).toBeInTheDocument();
    expect(screen.queryByText('GF')).not.toBeInTheDocument();
  });
});
