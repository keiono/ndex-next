/**
 * Represents a user in the NDEx system
 */
export interface User {
  /**
   * Additional properties as key-value pairs
   */
  properties?: {
    [key: string]: string | number | boolean | object
  }

  /** Display name of the user */
  displayName: string

  /** Whether this account represents an individual (true) or an organization (false) */
  isIndividual: boolean

  /** Username for login */
  userName: string

  /** Password - typically only used for creating/updating users */
  password?: string

  /** Whether the user's email has been verified */
  isVerified: boolean

  /** User's first name */
  firstName: string

  /** User's last name */
  lastName: string

  /** User's email address */
  emailAddress: string

  /** Storage space used in bytes */
  diskUsed: number

  /** Total storage quota in bytes */
  diskQuota: number

  /** User's description or bio */
  description: string

  /** URL to user's profile image */
  image: string

  /** User's website URL */
  website: string

  /** ISO timestamp of when the account was created */
  creationTime: string

  /** Unique identifier for the user (UUID format) */
  externalId: string

  /** Whether the user account has been marked for deletion */
  isDeleted: boolean

  /** ISO timestamp of when the account was last modified */
  modificationTime: string
}
