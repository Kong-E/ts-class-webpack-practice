// Drag & Drop Interfaces
namespace App {
  export interface Draggable {
    dragStartHandler(event: DragEvent): void;
    dragEndHandler(event: DragEvent): void;
  }

  export interface DragTarget {
    dragOverHandler(event: DragEvent): void; // 드래그 중에 드래그 대상 위에 있을 때
    dropHandler(event: DragEvent): void; // 드래그 중에 드롭할 때
    dragLeaveHandler(event: DragEvent): void; // 드래그 중에 드래그 대상을 벗어났을 때
  }
}
