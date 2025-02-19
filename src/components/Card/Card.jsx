import { CardBody, CardHeader, Container, Icon, Title } from "./Styles";

/**
 * Componente de card reutilizável.
 * Este componente exibe um card com um título, ícone e conteúdo personalizável.
 *
 * @component Card
 * @param {Object} props - As props que o componente aceita.
 * @param {string} props.title - O título a ser exibido no cabeçalho do card.
 * @param {string} props.icon - A classe do ícone (geralmente uma classe do FontAwesome ou similar) a ser exibido no cabeçalho do card.
 * @param {React.ReactNode} props.children - O conteúdo a ser exibido no corpo do card.
 * @returns {JSX.Element} O elemento Card.
 *
 * @example
 * // Card com título e ícone
 * <Card title="Card Title" icon="icon-class">
 *   <p>Este é o conteúdo do card.</p>
 * </Card>
 */
const Card = ({ title, icon, children }) => {
  return (
    <Container>
      <CardHeader>
        <Title>{title}</Title>
        <Icon className={icon} />
      </CardHeader>
      <CardBody>{children}</CardBody>
    </Container>
  );
};

export default Card;
