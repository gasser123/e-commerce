import { Helmet } from "react-helmet-async";
interface Props {
  title?: string;
  description?: string;
  keywords?: string;
}
const Meta: React.FC<Props> = ({
  title = "Welcome to MyShop",
  description = "Best products for best prices",
  keywords = "products, electronics, fashion",
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Helmet>
  );
};

export default Meta;
