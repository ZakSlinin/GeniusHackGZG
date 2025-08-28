/**
 * Проверяет, является ли дата сегодняшней
 */
export const isToday = (dateString: string): boolean => {
  // Для формата "DD.MM.YYYY"
  const parts = dateString.split('.');
  if (parts.length === 3) {
    const eventDate = new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]));
    const today = new Date();
    
    return eventDate.toDateString() === today.toDateString();
  }
  
  // Для стандартного формата даты
  const eventDate = new Date(dateString);
  const today = new Date();
  
  return eventDate.toDateString() === today.toDateString();
};

/**
 * Проверяет, является ли пользователь координатором события
 */
export const isEventCoordinator = (
  userId: number, 
  eventCoordinatorId: number
): boolean => {
  return userId === eventCoordinatorId;
};

/**
 * Проверяет, можно ли показать страницу координатора
 */
export const canShowCoordinationPage = (
  userId: number,
  eventCoordinatorId: number,
  eventDate: string
): boolean => {
  return isEventCoordinator(userId, eventCoordinatorId) && isToday(eventDate);
};

/**
 * Форматирует время для отображения
 */
export const formatTime = (time: string): string => {
  return time;
};

/**
 * Форматирует дату для отображения
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString.split('.').reverse().join('-'));
  return date.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}; 