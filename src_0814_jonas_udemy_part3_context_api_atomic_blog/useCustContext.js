import { useContext } from "react";
import { PostsContext } from "./PostsProvider";

export function useCustContext() {
  const {
    onClearPosts,
    searchQuery,
    setSearchQuery,
    searchedPosts,
    onAddPost,
  } = useContext(PostsContext);

  return {
    onClearPosts,
    searchQuery,
    setSearchQuery,
    searchedPosts,
    onAddPost,
    PostsContext,
  };
}
