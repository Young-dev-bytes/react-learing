function Row({ title, isHighlighted }) {
  return (
    <div className={["Row", isHighlighted ? "RowHighlighted" : ""].join("")}>
      {title}
    </div>
  );
}

export default Row;
