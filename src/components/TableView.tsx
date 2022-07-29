interface TableViewProps {
  colNameList: any[];
  colItemList: any[];
  tableClassName?: string;
}

const TableView = (props: TableViewProps) => {
  const { colNameList, colItemList, tableClassName } = props || {};
  return (
    <table className={tableClassName}>
      <tr className="border-textGrey w-auto">
        {colNameList.map(({ item, className }: any) => (
          <th
            className={`border-2 border-btnPurple px-2 text-wrap w-auto ${className} overflow-scroll align-center`}
          >
            {item}
          </th>
        ))}
      </tr>
      {colItemList.map((rowItemList: string[]) => {
        if (rowItemList.length === 0) return;
        return (
          <tr className="w-auto">
            {rowItemList.map(({ type, item, className, contentView }: any) => {
              if (type === "button") {
                if (!item)
                  return <td className="border-2 border-btnPurple px-2" />;
                return (
                  <td
                    className={`border-2 border-btnPurple px-2 text-wrap ${className} w-auto overflow-scroll justify-center`}
                  >
                    {contentView}
                  </td>
                );
              }
              return (
                <td
                  className={`border-2 border-btnPurple px-2 text-wrap ${className} w-auto overflow-scroll justify-center`}
                >
                  {item || "-"}
                </td>
              );
            })}
          </tr>
        );
      })}
    </table>
  );
};

export default TableView;
