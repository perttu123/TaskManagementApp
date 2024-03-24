import Pagination from 'react-bootstrap/Pagination';

interface PageChangeProps {
  taskCount: number;
  pageIndex: (index: number) => void;
}

function PageChange({taskCount, pageIndex}:PageChangeProps) {

  return (
    <Pagination>

      <Pagination.Prev onClick={()=>pageIndex(prev=>prev>0?prev-1:prev)}/>
      <Pagination.Item onClick={()=>pageIndex(0)}>1</Pagination.Item>
      <Pagination.Ellipsis />
      <Pagination.Item onClick={()=>pageIndex((taskCount/6).toPrecision(1))}>{(taskCount/6).toPrecision(1)}</Pagination.Item> 
      <Pagination.Next onClick={()=>pageIndex(prev=>prev<(taskCount/6).toPrecision(1) ? prev+1:prev)}/>

    </Pagination>
  );
}

export default PageChange;