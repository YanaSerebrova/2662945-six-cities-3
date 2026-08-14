import { useDispatch, useSelector } from 'react-redux';
import { ActionCreator } from '../store/action';
import { RootState } from '../store';
import { cities } from '../const';

export function CitiesList() {
  const dispatch = useDispatch();
  const activeCity = useSelector((state: RootState) => state.city);

  const handleCityClick = (city: typeof cities[number]) => {
    dispatch(ActionCreator.changeCity(city));
  };

  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {cities.map((city) => (
          <li key={city} className="locations__item">
            <button
              className={`locations__item-link tabs__item ${
                city === activeCity ? 'tabs__item--active' : ''
              }`}
              onClick={() => handleCityClick(city)}
              type="button"
            >
              <span>{city}</span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
