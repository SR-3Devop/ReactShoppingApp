import React,{useState,useEffect} from 'react'
import {Container,Col,Row} from 'reactstrap'
import {random,commerce} from 'faker'
import Axios from 'axios'
import CardItem from './CradItem'

const apikey = "563492ad6f9170000100000190d90945632944079b42e5f8849dfd3d"

const url = "https://api.pexels.com/v1/search?query=laptop&per_page=6&page=1"

// const localurl = "https://jsonkeeper.com/b/72GN"

const BuyPage = ({addToCart}) => {
const [product,setProduct] = useState([])
const fetchPhotos = async () => {
    const {data} = await Axios.get(url,{
        headers:{
            Authorization:apikey
        }
    })


    const {photos} = data
    const allProducts = photos.map(photo => ({
        smallImage:photo.src.medium,
        tinyImage:photo.src.tiny,
        productName: random.word(),
        productPrice:commerce.price(),
        id:random.uuid()
    }))



    setProduct(allProducts);
}


    useEffect(() => {
        fetchPhotos()
    },[])


    return (
    <Container fluid>
        <h1 className="text-success text-center">Buy Page</h1>
        
        <Row>
            {product.map(product =>(
                <Col md={4} key={product.id}>
                    <CardItem product={product} addToCart={addToCart}/>
                </Col>
            ))}
        </Row>
    </Container>
    )
}

export default BuyPage
