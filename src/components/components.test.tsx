import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'
import { describe, expect, it, vi } from 'vitest'
import { Avatar } from './Avatar'
import { ClayButton } from './ClayButton'
import { ClayInput } from './ClayInput'
import { Modal } from './Modal'
import { ProgressBar } from './ProgressBar'

describe('ClayButton', () => {
  it('calls onClick, but not when disabled', async () => {
    const onClick = vi.fn()
    const { rerender } = render(<ClayButton onClick={onClick}>Save</ClayButton>)
    await userEvent.click(screen.getByRole('button', { name: 'Save' }))
    expect(onClick).toHaveBeenCalledTimes(1)

    rerender(<ClayButton onClick={onClick} disabled>Save</ClayButton>)
    await userEvent.click(screen.getByRole('button', { name: 'Save' }))
    expect(onClick).toHaveBeenCalledTimes(1)
  })
})

describe('ProgressBar', () => {
  it('exposes its percentage and label', () => {
    render(<ProgressBar value={45} max={200} label="Toy Rocket" />)
    const bar = screen.getByRole('progressbar', { name: 'Toy Rocket' })
    expect(bar).toHaveAttribute('aria-valuenow', '23')
  })
})

describe('Avatar', () => {
  it('shows the first letter when there is no picture', () => {
    render(<Avatar name="Sam" />)
    expect(screen.getByText('S')).toBeInTheDocument()
  })

  it('shows the picture when given', () => {
    render(<Avatar name="Theo" src="/theo.png" />)
    expect(screen.getByRole('img', { name: 'Theo' })).toHaveAttribute('src', '/theo.png')
  })
})

describe('ClayInput', () => {
  it('links the label to the input', async () => {
    render(<ClayInput label="Name" />)
    await userEvent.type(screen.getByLabelText('Name'), 'Theo')
    expect(screen.getByLabelText('Name')).toHaveValue('Theo')
  })

  it('announces the error on the input', () => {
    render(<ClayInput label="PIN" error="Use 4 digits" />)
    const input = screen.getByLabelText('PIN')
    expect(input).toBeInvalid()
    expect(input).toHaveAccessibleDescription('Use 4 digits')
  })
})

describe('Modal', () => {
  function Harness() {
    const [open, setOpen] = useState(false)
    return (
      <>
        <button onClick={() => setOpen(true)}>Open</button>
        <Modal open={open} onClose={() => setOpen(false)} title="Confirm">
          <button onClick={() => setOpen(false)}>Done</button>
        </Modal>
      </>
    )
  }

  it('opens and closes', async () => {
    render(<Harness />)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    await userEvent.click(screen.getByText('Open'))
    expect(screen.getByRole('dialog', { name: 'Confirm' })).toBeInTheDocument()
    await userEvent.click(screen.getByText('Done'))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })
})
