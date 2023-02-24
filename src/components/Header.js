import { Badge, Button, Container, Dropdown, FormControl, Nav, Navbar } from "react-bootstrap";
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";
import { IoCartSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { CartState } from "../context/Context";
import { AiFillDelete } from "react-icons/ai";

const Header = () => {

    const {
        state: { cart },
        dispatch, filterDispatch
    } = CartState()

    return (
        <Navbar bg="dark" variant="dark" style={{ height: 80 }}>
            <Container>
                <Navbar.Brand>
                    <Link to="/" style={{ color: 'white' }}>Home</Link>
                </Navbar.Brand>
                <Navbar.Text className="search">
                    <FormControl
                        style={{ width: 500 }}
                        placeholder='Search for a product'
                        className="m-auto"
                        onChange={(e) => {
                            filterDispatch({
                                type: "FILTER_BY_SEARCH",
                                payload: e.target.value
                            })
                        }}
                    />
                </Navbar.Text>
                <Nav>
                    <Dropdown >
                        <Dropdown.Toggle variant="success">
                            <IoCartSharp color='white' fontSize="30px" />
                            <Badge bg="none">{cart.length}</Badge>
                        </Dropdown.Toggle>
                        <DropdownMenu className="dropdown-menu-end" style={{ minWidth: 370 }}>
                            {cart.length > 0 ? (
                                <>
                                    {cart.map((item) => (
                                        <span className="cartItem" key={item}>
                                            <img
                                                src={item.image}
                                                className="cartItemImage"
                                                alt={item.name}
                                            />
                                            <div className="cartItemDetail">
                                                <span>{item.name}</span>
                                                <span>£ {item.price.split('.')[0]}</span>
                                            </div>
                                            <AiFillDelete
                                                fontSize="20px"
                                                style={{ cursor: "pointer" }}
                                                onClick={() => {
                                                    dispatch({
                                                        type: "REMOVE_FROM_CART",
                                                        payload: item
                                                    })
                                                }}
                                            />
                                        </span>
                                    ))}
                                    <Link to='/cart' >
                                        <Button style={{width: '95%', margin: '0 9px'}}>Go To Cart</Button>
                                    </Link>

                                </>

                            ) : (
                                <span style={{ padding: 10 }}>Cart is Empty!</span>
                            )}

                        </DropdownMenu>
                    </Dropdown>
                </Nav>

            </Container>
        </Navbar>
    )
}

export default Header