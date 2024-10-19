import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Path } from "react-router-dom";
interface Props {
  pages: number;
  page: number;
  search?: {
    param: string;
    value: string;
  } | null;
  children?: React.ReactNode;
}
const Paginate: React.FC<Props> = (props) => {
  const { pages, page, search } = props;

  return pages > 1 ? (
    <Pagination>
      {[...Array(pages).keys()].map((x) => {
        const url: Partial<Path> = {
          pathname: "",
          search: `?page=${x + 1}${
            search ? `&${search.param}=${search.value}` : ""
          }`,
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
