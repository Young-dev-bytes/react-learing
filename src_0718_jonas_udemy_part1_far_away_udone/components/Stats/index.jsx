const Stats = ({ items }) => {
  if (!items.length) {
    return (
      <footer className="stats">
        <em>Start adding some items your packing list 🚀</em>
      </footer>
    );
  }

  // computed already packed items
  const count = items.length;
  const packedCount = items.filter((item) => item.packed).length;
  const packedCountPercentage = Math.round((packedCount / count) * 100);

  return (
    <footer className="stats">
      <em>
        {packedCountPercentage === 100
          ? "You got everything! Ready to go ✈️"
          : `💼 You have ${count} items on your list, and you already packed 
          ${packedCount} (${packedCountPercentage}%)`}
      </em>
    </footer>
  );
};

export default Stats;
