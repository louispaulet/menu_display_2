import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import WineList from '../src/pages/WineList';

describe('WineList', () => {
  const mockWineData = {
    metadata: {
      count: 2,
      fictional_or_unpriceable_count: 0,
      description: 'A fine selection.'
    },
    wines: [
      { id: 1, name: 'Krug Champagne', base_price_eur_750ml: 300 },
      { id: 2, name: 'Bordeaux Red', base_price_eur_750ml: 100 }
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

  it('renders loading state initially', () => {
    render(
      <MemoryRouter>
        <WineList />
      </MemoryRouter>
    );
    expect(screen.getByText(/Loading cellar intelligence/)).toBeInTheDocument();
  });

  it('renders wine list after data is loaded', async () => {
    render(
      <MemoryRouter>
        <WineList />
      </MemoryRouter>
    );
    
    await waitFor(() => {
      expect(screen.getByText('Browse the cellar by style, origin, and mood.')).toBeInTheDocument();
    });
    
    expect(screen.getByText('Krug Champagne')).toBeInTheDocument();
    expect(screen.getByText('Bordeaux Red')).toBeInTheDocument();
  });
});
