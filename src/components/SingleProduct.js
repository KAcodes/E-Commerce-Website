import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { CartState } from '../context/Context';
import Ratings from "./Ratings"

const SingleProduct = ({item}) => {

  const {
    state: {cart},
    dispatch,
  } = CartState()

  return  <div className="products">
            <Card>
              <Card.Img variant="top" src={item.image}/>
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Subtitle style={{paddingBottom: 10}}>
                  <span>{"£" + item.price.split('.')[0]}</span>
                  {item.fastDelivery ? (
                    <div>Fast Delivery</div>
                  ) : (
                    <div>4-5 days delivery</div>
                  )}
                  <Ratings rating={item.ratings}/> 
                </Card.Subtitle>
                {
                  cart.some(product => product.id === item.id) ? (
                    <Button  
                      variant="danger"
                      onClick={() => {
                        dispatch({
                          type: "REMOVE_FROM_CART",
                          payload: item
                        })
                      }}
                    >Remove from cart</Button>
                  ) : (
                    <Button onClick={() => {
                      dispatch({
                        type: "ADD_TO_CART",
                        payload: item
                      })
                    }} disabled={!item.inStock}>
                      {!item.inStock ? "Out of Stock" : "Add to cart"}
                    </Button>
                  )
                }
                
                
              </Card.Body>
            </Card>
          </div>
        
}

export default SingleProduct