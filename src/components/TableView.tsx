interface TableViewProps {
  colNameList: string[];
  colItemList: string[][];
}

const TableView = (props: TableViewProps) => {
  const { colNameList, colItemList } = props || {};
  return (
    <table className="">
      <tr className="border-textGrey w-9">
        {colNameList.map((colName: string) => (
          <th className="border-2 border-btnPurple px-8 w-9">{colName}</th>
        ))}
      </tr>
      {colItemList.map((rowItemList: string[]) => {
        if (rowItemList.length === 0) return;
        return (
          <tr className="w-9">
            {rowItemList.map((rowItem: string) => (
              <td className="w-9 border-2 border-btnPurple px-8">
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
