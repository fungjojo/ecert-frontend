interface TableViewProps {
  colNameList: string[];
  colItemList: string[][];
}

const TableView = (props: TableViewProps) => {
  const { colNameList, colItemList } = props || {};
  return (
    <table>
      <tr className=" border-textGrey">
        {colNameList.map((colName: string) => (
          <th className="border-2 border-btnPurple px-8">{colName}</th>
        ))}
      </tr>
      {colItemList.map((rowItemList: string[]) => {
        if (rowItemList.length === 0) return;
        return (
          <tr>
            {rowItemList.map((rowItem: string) => (
              <td className="border-2 border-btnPurple px-8">
                {rowItem || "-"}
              </td>
            ))}
          </tr>
        );
      })}
    </table>
  );
};

export default TableView;
