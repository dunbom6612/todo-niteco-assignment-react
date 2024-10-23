import { useCallback, useState } from 'react';
import './app.scss';
import TodoItem from './components/TodoItem/TodoItem';
import { STATUS } from './type';
import TodoFooter from './components/TodoFooter/TodoFooter';

function App() {
  const [todoList, setTodoList] = useState<
    { id: string; name: string; status: STATUS }[]
  >([]);

  const [filterStatus, setFilterStatus] = useState<STATUS | null>(null);

  const activeItems = todoList.filter((item) => item.status === STATUS.ACTIVE);

  const activeQuantity = activeItems.length;

  const handleClickFilter = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const value = e.currentTarget.getAttribute('data-value');
      if (value === 'null') {
        setFilterStatus(null);
      } else {
        setFilterStatus(value as STATUS);
      }
    },
    []
  );

  const handleEditTodoItem = useCallback(
    (id: string, value: boolean | string, fieldName: 'name' | 'status') => {
      const updateItemIdx = todoList.findIndex((todo) => todo.id === id);
      if (updateItemIdx === -1) return;
      let updatedValue = value;
      if (fieldName === 'status') {
        // eslint-disable-next-line no-extra-boolean-cast
        updatedValue = Boolean(value) ? STATUS.COMPLETE : STATUS.ACTIVE;
      }
      const updatedItem = {
        ...todoList[updateItemIdx],
        [fieldName]: updatedValue
      };
      setTodoList([
        ...todoList.slice(0, updateItemIdx),
        updatedItem,
        ...todoList.slice(updateItemIdx + 1)
      ]);
    },
    [todoList]
  );
  const handleRemoveItem = useCallback(
    (id: string) => {
      const updateItemIdx = todoList.findIndex((todo) => todo.id === id);
      if (updateItemIdx === -1) return;

      setTodoList([
        ...todoList.slice(0, updateItemIdx),
        ...todoList.slice(updateItemIdx + 1)
      ]);
    },
    [todoList]
  );

  const handleClearCompleted = () => {
    setTodoList(activeItems);
  };

  const getDisplayList = () => {
    if (filterStatus === STATUS.COMPLETE)
      return todoList?.filter((todo) => todo.status === STATUS.COMPLETE);
    if (filterStatus === STATUS.ACTIVE) {
      return activeItems;
    }
    return todoList;
  };

  return (
    <div className="todo">
      <div className="todo-input">
        <button
          className="todo-input__button"
          onClick={() => {
            const shouldMarkComplete = activeQuantity > 0;

            setTodoList(
              todoList?.map((todo) => {
                return {
                  ...todo,
                  status: shouldMarkComplete ? STATUS.COMPLETE : STATUS.ACTIVE
                };
              })
            );
          }}
        />
        <input
          className="todo-input__input"
          placeholder="What needs to be done?"
          onKeyDown={(e) => {
            if (e.key !== 'Enter') return;

            const value = e.currentTarget.value.trim();
            if (value.length < 2 || !value) return;
            setTodoList([
              ...todoList,
              { id: Date.now().toString(), name: value, status: STATUS.ACTIVE }
            ]);
            e.currentTarget.value = '';
          }}
        />
      </div>
      {getDisplayList().length > 0 && (
        <ul className="todo-list">
          {getDisplayList()?.map((todo) => (
            <TodoItem
              key={todo.id}
              id={todo.id}
              value={todo.name}
              isCompleted={todo.status}
              handleEditTodoItem={handleEditTodoItem}
              handleRemoveItem={handleRemoveItem}
            />
          ))}
        </ul>
      )}

      <TodoFooter
        handleClearCompleted={handleClearCompleted}
        handleClickFilter={handleClickFilter}
        activeQuantity={activeQuantity}
      />
    </div>
  );
}

export default App;
