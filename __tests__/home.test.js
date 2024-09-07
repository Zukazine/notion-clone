import { render, screen } from '@testing-library/react'
import Home from '../src/app/page'
import '@testing-library/jest-dom'
import { useRouter } from 'next/router'

jest.mock('next/router', () => ({
  useRouter: jest.fn()
}))

describe('Home', () => {
  beforeEach(() => {
    useRouter.mockReturnValue({
      pathname: '/'
    })
  })

  it('renders the Home component', () => {
    render(<Home />)
    expect(screen.getByText('Aku mau ngitung Paaa !!')).toBeInTheDocument()
  })

  it('renders a link to the counter page', () => {
    render(<Home />)
    const linkElement = screen.getByRole('link', { name: /Aku mau ngitung Paaa !!/i })
    expect(linkElement).toHaveAttribute('href', '/counter')
  })

  it('renders the version text', () => {
    render(<Home />)
    expect(screen.getByText('v0.7')).toBeInTheDocument()
  })

  it('renders the link with correct classes', () => {
    render(<Home />)
    const linkElement = screen.getByRole('link', { name: /Aku mau ngitung Paaa !!/i })
    expect(linkElement).toHaveClass('flex items-center justify-center border-2 border-black rounded-3xl p-12 cursor-pointer hover:bg-black hover:text-white')
  })
})
