import { Permission } from '../common/Permission'

export interface NetworkSearchParams {
  searchString: string
  permission?: Permission
  includeGroups?: boolean
  accountName?: string
  start?: number
  size?: number
}
