export const formatDate = (dateString: string): string =>
  new Date(dateString).toLocaleString('en-US', {
    month: 'long',
    year: 'numeric',
  });

export const formatDateTime = (dateString: string): string =>
  new Date(dateString).toISOString().slice(0, 10);

export const calculateRatingPercent = (rating: number): number =>
  Math.round(rating) * 20;
