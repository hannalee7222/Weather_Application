import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import MapView from './components/MapView';

const API_KEY = '66825f195d6f915bd99d3266cb47d937';

const Container = styled.div`
  padding: 2rem;
  font-family: 'Segoe UI', sans-serif;
  background: linear-gradient(to top, #a8edea, #2ea2aa);
  min-height: 100vh;
  color: #333;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2rem;
  color: #27598c;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  padding: 1rem;
  border-radius: 12px;
  background: #ffffffcc;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-5px);
  }

  p {
    margin: 0.5rem 0;
    font-size: 0.95rem;
  }

  .temp {
    font-size: 1.3rem;
    font-weight: bold;
    color: #e67e22;
  }

  .icon {
    font-size: 2rem;
  }
`;

const getEmoji = (main) => {
  switch (main) {
    case 'Clear':
      return '🌞';
    case 'Clouds':
      return '☁️';
    case 'Rain':
      return '☔️';
    case 'Drizzle':
      return '🌤️';
    case 'Thunderstorm':
      return '⛈️';
    case 'Snow':
      return '❄️';
    case 'Mist':
    case 'Smoke':
    case 'Haze':
    case 'Fog':
      return '🌫️';
    default:
      return '🌡️';
  }
};

const formatDateWithDay = (dateStr) => {
  const date = new Date(dateStr);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const weekday = date.toLocaleDateString('ko-KR', { weekday: 'short' });
  return `${month}월 ${day}일 (${weekday})`;
};

function App() {
  const [location, setLocation] = useState({ lat: null, lon: null });
  const [weatherList, setWeatherList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cityName, setCityName] = useState('');

  const fetchCityName = async (lat, lon) => {
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`
      );
      const koreanName = res.data[0]?.ko || res.data[0]?.name;
      setCityName(koreanName);
    } catch (err) {
      console.error('도시 이름 가져오기 실패', err);
    }
  };

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lon: longitude });
        },
        (err) => {
          setError('위치 정보를 가져올 수 없습니다: ' + err.message);
          setLoading(false);
        }
      );
    } else {
      setError('이 브라우저는 위치 정보를 지원하지 않습니다.');
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const fetchWeather = async () => {
      if (location.lat && location.lon) {
        try {
          const res = await axios.get(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${location.lat}&lon=${location.lon}&appid=${API_KEY}&units=metric&lang=kr`
          );
          const list = res.data.list;
          const daily = list.filter((item) => item.dt_txt.includes('12:00:00'));
          setWeatherList(daily.slice(0, 5));
        } catch (err) {
          console.error(err);
          setError('날씨 데이터를 불러오는 데 실패했습니다.');
        } finally {
          setLoading(false);
        }
      }
    };

    if (location.lat && location.lon) {
      fetchWeather();

      fetchCityName(location.lat, location.lon);
    }
  }, [location]);

  return (
    <Container>
      <Title>
        {' '}
        📍{' '}
        {cityName
          ? `${cityName}의 5일 동안의 날씨`
          : '내 위치 기반의 5일 동안의 날씨'}
      </Title>
      <MapView lat={location.lat} lon={location.lon} />
      {error ? (
        <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>
      ) : loading ? (
        <p>불러오는 중...</p>
      ) : (
        <CardGrid>
          {weatherList.map((item) => (
            <Card key={item.dt}>
              <p>{formatDateWithDay(item.dt_txt.split(' ')[0])}</p>
              <p>{item.weather[0].description}</p>
              <p className="icon">{getEmoji(item.weather[0].main)}</p>
              <p className="temp">{item.main.temp.toFixed(1)}°C</p>
            </Card>
          ))}
        </CardGrid>
      )}
    </Container>
  );
}

export default App;
