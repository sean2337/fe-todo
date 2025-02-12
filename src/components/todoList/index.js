import todoItem from "../todoItem";
import { todoListTemplate } from "./template";
import { applyDragAndDrop } from "../../utils/dragAndDrop";

export default function todoList(parent, props) {
  parent.innerHTML = todoListTemplate(props);

  const newItemContainer = parent.querySelector(
    '[todo-data="newItemContainer"]'
  );

  //행 하나에 item으로 컴포넌트를 만들어서 마운트
  const itemsContainer = parent.querySelector(`[todo-data="items"]`);

  const onAddItem = (isNew, item) => {
    const todoItemWrapper = document.createElement("div");
    todoItemWrapper.setAttribute("todo-data", "todoItem");
    todoItemWrapper.setAttribute("draggable", "true");
    todoItemWrapper.setAttribute("value", item.id);
    todoItemWrapper.id = item.title;

    todoItem(todoItemWrapper, {
      todoColTitle: props.title,
      item,
    });
    if (isNew) {
      // 새로운 아이템 등록 및 추가
      const referenceNode = newItemContainer.nextSibling;
      itemsContainer.insertBefore(todoItemWrapper, referenceNode);
      newItemContainer.style.display = "none";

      const draggables = parent.querySelectorAll('[todo-data="todoItem"]');
      const containers = parent.querySelectorAll("[todo-data='items']");
      applyDragAndDrop(draggables, containers);
    } else {
      // 초기 데이터의 아이템 렌더시 사용
      itemsContainer.appendChild(todoItemWrapper);
    }
  };

  for (const item of props.items) {
    onAddItem(false, item);
  }

  //추가 컴포넌트 등장 이벤트 추가
  const plusBtn = parent.querySelector('[todo-data="plusBtn"]');
  plusBtn.addEventListener("click", () => {
    if (newItemContainer.style.display === "none") {
      todoItem(newItemContainer, {
        todoColTitle: props.title,
        addMode: true,
        onCancel: () => {
          newItemContainer.style.display = "none";
        },
        onAddItem,
      });
    }
    newItemContainer.style.display =
      newItemContainer.style.display === "block" ? "none" : "block";
  });
}
