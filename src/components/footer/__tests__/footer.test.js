import { render, screen } from  '@testing-library/react';
import '@testing-library/jest-dom';
import Footer from '../index';

describe('Footer', () => {
  let footer = 'copyright';
  it('should render same text passed as a prop by getByText', ()=>{
    render(<Footer footerText={footer} />)
    const h1Element = screen.getByText(footer);
    expect(h1Element).toBeInTheDocument();
  })

  it('should render same text passed as a prop by getByRole', ()=>{
   
    render(<Footer footerText={footer} />)
    const h1Element = screen.getByRole('contentinfo');
    expect(h1Element).toBeInTheDocument();
  })

  it('should render same text passed as a prop by getByTitle', ()=>{
  
    render(<Footer footerText={footer} />)
    const h1Element = screen.getByTitle('Footer-text');
    expect(h1Element).toBeInTheDocument();
  })
})