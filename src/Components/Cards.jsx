import React from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import '../Assets/css/Cards.css'

const Cards = () => {
	const cards = [
		{ id: 1, title: 'Card 1', content: 'Some content...' },
		{ id: 2, title: 'Card 2', content: 'Another content...' },
		{ id: 3, title: 'Card 3', content: 'More content...' },
	]
	return (
		<>
			<Container>
				<Row>
					{cards.map((card) => {
						return (
							<Col key={card.id} md={4} sm={6} xs={12}>
								<Card style={{ width: '25rem' }}>
									<Card.Body>
										<Card.Title>{card.title}</Card.Title>
										<Card.Text>{card.content}</Card.Text>
									</Card.Body>
								</Card>
							</Col>
						)
					})}
				</Row>
			</Container>
		</>
	)
}

export default Cards
