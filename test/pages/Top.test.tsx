import { MemoryRouter } from 'react-router-dom';

import { render, screen } from '@testing-library/react';

import Top from '../../src/pages/Top';

test('タイトルに "TopPage" が表示されている', () => {
  render(
    <MemoryRouter>
      <Top />
    </MemoryRouter>
  );
  screen.debug();
  expect(screen.getByText('TopPage')).toBeInTheDocument();
});

test('本文に "SampleText" が表示されている', () => {
  render(
    <MemoryRouter>
      <Top />
    </MemoryRouter>
  );
  screen.debug();
  expect(screen.getByText('SampleText')).toBeInTheDocument();
});
