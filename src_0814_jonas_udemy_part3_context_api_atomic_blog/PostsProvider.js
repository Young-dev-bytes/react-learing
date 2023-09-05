import { createContext, useContext, useState } from "react";
import { faker } from "@faker-js/faker";

function createRandomPost() {
  return {
    title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
    body: faker.hacker.phrase(),
  };
}
const PostsContext = createContext();

function PostsProvider({ children }) {
  const [posts, setPosts] = useState(() =>
    Array.from({ length: 30 }, () => createRandomPost())
  );
  const [searchQuery, setSearchQuery] = useState("");

  // Derived state. These are the posts that will actually be displayed
  const searchedPosts =
    searchQuery.length > 0
      ? posts.filter((post) =>
          `${post.title} ${post.body}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        )
      : posts;

  function handleAddPost(post) {
    setPosts((posts) => [post, ...posts]);
  }

  function handleClearPosts() {
    setPosts([]);
  }

  return (
    <PostsContext.Provider
      value={{
        searchedPosts,
        searchQuery,
        onClearPosts: handleClearPosts,
        setSearchQuery,
        handleAddPost,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
}

/**
 usePosts only being used in the component that PostsContexts include
 in this way, PostsContext include the following:
 <PostsProvider>
    <Header />
    <Main />
    <Archive />
    <Footer />
  </PostsProvider>
 */

function usePosts() {
  const text = useContext(PostsContext);
  console.log("text", text);
  if (text === undefined)
    throw new Error("PostContext was used outside of the PostProvider");
  return text;
}

export { PostsProvider, createRandomPost, usePosts };
