import { useRouter } from 'next/router';

interface Props {
  limit: string;
}

const SelectItemsPerPage: React.FC<Props> = ({ limit }) => {
  const router = useRouter();

  const handlePerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const route = router.query;
    if (route.hasOwnProperty('selectedArtId')) delete route.selectedArtId;
    router.push({
      query: {
        ...route,
        page: 1,
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
