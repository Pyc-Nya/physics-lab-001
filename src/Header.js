export function Header({isOpen, setIsOpen}) {
    return (
        <div className="header">
          <p className="header__title">
            Калькулятор для косвенных погрешностей выборочным методом
          </p>
          <p className="header__message">
            ОБЯЗАТЕЛЬНО следовать инструкции при использовании калькулятора.
          </p>
          <p className="manual" onClick={() => setIsOpen(!isOpen)}>
            Инструкция
          </p>
        </div>
    )
}