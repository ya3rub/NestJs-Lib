export enum CategoriesPermission {
  CreateCategory = 'CreateCategory',
}

export enum PostsPermission {
  DeletePost = 'DeletePost',
  CreatePost = 'CreatePost',

}

export const Permission = {
  ...PostsPermission,
  ...CategoriesPermission,
};

export type Permission = PostsPermission | CategoriesPermission;
