import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import axios from 'axios'
import Gryffindor from './Gryffindor.vue'
import waitForUpdate from '../utils/waitForUpdate'

const mockCharacters = [
  { id: 1, name: 'Harry Potter' },
  { id: 2, name: 'Hermione Granger' },
]

const toast = {
  addToast: vi.fn(),
}

vi.mock('axios', () => ({
  default: {
    get: vi.fn(() =>
      Promise.resolve({
        data: mockCharacters,
      }),
    ),
  },
}))

function mountGryffindor() {
  return mount(Gryffindor, {
    global: {
      provide: {
        toast,
      },
    },
  })
}

describe('Gryffindor', () => {
  it('renders loading state initially', () => {
    const wrapper = mountGryffindor()

    expect(wrapper.text()).toContain('Loading...')
  })

  it('renders characters after loading', async () => {
    const wrapper = mountGryffindor()

    await waitForUpdate(wrapper, 3)

    expect(wrapper.text()).toContain('Characters List of House of Gryffindor')
    expect(wrapper.findAll('li')).toHaveLength(mockCharacters.length)
  })

  it('displays an error message if the API call fails', async () => {
    axios.get.mockRejectedValueOnce(new Error('Network Error'))

    const wrapper = mountGryffindor()

    await waitForUpdate(wrapper, 3)

    expect(wrapper.text()).toContain(
      'Error: failed to retrieve Hogwarts house data, please try again',
    )
    expect(toast.addToast).toHaveBeenCalledWith(
      'Error fetching Gryffindor data',
      'error',
    )
  })
})
