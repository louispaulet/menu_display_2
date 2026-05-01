import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import HotSaucePage from '../src/pages/HotSaucePage';

// Mock hotSauceList
vi.mock('../src/lib/hotSauceUtils', async () => {
  const actual = await vi.importActual('../src/lib/hotSauceUtils');
  return {
    ...actual,
    hotSauceList: [
      {
        id: 0,
        name: 'Fire Sauce',
        hotness_level: 5,
        bottling_date: '2024-01-01',
        price: 15,
        scoville_units: 50000,
        age_months: 6,
        batch_size: 100,
        description: 'Very hot'
      }
    ]
  };
});

describe('HotSaucePage', () => {
  it('renders hot sauce page with list', () => {
    render(
      <MemoryRouter>
        <HotSaucePage />
      </MemoryRouter>
    );
    
    expect(screen.getByText('Fire Sauce')).toBeInTheDocument();
    expect(screen.getByText('Artisanal hot sauces with a chef’s point of view.')).toBeInTheDocument();
  });
});
