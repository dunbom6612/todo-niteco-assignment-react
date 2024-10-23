import { STATUS } from '../../type';
import './todo-footer.scss';

const TodoFooter = ({
  activeQuantity,
  handleClickFilter,
  handleClearCompleted
}: {
  activeQuantity: number;

  handleClickFilter: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleClearCompleted: () => void;
}) => {
  return (
    <div className="todo-footer">
      <div className="todo-footer__first">{`${activeQuantity} ${
        activeQuantity > 1 ? 'items' : 'item'
      } left!`}</div>

      <div>
        <button
          className="todo-footer__button"
          data-value={'null'}
          onClick={handleClickFilter}
        >
          All
        </button>
        <button
          className="todo-footer__button"
          data-value={STATUS.ACTIVE}
          onClick={handleClickFilter}
        >
          Active
        </button>
        <button
          className="todo-footer__button"
          data-value={STATUS.COMPLETE}
          onClick={handleClickFilter}
        >
          Complete
        </button>
      </div>
      <button
        className="todo-footer__button--clear"
        onClick={handleClearCompleted}
      >
        Clear completed
      </button>
    </div>
  );
};

export default TodoFooter;
