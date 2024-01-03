import { describe, it, expect, vi, beforeEach } from 'vitest'
import { nextTick } from 'vue'
import useToast from './toast'

vi.useFakeTimers()

describe('useToast', () => {
  let toasts
  let addToast
  let removeToast

  beforeEach(() => {
    ;({ toasts, addToast, removeToast } = useToast())
  })

  it('initializes with no toasts', () => {
    expect(toasts.value).toHaveLength(0)
  })

  it('adds a new toast', () => {
    addToast('Test message')
    expect(toasts.value).toHaveLength(1)
    expect(toasts.value[0].message).toBe('Test message')
    expect(toasts.value[0].type).toBe('success')
  })

  it('adds a new toast with a custom type', () => {
    addToast('Another Test message', 'error')
    expect(toasts.value).toHaveLength(1)
    expect(toasts.value[0].type).toBe('error')
  })

  it('removes a toast by id', () => {
    addToast('Test message')
    const { id } = toasts.value[0]
    removeToast(id)
    expect(toasts.value).toHaveLength(0)
  })

  it('automatically removes a toast after 3 seconds', async () => {
    addToast('Test message')
    expect(toasts.value).toHaveLength(1)
    vi.runAllTimers()
    await nextTick()
    expect(toasts.value).toHaveLength(0)
  })
})
