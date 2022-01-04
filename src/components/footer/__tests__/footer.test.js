import { render, screen } from  '@testing-library/react';
import '@testing-library/jest-dom';
import Footer from '../index';

describe('Footer', () => {
 
  it('should render text Ayrat', ()=>{
    render(<Footer />)
    const author = screen.getByText(/Ayrat/i);
    expect(author).toBeInTheDocument();
  })

  it('should render text by getByRole', ()=>{
   
    render(<Footer />)
    const h1Element = screen.getByRole('contentinfo');
    expect(h1Element).toBeInTheDocument();
  })

  it('should render text getByTitle', ()=>{
  
    render(<Footer />)
    const h1Element = screen.getByTitle('Footer-text');
    expect(h1Element).toBeInTheDocument();
  })
})