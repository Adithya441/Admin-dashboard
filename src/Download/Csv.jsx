export const exportDataToCSV = (transformedData , title) => {
  const csvRows = [
    [title],
    [],
    ['Year', 'Users Gained'],
    ...transformedData.map(({ year, usersGained }) => [year, usersGained])
  ];
  const csvContent = csvRows.map(row => row.join(",")).join("\n");
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${title}.csv`;
  link.click();
  URL.revokeObjectURL(url);
};                          