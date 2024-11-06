export class InputParseError extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options)
  }
}
export class DraftLimitExceed extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options)
  }
}

export class SupabaseError extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options)
  }
}

export class AuthorizeError extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options)
  }
}

export class UnauthenticatedError extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options)
  }
}
