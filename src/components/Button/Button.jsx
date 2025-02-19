import { Link } from "react-router-dom";
import { Btn } from "./Styles";

/**
 * Componente de botão reutilizável.
 * Este componente renderiza um botão que pode ser utilizado tanto como um link de navegação quanto como um botão com ação de clique.
 *
 * @component Button
 * @param {Object} props - As props que o componente aceita.
 * @param {string} props.label - O texto a ser exibido no botão.
 * @param {string} [props.to] - O caminho para navegação quando o botão é um link (opcional).
 * @param {Function} [props.onClick] - A função a ser chamada quando o botão é clicado (opcional).
 * @returns {JSX.Element} O elemento Button.
 *
 * @example
 * // Botão como link
 * <Button label="Go to Home" to="/home" />
 *
 * @example
 * // Botão com ação de clique
 * <Button label="Click me" onClick={() => console.log('Button clicked')} />
 */
const Button = ({ label, to, onClick }) => {
  if (to) {
    return (
      <Btn>
        <Link to={to} className="btn">
          {label}
        </Link>
      </Btn>
    );
  }

  return (
    <Btn className="btn" onClick={onClick}>
      {label}
    </Btn>
  );
};

export default Button;
