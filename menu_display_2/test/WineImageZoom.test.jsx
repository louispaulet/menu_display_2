import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import WineImageZoom from '../src/components/WineImageZoom';

describe('WineImageZoom', () => {
  it('renders and opens modal on click', () => {
    render(<WineImageZoom src="test.webp" alt="Test Bottle" />);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    // Check if modal content is visible
    expect(screen.getAllByAltText('Test Bottle').length).toBeGreaterThan(1);
  });
});
