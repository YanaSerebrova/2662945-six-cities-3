import { FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Header } from '../header';
import { Link } from 'react-router-dom';
import { loginAction } from '../../store/action';
import { AppDispatch } from '../../store';
import { AppRoute } from '../../const';

export function LoginPage() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleFieldChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    dispatch(loginAction(formData)).then((response) => {
      if (response.meta.requestStatus === 'fulfilled') {
        navigate(AppRoute.Main);
      }
    });
  };

  return (
    <div className="page page--gray page--login">
      <Header isAuthorized={false} />

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" action="#" method="post" onSubmit={handleSubmit}>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden" htmlFor="email">
                  E-mail
                </label>
                <input
                  className="login__input form__input"
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  required
                  value={formData.email}
                  onChange={handleFieldChange}
                />
              </div>

              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden" htmlFor="password">
                  Password
                </label>
                <input
                  className="login__input form__input"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  required
                  value={formData.password}
                  onChange={handleFieldChange}
                  pattern="^.*\S+.*$"
                  title="Пароль не должен состоять только из пробелов"
                />
              </div>

              <button className="login__submit form__submit button" type="submit">
                Sign in
              </button>
            </form>
          </section>

          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link className="locations__item-link" to="/">
                <span>Amsterdam</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
