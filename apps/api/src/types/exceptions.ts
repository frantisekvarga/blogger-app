export class AuthException extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public code?: string
  ) {
    super(message);
    this.name = 'AuthException';
  }
}

export class UserAlreadyExistsException extends AuthException {
  constructor(email: string) {
    super(
      `User with email ${email} already exists`,
      409,
      'USER_ALREADY_EXISTS'
    );
    this.name = 'UserAlreadyExistsException';
  }
}

export class InvalidCredentialsException extends AuthException {
  constructor() {
    super('Invalid email or password', 401, 'INVALID_CREDENTIALS');
    this.name = 'InvalidCredentialsException';
  }
}

export class InvalidTokenException extends AuthException {
  constructor() {
    super('Invalid or expired token', 401, 'INVALID_TOKEN');
    this.name = 'InvalidTokenException';
  }
}

export class MissingTokenException extends AuthException {
  constructor() {
    super('Authentication token is required', 401, 'MISSING_TOKEN');
    this.name = 'MissingTokenException';
  }
}

export class ValidationException extends Error {
  constructor(
    message: string,
    public statusCode: number = 400,
    public code?: string
  ) {
    super(message);
    this.name = 'ValidationException';
  }
}

export class InvalidIdException extends ValidationException {
  constructor(idType: string, value: string) {
    super(`Invalid ${idType} ID: ${value}`, 400, 'INVALID_ID');
    this.name = 'InvalidIdException';
  }
}

export class MissingFieldsException extends ValidationException {
  constructor(fields: string[]) {
    super(
      `Missing required fields: ${fields.join(', ')}`,
      400,
      'MISSING_FIELDS'
    );
    this.name = 'MissingFieldsException';
  }
}

export class PasswordMismatchException extends ValidationException {
  constructor() {
    super('Passwords do not match', 400, 'PASSWORD_MISMATCH');
    this.name = 'PasswordMismatchException';
  }
}

export class ArticleException extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public code?: string
  ) {
    super(message);
    this.name = 'ArticleException';
  }
}

export class ArticleNotFoundException extends ArticleException {
  constructor(articleId: number) {
    super(`Article with id ${articleId} not found`, 404, 'ARTICLE_NOT_FOUND');
    this.name = 'ArticleNotFoundException';
  }
}

export class AuthorNotFoundException extends ArticleException {
  constructor(authorId: number) {
    super(`Author with id ${authorId} not found`, 404, 'AUTHOR_NOT_FOUND');
    this.name = 'AuthorNotFoundException';
  }
}

export class UnauthorizedException extends ArticleException {
  constructor(action: string) {
    super(`Unauthorized to ${action} this article`, 403, 'UNAUTHORIZED');
    this.name = 'UnauthorizedException';
  }
}
