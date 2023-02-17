import { Menu } from "antd"

const headerItems = [{
    key: "home",
    label: "Home"
}, {
    key: "brands",
    label: "Brands"
}, {
    key: "categories",
    label: "Categories"
}, {
    key: "shop",
    label: "Shop"
}]

const Header = () => {

    return <Menu items={headerItems} mode="horizontal" />
}

export default Header