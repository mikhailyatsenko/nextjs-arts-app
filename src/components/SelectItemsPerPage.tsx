import { useAppSelector } from '../hooks/useAppSelector';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { changeItemsPerPage } from '../store/slices/commonSlice';

interface Props {
  selectItemArtPage: () => void;
}

const SelectItemsPerPage = ({ selectItemArtPage }: Props) => {
  const dispatch = useAppDispatch();
  const { itemsPerPage } = useAppSelector((state) => state.common);
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
          dispatch(changeItemsPerPage(e.target.value));
          selectItemArtPage();
        }}
        data-testid="select-items-on-page"
      >
        {itemsToDisplay.map((itemNum, index) => (
          <option
            key={index}
            value={itemNum}
            data-testid="select-items-on-page-option"
          >
            {itemNum}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectItemsPerPage;
