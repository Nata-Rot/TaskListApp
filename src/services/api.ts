import { ListItem } from '../types';

const API_URL = 'https://6172cfe5110a740017222e2b.mockapi.io/elements';

export const fetchListData = async (): Promise<ListItem[]> => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching list data:', error);
    throw error;
  }
};