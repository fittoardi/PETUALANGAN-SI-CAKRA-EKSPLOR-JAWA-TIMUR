import { useState, useEffect } from 'react';

export function useDrag(
  initialPosition: { x: number; y: number },
  onDrop: (position: { x: number; y: number }) => void,
  isDisabled: boolean = false
) {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (isDisabled) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - 48,
          y: e.clientY - 48,
        });
      }
    };

    const handleMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
        onDrop(position);
      }
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, position, onDrop, isDisabled]);

  const handleMouseDown = () => {
    if (!isDisabled) {
      setIsDragging(true);
    }
  };

  return { position, handleMouseDown };
}
