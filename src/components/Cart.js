import React, { useState, useEffect } from 'react';
import { CartState } from '../context/Context.js';
import { Button, ListGroup, ListGroupItem, Row, Col, Form, Image } from 'react-bootstrap';
import Ratings from './Ratings';
import { AiFillDelete } from "react-icons/ai";

const Cart = () => {

  const {
    state: { cart },
    dispatch,
} = CartState()

const [total, setTotal] = useState();

useEffect(() => {
  setTotal(cart.reduce((a,b) => a + Number(b.price) * b.qty, 0));
}, [cart])


  return (
    <div className='home'>
      <div className='productContainer'>
        <ListGroup>
          {cart.map((item) => (
            <ListGroupItem key={item.id}>
              <Row>
                <Col>
                  <Image 
                  src={item.image}
                  alt={item.name}
                  fluid
                  rounded/>
                </Col>
                <Col md={2}><span>{item.name}</span></Col>
                <Col md={2}>£{item.price}</Col>
                <Col md={2}>
                  <Ratings rating={item.ratings}></Ratings>
                </Col>
                <Col>
                  <Form.Control 
                    as='select' 
                    value={item.qty}
                    onChange={(e) => {
                      dispatch({
                        type: "CHANGE_CART_QTY",
                        payload: {
                          id: item.id,
                          qty: e.target.value
                        }
                    })
                    }}
                    >
                    {[...Array(item.inStock).keys()].map((num) => (
                      <option key={num + 1}>{num + 1}</option>
                    ))}
                  </Form.Control>
                </Col>
                <Col>
                  <Button
                    type='button'
                    variant='light'
                    onClick={() => {
                      dispatch({
                          type: "REMOVE_FROM_CART",
                          payload: item
                      })
                  }}>
                    <AiFillDelete
                        fontSize="20px"
                        style={{ cursor: "pointer" }}
                    />
                  </Button>
                </Col>
              </Row>
            </ListGroupItem>
              
          ))}
        </ListGroup>
      </div>
      <div className='filters summary'>
            <span className='title'>Subtotal {cart.length} items</span>
            <span>Total: £{total}</span>
            <Button>Proceed to Checkout</Button>
      </div>
    </div>
  )
}

export default Cart