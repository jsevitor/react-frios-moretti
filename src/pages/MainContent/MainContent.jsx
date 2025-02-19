import Routes from "../../Routes";
import { FormProvider } from "../../contexts/FormContext";
import { Container } from "./Styles";

/**
 * Componente principal que envolve as rotas da aplicação dentro do FormProvider.
 *
 * @component MainContent
 * @param {Object} props - Propriedades do componente.
 * @param {boolean} props.menuCollapsed - Indica se o menu está colapsado.
 * @returns {JSX.Element} o elemento MainContent.
 * @example
 * <MainContent menuCollapsed={false} />
 */
const MainContent = ({ menuCollapsed }) => {
  return (
    <Container collapsed={menuCollapsed}>
      {/* Provedor de contexto para formulários */}
      <FormProvider>
        <Routes />
      </FormProvider>
    </Container>
  );
};

export default MainContent;
