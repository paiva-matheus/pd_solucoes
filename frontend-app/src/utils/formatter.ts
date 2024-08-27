export const averageFormatter = (average: number) => {
  return Math.round(average);
};

export const dateFormatter = (date: Date) => {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date);
};
