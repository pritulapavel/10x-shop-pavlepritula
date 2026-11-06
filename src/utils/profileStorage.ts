import type { Profile } from '../types'
import { isRecord } from './decode.ts'
import { STORAGE_KEYS, StorageService } from './storage.ts'

type ProfileMap = Partial<Record<string, Profile>>

export const emptyProfile: Profile = { firstName: '', lastName: '', email: '', phone: '' }

function normalizeUsername(username: string) {
  return username.trim().toLowerCase()
}

function isProfile(value: unknown): value is Profile {
  return isRecord(value) && typeof value.firstName === 'string' && typeof value.lastName === 'string' &&
    typeof value.email === 'string' && typeof value.phone === 'string'
}

function copyProfile({ firstName, lastName, email, phone }: Profile): Profile {
  return { firstName, lastName, email, phone }
}

const profileStorage = new StorageService<ProfileMap>(STORAGE_KEYS.profiles, (input) => {
  if (!isRecord(input)) return
  return Object.fromEntries(Object.entries(input).flatMap(([name, profile]) =>
    name && name === normalizeUsername(name) && isProfile(profile) ? [[name, copyProfile(profile)] as const] : [],
  ))
})

export function readProfile(username: string): Profile {
  const key = normalizeUsername(username)
  const saved = profileStorage.read()
  if (saved.ok && saved.value && Object.hasOwn(saved.value, key)) {
    return saved.value[key] ?? emptyProfile
  }
  return emptyProfile
}

export function saveProfile(username: string, profile: Profile): boolean {
  const key = normalizeUsername(username)
  if (!key) return false
  const saved = profileStorage.read()
  // A corrupt value can be replaced on Save; a failed read could hide valid profiles.
  if (!saved.ok && saved.reason === 'unavailable') return false
  const profiles = saved.ok ? saved.value : undefined
  return profileStorage.write({ ...profiles, [key]: copyProfile(profile) })
}

export function clearSavedProfiles(): boolean {
  return profileStorage.remove()
}
