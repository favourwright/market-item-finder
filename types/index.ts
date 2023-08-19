export enum AccountType {
  BUYER = 'buyer',
  SELLER = 'seller'
}

export interface User {
  id: string
  firstname: string
  lastname: string
  email: string
  password: string
  phone: string
  location: string
  createdAt: Date
  accountType: AccountType
}