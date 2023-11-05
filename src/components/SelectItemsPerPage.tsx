interface Props {
  itemsPerPage: number;
  changeItemsPerPage: (itemsPerPage: string) => void;
}

const SelectItemsPerPage = ({ itemsPerPage, changeItemsPerPage }: Props) => {
  const itemsToDisplay: number[] = [];
  const maxItemsPerPage: number = 10;
  for (let i = 1; i <= maxItemsPerPage; i++) {
    itemsToDisplay.push(i);
  }
  return (
    <div className="items-per-page">
      <p>Arts per page: </p>
      <select
        defaultValue={itemsPerPage}
        onChange={(e) => {
          changeItemsPerPage(e.target.value);
        }}
      >
        {itemsToDisplay.map((itemNum, index) => (
          <option key={index} value={itemNum}>
            {itemNum}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectItemsPerPage;
