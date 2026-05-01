import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ProgressiveImage from '../src/components/ProgressiveImage';

describe('ProgressiveImage', () => {
  it('renders the image with correct src and alt', () => {
    const src = 'high-res.jpg';
    
    render(<ProgressiveImage src={src} alt="Test" />);
    
    const img = screen.getByAltText('Test');
    expect(img).toHaveAttribute('src', src);
  });
});
