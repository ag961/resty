import { render, screen } from  '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '../index';

describe('Header', () => {
  it('should render same text passed as a prop by getByText', ()=>{
    let title = 'react app';
    render(<Header title={title} />)
    const h1Element = screen.getByText(title);
    expect(h1Element).toBeInTheDocument();
  })

  it('should render same text passed as a prop by getByRole', ()=>{
    let title = 'react app';
    render(<Header title={title} />)
    const h1Element = screen.getByRole('heading');
    expect(h1Element).toBeInTheDocument();
  })
})