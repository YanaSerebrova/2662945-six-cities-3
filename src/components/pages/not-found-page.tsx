import { Header } from '../header';

export function NotFoundPage() {
  return (
    <div className="page page--gray page--login">
      <Header isAuthorized={false} />

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">404 Not Found</h1>
            <p>The page you are looking for does not exist.</p>
            <a className="login__submit form__submit button" href="/">
              Go to main page
            </a>
          </section>
        </div>
      </main>
    </div>
  );
}
