import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import MenuPreview from '../src/components/MenuPreview';

describe('MenuPreview', () => {
  const props = {
    restaurantName: 'Test Restaurant',
    chefName: 'Test Chef',
    location: 'Test Location',
    numberOfCourses: 5,
    totalPrice: 100,
    id: 1
  };

  it('renders menu preview info', () => {
    render(
      <MemoryRouter>
        <MenuPreview {...props} />
      </MemoryRouter>
    );
    
    expect(screen.getByText('Test Restaurant')).toBeInTheDocument();
    expect(screen.getByText('Test Chef')).toBeInTheDocument();
    expect(screen.getByText('$100')).toBeInTheDocument();
    expect(screen.getByText('5 courses')).toBeInTheDocument();
  });
});
