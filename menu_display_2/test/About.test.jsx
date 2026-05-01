import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import About from '../src/pages/About';

describe('About', () => {
  it('renders about page', () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>
    );
    expect(screen.getByText(/About/i)).toBeInTheDocument();
  });
});
