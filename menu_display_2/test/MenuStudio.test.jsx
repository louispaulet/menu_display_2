import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import MenuStudio from '../src/pages/MenuStudio';

describe('MenuStudio', () => {
  beforeEach(() => {
    globalThis.fetch = vi.fn().mockImplementation((url) => {
      if (url === '/menu_examples.json') {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ "test.webp": { title: "Test", description: "Desc" } })
        });
      }
      return Promise.reject(new Error('Unknown URL'));
    });
    localStorage.clear();
  });

  it('renders menu studio page', async () => {
    render(
      <MemoryRouter>
        <MenuStudio />
      </MemoryRouter>
    );
    
    expect(screen.getByText('Turn a menu photo into a refined text menu.')).toBeInTheDocument();
    
    await waitFor(() => {
      expect(screen.getByText('Test')).toBeInTheDocument();
    });
  });

  it('handles file selection', async () => {
    render(
      <MemoryRouter>
        <MenuStudio />
      </MemoryRouter>
    );
    
    const file = new File(['hello'], 'menu.png', { type: 'image/png' });
    const input = screen.getByLabelText(/Choose image/i);
    
    fireEvent.change(input, { target: { files: [file] } });
    
    expect(screen.getByText(/menu.png/)).toBeInTheDocument();
  });

  it('handles form submission successfully', async () => {
    render(
      <MemoryRouter>
        <MenuStudio />
      </MemoryRouter>
    );
    
    const file = new File(['hello'], 'menu.png', { type: 'image/png' });
    const input = screen.getByLabelText(/Choose image/i);
    fireEvent.change(input, { target: { files: [file] } });
    
    const submitButton = screen.getByRole('button', { name: /Extract/i });
    
    globalThis.fetch = vi.fn().mockImplementation((url) => {
      if (url.includes('/menu-extractions')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ menu: { restaurant_name: "Success" } })
        });
      }
      return Promise.resolve({ ok: true, json: () => Promise.resolve({}) });
    });
    
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('Success')).toBeInTheDocument();
    });
  });

  it('handles clear results', async () => {
    render(
      <MemoryRouter>
        <MenuStudio />
      </MemoryRouter>
    );
    
    // First simulate having a result
    const file = new File(['hello'], 'menu.png', { type: 'image/png' });
    const input = screen.getByLabelText(/Choose image/i);
    fireEvent.change(input, { target: { files: [file] } });
    
    const clearButton = screen.getByRole('button', { name: /Clear/i });
    fireEvent.click(clearButton);
    
    expect(screen.getByText('No file selected')).toBeInTheDocument();
  });

  it('handles example selection', async () => {
    render(
      <MemoryRouter>
        <MenuStudio />
      </MemoryRouter>
    );
    
    await waitFor(() => {
      expect(screen.getByText('Test')).toBeInTheDocument();
    });
    
    globalThis.fetch = vi.fn().mockImplementation((url) => {
      if (url.includes('/menu_examples_json/')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ menu: { restaurant_name: "Example Restaurant" } })
        });
      }
      return Promise.resolve({ ok: true, json: () => Promise.resolve({ "test.webp": { title: "Test" } }) });
    });
    
    const exampleButton = screen.getByText('Test');
    fireEvent.click(exampleButton);
    
    await waitFor(() => {
      expect(screen.getByText('Example Restaurant')).toBeInTheDocument();
    });
  });
});
