export function formatUnixTimestamp(timestamp) {
    const dateObj = new Date(timestamp);
  
    const formattedDate = dateObj.toLocaleString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
  
    return formattedDate;
}