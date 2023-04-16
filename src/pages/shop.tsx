import Product from "@/components/product";
import { ShopSidebar } from "@/components/sidebar";
import { Col, Pagination, Row } from "antd";
import { GetServerSideProps } from "next";
import Head from "next/head";
import useQueryParam from "@/hooks/useQueryParam";
import clientPromise from "@/lib/mongodb";
import {
  ProductProps,
  ProductsWithMetadata,
  getProducts,
} from "@/lib/api/product";
import { BrandProps, getAllBrands } from "@/lib/api/brand";

type sidebarOptionProps = {
  key: string;
  label: string;
  value: string;
};

export type sidebarItemProps = {
  key: string;
  label: string;
  type: "checkbox" | "radio";
  slug: string;
  options: Array<sidebarOptionProps>;
};

const SidebarItems = {
  sizes: {
    key: "size",
    label: "Sizes",
    type: "radio",
    slug: "sizes",
    options: [
      {
        key: "30.0",
        label: "30.0",
        value: "30.0",
      },
      {
        key: "30.5",
        label: "30.5",
        value: "30.5",
      },
      {
        key: "31.0",
        label: "31.0",
        value: "31.0",
      },
      {
        key: "31.5",
        label: "31.5",
        value: "31.5",
      },
      {
        key: "32.0",
        label: "32.0",
        value: "32.0",
      },
      {
        key: "32.5",
        label: "32.5",
        value: "32.5",
      },
      {
        key: "33.0",
        label: "33.0",
        value: "33.0",
      },
      {
        key: "33.5",
        label: "33.5",
        value: "33.5",
      },
      {
        key: "34.0",
        label: "34.0",
        value: "34.0",
      },
      {
        key: "34.5",
        label: "34.5",
        value: "34.5",
      },
      {
        key: "35.0",
        label: "35.0",
        value: "35.0",
      },
      {
        key: "35.5",
        label: "35.5",
        value: "35.5",
      },
    ],
  } as sidebarItemProps,
  priceRange: {
    key: "priceRange",
    label: "Price Range",
    type: "radio",
    slug: "range",
    options: [
      {
        key: "1",
        label: "Less than 1.000.000",
        value: "1",
      },
      {
        key: "2",
        label: "1.000.000 - 3.000.000",
        value: "2",
      },
      {
        key: "3",
        label: "3.000.000 - 7.000.000",
        value: "3",
      },
      {
        key: "4",
        label: "7.000.000 - 15.000.000",
        value: "4",
      },
      {
        key: "5",
        label: "More than 15.000.000",
        value: "5",
      },
    ],
  } as sidebarItemProps,
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    await clientPromise;
  } catch (err) {}
  const queryParams = Object.keys(context.query).reduce((cur, key) => {
    let queryKeys = (context.query[key] as string).split(",");
    context.query[key] = queryKeys;
    return {
      ...cur,
      [key]: queryKeys,
    };
  }, {});

  const products = await getProducts(queryParams);
  const brands = await getAllBrands();
  console.log(products);
  return {
    props: {
      products: products.data,
      brands: JSON.parse(JSON.stringify(brands)),
      metadata: products.metadata,
    },
  };
};

interface ShopProps extends Pick<ProductsWithMetadata, "metadata"> {
  products: ProductProps[];
  brands: BrandProps[];
}

export default function Shop<NextPage>({
  products,
  brands,
  metadata,
  ...props
}: ShopProps) {
  const { router, pathname, searchParams, createQueryString } = useQueryParam();
  const brandSidebarItems: sidebarItemProps = {
    key: "brands",
    label: "Brands",
    slug: "brands",
    type: "radio",
    options: brands.map((brand) => ({
      key: brand.slug,
      label: brand.name,
      value: brand.slug,
    })),
  };

  return (
    <>
      <Head>
        <title>Sneaker Store - Shop</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/main-logo.jpg" />
      </Head>
      <main>
        <Row gutter={16}>
          <Col span={4}>
            <ShopSidebar
              brands={brandSidebarItems}
              sizes={SidebarItems.sizes}
              priceRange={SidebarItems.priceRange}
            />
          </Col>
          <Col span={20}>
            <Row gutter={16}>
              {products.map((product) => (
                <Col key={product.modelId} span={6}>
                  <Product {...product} />
                </Col>
              ))}
            </Row>
            <Row className="mt-20">
              <Col span={24} className="flex justify-center">
                <Pagination
                  showSizeChanger={false}
                  defaultCurrent={1}
                  current={metadata[0].page}
                  total={metadata[0].total}
                  pageSize={metadata[0].pageSize}
                  onChange={(page) =>
                    router.push(
                      pathname +
                        "?" +
                        createQueryString("page", page.toString())
                    )
                  }
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </main>
    </>
  );
}
