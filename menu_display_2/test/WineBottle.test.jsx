import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import WineBottle from '../src/pages/WineBottle';

describe('WineBottle', () => {
  const mockWineData = {
    wines: [
      { 
        id: 1, 
        name: 'Krug Champagne', 
        base_price_eur_750ml: 300,
        michelin_star_price_eur_750ml: 900,
        tasting_note: 'Divine',
        confidence: 'high',
        michelin_markup_multiple_used: 3,
        price_type: 'retail',
        pricing_source_basis: 'global',
        notes: 'A masterpiece.'
      }
    ]
  };

  beforeEach(() => {
    globalThis.fetch = vi.fn().mockImplementation((url) => {
      if (url === '/wines.json') {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockWineData)
        });
      }
      if (url === '/the_cellar/manifest.json') {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({})
        });
      }
      return Promise.reject(new Error('Unknown URL'));
    });
  });

  it('renders wine bottle details', async () => {
    render(
      <MemoryRouter initialEntries={['/wine/1-krug-champagne']}>
        <Routes>
          <Route path="/wine/:wineKey" element={<WineBottle />} />
        </Routes>
      </MemoryRouter>
    );
    
    await waitFor(() => {
      expect(screen.getByText('Krug Champagne')).toBeInTheDocument();
    });
    
    expect(screen.getByText('Divine')).toBeInTheDocument();
    expect(screen.getByText('A masterpiece.')).toBeInTheDocument();
  });
});
