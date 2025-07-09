export const ROUTES = {
  HOME: '/',
  LOGIN: '/auth/login',
  SIGNUP: '/auth/sign-up',
  VERIFICATION: '/auth/verification',
  FORGOT_PASSWORD: '/auth/forgot-password',
  CHANGE_PASSWORD: '/auth/change-password',
  RECENT_ARTICLES: '/articles',
  ABOUT: '/about',
  AUTHOR_ARTICLES: '/author/:authorId',
  ARTICLE_DETAIL: '/article/:articleId',
  MY_ARTICLES: '/my-articles',
  ALL_ARTICLES: '/all-articles',
  CREATE_BOOK: '/book/create',
  CHAT: '/chat',
  EDIT_ARTICLE: '/edit-article/:articleId',
  CREATE_ARTICLE: '/create-article',
};

export const GROUPS = {
  ADMINS: 'admins',
  USERS: 'users',
};
