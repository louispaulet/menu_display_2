import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import HeatBar from '../src/components/HotSauce/HeatBar';

describe('HeatBar', () => {
  it('renders heat level', () => {
    render(<HeatBar level={5} />);
    expect(screen.getByText('5/10')).toBeInTheDocument();
  });

  it('applies correct color for high heat', () => {
    const { container } = render(<HeatBar level={9} />);
    const bar = container.querySelector('.bg-rose-700');
    expect(bar).toBeInTheDocument();
  });
});
