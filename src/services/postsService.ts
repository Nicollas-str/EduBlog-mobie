import type { IPost } from "../interfaces/IPost";

interface ApiResponse<T> {
  data: T;
}

interface PostsRequest {
  <T>(
    path: string,
    options?: {
      method?: string;
    },
  ): Promise<T>;
}

export async function getPosts(request: PostsRequest): Promise<IPost[]> {
  const response = await request<ApiResponse<IPost[]>>("/posts", {
    method: "GET",
  });

  return response.data;
}

export async function getAllPosts(request: PostsRequest): Promise<IPost[]> {
  const response = await request<ApiResponse<IPost[]>>("/posts/all", {
    method: "GET",
  });

  return response.data;
}
