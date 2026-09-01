export const formatDate = (dateString: string): string =>
  new Date(dateString).toLocaleString('en-US', {
    month: 'long',
    year: 'numeric',
  });

export const formatDateTime = (dateString: string): string =>
  new Date(dateString).toISOString().slice(0, 10);

export const calculateRatingPercent = (rating: number): number =>
  Math.round(rating) * 20;

export const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export const getBedroomsText = (count: number) =>
  count === 1 ? `${count} Bedroom` : `${count} Bedrooms`;

export const getAdultsText = (count: number) =>
  count === 1 ? `Max ${count} adult` : `Max ${count} adults`;
