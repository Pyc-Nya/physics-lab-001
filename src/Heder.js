export function Header() {
    return (
        <div className="header">
          <p className="header__title">
            Калькулятор для косвенных погрешностей выборочным методом
          </p>
          <p className="header__message">
            ОБЯЗАТЕЛЬНО следовать инструкции при использовании калькулятора.
          </p>
          <a href="/" className="manual">
            Инструкция
          </a>
        </div>
    )
}