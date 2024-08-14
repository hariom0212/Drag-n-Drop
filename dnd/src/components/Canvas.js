import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import Modal from 'react-modal';
import Arrow from 'react-arrow';
import Card from './Card';  // Import the Card component
import { ItemTypes } from '../constants/ItemTypes';

export default function Canvas() {
  const [cards, setCards] = useState([]);
  const [modalContent, setModalContent] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [, drop] = useDrop({
    accept: ItemTypes.CARD,
    drop: (item, monitor) => {
      const delta = monitor.getDifferenceFromInitialOffset();
      const left = Math.round(item.left + delta.x);
      const top = Math.round(item.top + delta.y);
      moveCard(item.id, left, top);
    },
  });

  const addCard = () => {
    const id = cards.length + 1;
    setCards([
      ...cards,
      { id, text: "Dummy text for card " + id, left: 100, top: 100 },
    ]);
  };

  const moveCard = (id, left, top) => {
    setCards(
      cards.map((card) => (card.id === id ? { ...card, left, top } : card))
    );
  };

  const openModal = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <button onClick={addCard}>Add Card</button>
      <div
        ref={drop} // Ensure this ref is attached to a DOM element
        style={{ width: "100vw", height: "100vh", position: "relative", overflow: "scroll" }}
      >
        {cards.map((card) => (
          <Card
            key={card.id}
            id={card.id}
            text={card.text}
            left={card.left}
            top={card.top}
            moveCard={moveCard}
            openModal={openModal}
          />
        ))}
        {/* Example of connecting two cards with an arrow */}
        {cards.length > 1 && (
          <Arrow
            angle={45}
            length={100}
            color="black"
            style={{
              position: "absolute",
              left: cards[0].left + 100,
              top: cards[0].top + 50,
            }}
          />
        )}
      </div>
      <Modal isOpen={isModalOpen} onRequestClose={closeModal}>
        <h2>Card Details</h2>
        <p>{modalContent}</p>
        <button onClick={closeModal}>Close</button>
      </Modal>
    </div>
  );
}
