import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import axios from 'axios'
import CharacterDetails from './CharacterDetails.vue'
import waitForUpdate from '../utils/waitForUpdate'

const mockCharacterDetails = {
  id: '9e3f7ce4-b9a7-4244-b709-dae5c1f1d4a8',
  name: 'Harry Potter',
  alternate_names: [
    'The Boy Who Lived',
    'The Chosen One',
    'Undesirable No. 1',
    'Potty',
  ],
  species: 'human',
  gender: 'male',
  house: 'Gryffindor',
  dateOfBirth: '31-07-1980',
  yearOfBirth: 1980,
  wizard: true,
  ancestry: 'half-blood',
  eyeColour: 'green',
  hairColour: 'black',
  wand: {
    wood: 'holly',
    core: 'phoenix tail feather',
    length: 11,
  },
  patronus: 'stag',
  hogwartsStudent: true,
  hogwartsStaff: false,
  actor: 'Daniel Radcliffe',
  alternate_actors: [],
  alive: true,
  image: 'https://ik.imagekit.io/hpapi/harry.jpg',
}

const toast = {
  addToast: vi.fn(),
}

vi.mock('axios', () => ({
  default: {
    get: vi.fn(() =>
      Promise.resolve({
        data: [mockCharacterDetails],
      }),
    ),
  },
}))

function mountCharacterDetails() {
  return mount(CharacterDetails, {
    props: {
      characterId: mockCharacterDetails.id,
    },
    global: {
      provide: {
        toast,
      },
    },
  })
}

describe('CharacterDetails', () => {
  it('renders loading state initially', () => {
    const wrapper = mountCharacterDetails()

    expect(wrapper.text()).toContain('Loading...')
  })

  it('renders character details after loading', async () => {
    const wrapper = mountCharacterDetails()
    await waitForUpdate(wrapper, 3)

    expect(wrapper.text()).toContain('Harry Potter')
    expect(wrapper.text()).toContain('The Boy Who Lived')
    expect(wrapper.text()).toContain('Species: human')
    expect(wrapper.text()).toContain('Gender: male')
    expect(wrapper.text()).toContain('House: Gryffindor')
    expect(wrapper.text()).toContain('Date of Birth: 31-07-1980')
    expect(wrapper.text()).toContain(
      'holly wood, phoenix tail feather core, 11 inches',
    )
    expect(wrapper.text()).toContain('Patronus: stag')
    expect(wrapper.text()).toContain('Actor: Daniel Radcliffe')
    expect(wrapper.text()).toContain('Student: Yes')
    expect(wrapper.text()).toContain('Hogwarts Staff: No')
    expect(wrapper.text()).toContain('Alive: Yes')
  })

  it('displays an error message if the API call fails', async () => {
    axios.get.mockRejectedValueOnce(new Error('Network Error'))

    const wrapper = mountCharacterDetails()

    await waitForUpdate(wrapper, 3)

    expect(wrapper.text()).toContain(
      'Error: failed to retrieve character data, please try again',
    )
    expect(toast.addToast).toHaveBeenCalledWith(
      'Error fetching character data',
      'error',
    )
  })
})
