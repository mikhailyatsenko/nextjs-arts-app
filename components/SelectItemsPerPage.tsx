import { useRouter } from 'next/router';

interface Props {
  limit: string;
}

const SelectItemsPerPage: React.FC<Props> = ({ limit }) => {
  const router = useRouter();

  const handlePerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    router.push({
      // pathname: '/',
      query: {
        ...router.query,
        page: 1,
        selectedArtId: '',
        limit: event.target.value,
      },
    });
  };

  const itemsToDisplay: number[] = [];
  const maxItemsPerPage: number = 10;
  for (let i = 1; i <= maxItemsPerPage; i++) {
    itemsToDisplay.push(i);
  }
  return (
    <div className="items-per-page">
      <p>Arts per page: </p>
      <select
        value={limit}
        onChange={(e) => {
          handlePerPageChange(e);
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
