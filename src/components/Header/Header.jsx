import Navigation from "../Navigation/Navigation";
import SearchForm from "../SearchForm/SearchForm";
import "./Header.css";

export default function Header({
  onSearch,
  showSearch = true,
  isMain = true,
  onSignIn,
  onSignOut,
  isLoggedIn,
  user,
}) {
  const theme = isMain ? "home" : "saved";

  return (
    <header className={`header ${isMain ? "header__home" : "header__saved"}`}>
      <div className="header__container">
        <Navigation
          theme={theme}
          onSignIn={onSignIn}
          onSignOut={onSignOut}
          isLoggedIn={isLoggedIn}
          user={user}
        />

        {isMain && (
          <>
            <h1 className="header__title">
              What&apos;s going on in the world?
            </h1>
            <p className="header__caption">
              Find the latest news on any topic and save them in your personal
              account.
            </p>
            {showSearch && <SearchForm onSearch={onSearch} />}
          </>
        )}
      </div>
    </header>
  );
}
