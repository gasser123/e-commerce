import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Path } from "react-router-dom";
interface Props {
  pages: number;
  page: number;
  children?: React.ReactNode;
}
const Paginate: React.FC<Props> = (props) => {
  const { pages, page } = props;

  return pages > 1 ? (
    <Pagination>
      {[...Array(pages).keys()].map((x) => {
        const url: Partial<Path> = {
          pathname: "",
          search: `?page=${x + 1}`,
        };

        return (
          <LinkContainer to={url} key={x + 1}>
            <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
          </LinkContainer>
        );
      })}
    </Pagination>
  ) : null;
};

export default Paginate;
