import { MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ActionCreator } from '../store/action';
import { RootState } from '../store';
import { cities } from '../const';

export function CitiesList() {
  const dispatch = useDispatch();
  const activeCity = useSelector((state: RootState) => state.city);

  const handleCityClick = (
    evt: MouseEvent<HTMLAnchorElement>,
    city: typeof cities[number]
  ) => {
    evt.preventDefault();
    dispatch(ActionCreator.changeCity(city));
  };

  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {cities.map((city) => (
          <li key={city} className="locations__item">
            <a
              className={`locations__item-link tabs__item ${
                city === activeCity ? 'tabs__item--active' : ''
              }`}
              href="/"
              onClick={(evt) => handleCityClick(evt, city)}
            >
              <span>{city}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
