import React from 'react';
import { render, fireEvent, waitFor, screen } from  '@testing-library/react';
import '@testing-library/jest-dom';
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import Form from '../index';

describe('Form', () => {

  it('should upon submitting the form will result in data being rendered in the output area', ()=>{
    render(<Form />)


    const h1Element = screen.getByText("Response");
    expect(h1Element).toBeInTheDocument();
  })
})