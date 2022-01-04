import { render, screen } from  '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '../index';

describe('Header', () => {
  it('should render text by getByText', ()=>{
    render(<Header />)
    const h1Element = screen.getByText('-RESTy-');
    expect(h1Element).toBeInTheDocument();
  })

  it('should render text by getByRole', ()=>{

    render(<Header />)
    const h1Element = screen.getByRole('heading');
    expect(h1Element).toBeInTheDocument();
  })
})