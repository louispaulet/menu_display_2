import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import HotSauceStats from '../src/components/HotSauce/HotSauceStats';

describe('HotSauceStats', () => {
  const mockSauce = {
    hotness_level: 8,
    scoville_units: 100000,
    price: 12,
    age_months: 12,
    batch_size: 500,
    bottling_date: '2024-05-01',
    acidity_ph: 3.5
  };

  it('renders sauce stats', () => {
    render(<HotSauceStats sauce={mockSauce} />);
    expect(screen.getByText('100,000 SHU')).toBeInTheDocument();
    expect(screen.getByText('$12 bottle')).toBeInTheDocument();
    expect(screen.getByText('pH 3.5')).toBeInTheDocument();
  });
});
