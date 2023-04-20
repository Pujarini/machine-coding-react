const SearchChat = ({ searchItem, searchItemFn }) => {
  return (
    <header className="chatList__info">
      <h1>Filter by Title /Order Id</h1>
      <input
        type="text"
        placeholder="Start typing to search"
        value={searchItem}
        onChange={(e) => searchItemFn(e.target.value)}
      />
    </header>
  );
};

export default SearchChat;
