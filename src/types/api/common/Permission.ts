export const Permission = {
  READ: 'READ',
  WRITE: 'WRITE',
} as const

export type Permission = (typeof Permission)[keyof typeof Permission]
