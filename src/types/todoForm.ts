// TODO めちゃめちゃ細かいですが、type名はTODOで良いかと思います。
// TodoFormとすると、フォームの型なのかと誤解するかと！
// 今回はTodoオブジェクトの型だと思うのでTodoが最適ですね！
export type TodoForm = {
  id: string;
  title: string;
  detail: string;
  deadline: string;
  status: string;
};
