import { useEffect, useRef, useState } from 'react';
import './todo-item.scss';
import { STATUS } from '../../type';

const TodoInput = (props: React.HTMLProps<HTMLInputElement>) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!inputRef.current) return;
    inputRef.current.focus();
  }, []);

  return <input ref={inputRef} {...props} />;
};

const TodoItem = ({
  value,
  isCompleted,
  id,
  handleEditTodoItem,
  handleRemoveItem
}: {
  id: string;
  value: string;
  isCompleted: STATUS;
  handleEditTodoItem: (
    id: string,
    value: boolean | string,
    fieldName: 'name' | 'status'
  ) => void;
  handleRemoveItem: (id: string) => void;
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  return (
    <li className="todo-item">
      {!isEdit ? (
        <>
          <input
            type="checkbox"
            className="todo-item__checkbox-hidden"
            id={`todo-item__checkbox-${id}`}
            name="todo-item__checkbox"
            aria-label="todo-item__checkbox"
            checked={isCompleted === STATUS.COMPLETE}
            onChange={(e) => {
              const checked = e.target.checked;
              handleEditTodoItem(id, checked, 'status');
            }}
          />
          <label
            htmlFor={`todo-item__checkbox-${id}`}
            className="todo-item__checkbox-visible"
          ></label>

          <div
            className="todo-item__text"
            onDoubleClick={() => {
              setIsEdit(true);
            }}
          >
            {inputValue}
          </div>
          <button
            className="todo-item__close-button"
            onClick={() => handleRemoveItem(id)}
          ></button>
        </>
      ) : (
        <TodoInput
          className="todo-item__text todo-item__text--edit"
          defaultValue={value}
          onBlur={(e) => {
            const value = e.target.value;
            if (value.length > 1) {
              setInputValue(value);
              handleEditTodoItem(id, value, 'name');
            }

            setIsEdit(false);
          }}
          onKeyDown={(e) => {
            if (e.key !== 'Enter') return;
            const value = e.currentTarget.value;
            if (value.length > 1) {
              setInputValue(value);
              handleEditTodoItem(id, value, 'name');

              setIsEdit(false);
            }
          }}
        />
      )}
    </li>
  );
};

export default TodoItem;
