import { createContext, useContext, useMemo, useState } from "react";
import { faker } from "@faker-js/faker";

function createRandomPost() {
  return {
    title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
    body: faker.hacker.phrase(),
  };
}
const PostsContext = createContext();

function PostsProvider({ children }) {
  const [searchQuery, setSearchQuery] = useState("");

  const [posts, setPosts] = useState(() =>
    Array.from({ length: 30 }, () => createRandomPost())
  );

  // Derived state. These are the posts that will actually be displayed
  const searchedPosts =
    searchQuery.length > 0
      ? posts.filter((post) =>
          `${post.title} ${post.body}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        )
      : posts;

  const value = useMemo(() => {
    return {
      searchedPosts,
      searchQuery,
      onClearPosts: handleClearPosts,
      setSearchQuery,
      handleAddPost,
    };
  }, [searchQuery, searchedPosts]);

  function handleAddPost(post) {
    setPosts((posts) => [post, ...posts]);
  }

  function handleClearPosts() {
    setPosts([]);
  }

  return (
    <PostsContext.Provider value={value}>{children}</PostsContext.Provider>
  );
}

function usePosts() {
  const text = useContext(PostsContext);
  if (text === undefined)
    throw new Error("PostContext was used outside of the PostProvider");
  return text;
}

export { PostsProvider, createRandomPost, usePosts };
