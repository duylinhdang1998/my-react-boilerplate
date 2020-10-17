import watchIncrementAsync from './watchCounterSlice';
import watchGetTodoList from './watchTodoList';

const sagasHome = [watchIncrementAsync, watchGetTodoList];

export default sagasHome;
