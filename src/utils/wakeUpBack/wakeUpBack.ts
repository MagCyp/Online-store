import axios from 'axios';

export const fetchData = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/reviews/best-rate`,
    );

    return response.data;
    // console.log('Response from API:', response.data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
