import React from 'react';
import { render } from '@testing-library/react';
import App from './app';

test('renders all necessary component links', () => {
  const { getByText } = render(<App />);
  const productsElement = getByText(/products/i);
  const searchElement = getByText(/search/i);
  expect(productsElement).toBeInTheDocument();
  expect(searchElement).toBeInTheDocument();
});
