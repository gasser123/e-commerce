import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Product } from "../../schemas/Product.schema";
import { useDeleteProductMutation } from "../../app/features/productsApiEndpoints";
import { toast } from "react-toastify";
import {
  isCustomErrorResponse,
  isFetchBaseQueryError,
} from "../../util/validate-error-type";
interface Props {
  products: Product[];
  children?: React.ReactNode;
  setLoadingDeleteState: (value: boolean) => void;
}
const AdminProductsList: React.FC<Props> = (props) => {
  const { products, setLoadingDeleteState } = props;
  const [deleteProduct] = useDeleteProductMutation();
  const deleteHandler = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setLoadingDeleteState(true);
      try {
        await deleteProduct(id).unwrap();
        toast.success("product deleted successfully");
        setLoadingDeleteState(false);
      } catch (error) {
        if (isFetchBaseQueryError(error)) {
          const { data } = error;
          if (isCustomErrorResponse(data)) {
            if (typeof data.message === "string") {
              toast.error(data.message);
            } else {
              data.message.forEach((element) => toast.error(element));
            }
          }
        } else if (error instanceof Error) {
          toast.error(error.message);
        }
        setLoadingDeleteState(false);
      }
    }
  };
  return (
    <>
      <Table striped hover responsive className="table-sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>PRICE</th>
            <th>CATEGORY</th>
            <th>BRAND</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>${product.price}</td>
              <td>{product.category}</td>
              <td>{product.brand}</td>
              <td>
                <LinkContainer to={`/admin/products/${product.id}/edit`}>
                  <Button variant="light" className="btn-sm mx-2">
                    <FaEdit />
                  </Button>
                </LinkContainer>
                <Button
                  variant="danger"
                  className="btn-sm"
                  onClick={() => {
                    deleteHandler(product.id);
                  }}
                >
                  <FaTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default AdminProductsList;
