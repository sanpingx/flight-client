import { useTable } from 'react-table';

interface TableFieldProps {
  columns: any[];
  data: any[];
}

const Table: React.FC<TableFieldProps> = ({ columns, data, ...props }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });

  // console.log(getTableProps);
  // console.log(getTableBodyProps);
  // console.log(headerGroups);
  // console.log(rows);
  // console.log(prepareRow);
  return (
    <div className="flex flex-col gap-2">
      <table {...getTableProps()} style={{ borderCollapse: 'separate', borderSpacing: '0 10px' }}>
        <thead style={{ borderCollapse: 'collapse', border: '1px solid grey', padding: '10px' }}>
          {headerGroups.map((headerGroup: any) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column: any) => (
                <th
                  {...column.getHeaderProps()}
                  style={{ borderBottom: '2px solid black', padding: '8px' }}
                >
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row: any, i: number) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                style={{ backgroundColor: i % 2 === 0 ? '#f3f3f3' : 'white' }}
                // style={{ borderBottom: '1px solid grey'}}
                // style={{ backgroundColor: i % 2 === 0 ? '#f2f2f2' : 'white' }}
              >
                {row.cells.map((cell: any) => (
                  <td
                    {...cell.getCellProps()}

                    // style={{ borderRight: 'none' }}
                  >
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
