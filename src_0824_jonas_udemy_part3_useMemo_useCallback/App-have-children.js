import { memo, useEffect, useState } from "react";
import { faker } from "@faker-js/faker";
import { PostsProvider, usePosts } from "./PostsProvider";

function createRandomPost() {
  return {
    title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
    body: faker.hacker.phrase(),
  };
}

function App() {
  const [isFakeDark, setIsFakeDark] = useState(false);

  // Whenever `isFakeDark` changes, we toggle the `fake-dark-mode` class on the HTML element (see in "Elements" dev tool).

  console.log("app");
  useEffect(() => {
    console.log("app init");
  }, []);

  useEffect(
    function () {
      document.documentElement.classList.toggle("fake-dark-mode");
    },
    [isFakeDark]
  );

  return (
    <PostsProvider>
      <section>
        <button
          onClick={() => setIsFakeDark((isFakeDark) => !isFakeDark)}
          className="btn-fake-dark-mode"
        >
          {isFakeDark ? "☀️" : "🌙"}
        </button>

        <Header />
        <Main />
        <Archive />
        <Footer />
      </section>
    </PostsProvider>
  );
}

const Header = memo(function Header() {
  const { onClearPosts } = usePosts();

  useEffect(() => {
    console.log("header init");
  }, []);
  return (
    <header>
      <h1>
        <span>⚛️</span>The Atomic Blog
      </h1>
      <div>
        <Results />
        <SearchPosts />
        <button onClick={onClearPosts}>Clear posts</button>
      </div>
    </header>
  );
});

function SearchPosts() {
  const { searchQuery, setSearchQuery } = usePosts();
  console.log("searchposts");
  useEffect(() => {
    console.log("searchposts init");
  }, []);
  return (
    <input
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      placeholder="Search posts..."
    />
  );
}

function Results() {
  const { searchedPosts } = usePosts();
  console.log("result");
  useEffect(() => {
    console.log("result init");
  }, []);
  return (
    // <PostsContext.Consumer>
    //   {(value) => <p>🚀 {value.posts.length} atomic posts found</p>}
    // </PostsContext.Consumer>
    <p>🚀 {searchedPosts.length} atomic posts found</p>
  );
}

const Main = memo(function Main() {
  console.log("main");
  useEffect(() => {
    console.log("main init");
  }, []);
  return (
    <main>
      <FormAddPost />
      <Posts />
    </main>
  );
});

function Posts() {
  console.log("posts");
  useEffect(() => {
    console.log("posts init");
  }, []);
  return (
    <section>
      <List />
    </section>
  );
}

function FormAddPost() {
  const { onAddPost } = usePosts();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = function (e) {
    e.preventDefault();
    if (!body || !title) return;
    onAddPost({ title, body });
    setTitle("");
    setBody("");
  };
  console.log("FormAddPost");
  useEffect(() => {
    console.log("FormAddPost init");
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Post title"
      />
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Post body"
      />
      <button>Add post</button>
    </form>
  );
}

function List() {
  const { searchedPosts } = usePosts();

  console.log("list");
  useEffect(() => {
    console.log("list init");
  }, []);

  return (
    <ul>
      {searchedPosts.map((post, i) => (
        <li key={i}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </li>
      ))}
    </ul>
  );
}

function Archive() {
  const { onAddPost } = usePosts();
  // Here we don't need the setter function. We're only using state to store these posts because the callback function passed into useState (which generates the posts) is only called once, on the initial render. So we use this trick as an optimization technique, because if we just used a regular variable, these posts would be re-created on every render. We could also move the posts outside the components, but I wanted to show you this trick 😉
  const [posts] = useState(() =>
    // 💥 WARNING: This might make your computer slow! Try a smaller `length` first
    Array.from({ length: 10 }, () => createRandomPost())
  );

  const [showArchive, setShowArchive] = useState(false);

  console.log("archive");
  useEffect(() => {
    console.log("archive init");
  }, []);

  return (
    <aside>
      <h2>Post archive</h2>
      <button onClick={() => setShowArchive((s) => !s)}>
        {showArchive ? "Hide archive posts" : "Show archive posts"}
      </button>

      {showArchive && (
        <ul>
          {posts.map((post, i) => (
            <li key={i}>
              <p>
                <strong>{post.title}:</strong> {post.body}
              </p>
              <button onClick={() => onAddPost(post)}>Add as new post</button>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
}

function Footer() {
  console.log("footer");
  useEffect(() => {
    console.log("footer init");
  }, []);
  return <footer>&copy; by The Atomic Blog ✌️</footer>;
}

export default App;
