import Pagination from 'react-bootstrap/Pagination';
 

interface PageChangeProps {
  pageIndex: (index: number) => void;
}

function PageChange({pageIndex}:PageChangeProps) {
  
  return (<>
    <Pagination size='lg'>
      <Pagination.Prev onClick={() => pageIndex(prev => prev > 0 ? prev - 1 : prev)}/>
      <Pagination.Ellipsis />
      <Pagination.Next onClick={() => pageIndex(prev => prev < 1 ? prev + 1 : prev)}/>
    </Pagination>

    </>
  );
}

export default PageChange;