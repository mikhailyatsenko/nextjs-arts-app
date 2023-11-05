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
    <select
      defaultValue={itemsPerPage}
      onChange={(e) => {
        console.log(e.target.value);
        changeItemsPerPage(e.target.value);
      }}
    >
      {itemsToDisplay.map((itemNum, index) => (
        <option key={index} value={itemNum}>
          {itemNum}
        </option>
      ))}
    </select>
  );
};

export default SelectItemsPerPage;
