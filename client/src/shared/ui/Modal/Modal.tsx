import Modal from "react-bootstrap/Modal";
import { Button, Form } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../lib/ReduxHooks";
import {
  changePriority,
  changeDescription,
  changeModal,
  changeTitle,
  changeStatus,
  changeUser,
} from "../../../entities/issues/lib/issuesSlice";
import {
  addIssue,
  changeIssue,
} from "../../../entities/issues/lib/issuesThunk";

export default function ModalBoot({ open }: { open: boolean }) {
  const dispatch = useAppDispatch();
  const boards = useAppSelector((state) => state.boards.boards);
  const people = useAppSelector((state) => state.issues.people);
  const create = useAppSelector((store) => store.issues.create);
  const changeTask = useAppSelector((store) => store.issues.oneIssue);
  const newTaskHandler = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const { title, description, priority } = data;

    dispatch(
      addIssue({
        title,
        description,
        priority,
        boardId: Number(data.boardId),
        assigneeId: Number(data.assigneeId),
      })
    );
    e.target.reset();
    dispatch(changeModal());
  };

  function chageTaskHandler(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    dispatch(
      changeIssue({
        ...data,
        assigneeId: Number(data.assigneeId),
        taskId: changeTask?.id,
      })
    );
    e.target.reset();
    dispatch(changeModal());
  }

  return (
    <Modal show={open} centered>
      <Modal.Header closeButton onClick={() => dispatch(changeModal())}>
        <Modal.Title>
          {create ? "Создание задачи" : "Редактирование задачи"}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {create && (
          <Form onSubmit={newTaskHandler}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Название</Form.Label>
              <Form.Control
                name="title"
                type="text"
                placeholder="Название задачи"
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Описание</Form.Label>
              <Form.Control
                name="description"
                placeholder="Название задачи"
                as="textarea"
                rows={3}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Select name="boardId">
                <option value="">Проект</option>
                {boards.map((board) => (
                  <option key={board.id} value={board.id}>
                    {board.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Select name="priority">
                <option value="">Приоритет</option>
                {["High", "Medium", "Low"].map((el) => (
                  <option key={el} value={el}>
                    {el}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            {!create && (
              <Form.Group className="mb-3">
                <Form.Select name="status">
                  <option value="">Статус</option>
                  {["Backlog", "InProgress", "Done"].map((el) => (
                    <option key={el} value={el}>
                      {el}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            )}

            <Form.Group className="mb-3">
              <Form.Select name="assigneeId">
                <option value="">Исполнитель</option>
                {people.map((el) => (
                  <option key={el.id} value={el.id}>
                    {el.fullName}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Modal.Footer>
              <Button type="submit" variant="primary">
                {create ? "Создать" : "Обновить"}
              </Button>
            </Modal.Footer>
          </Form>
        )}

        {!create && (
          <Form onSubmit={chageTaskHandler}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Название</Form.Label>
              <Form.Control
                name="title"
                type="text"
                placeholder="Название задачи"
                value={changeTask?.title}
                onChange={(e) => dispatch(changeTitle(e.target.value))}
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Описание</Form.Label>
              <Form.Control
                name="description"
                placeholder="Название задачи"
                as="textarea"
                rows={3}
                value={changeTask?.description}
                onChange={(e) => dispatch(changeDescription(e.target.value))}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Select value={changeTask?.boardId} disabled name="boardId">
                <option value="">Проект</option>
                {boards.map((board) => (
                  <option key={board.id} value={board.id}>
                    {board.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Select
                value={changeTask?.priority}
                name="priority"
                onChange={(e) =>
                  dispatch(changePriority(String(e.target.value)))
                }
              >
                <option value="">Приоритет</option>
                {["High", "Medium", "Low"].map((el) => (
                  <option key={el} value={el}>
                    {el}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            {!create && (
              <Form.Group className="mb-3">
                <Form.Select
                  value={changeTask?.status}
                  name="status"
                  onChange={(e) =>
                    dispatch(changeStatus(String(e.target.value)))
                  }
                >
                  <option value="">Статус</option>
                  {["Backlog", "InProgress", "Done"].map((el) => (
                    <option key={el} value={el}>
                      {el}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            )}

            <Form.Group className="mb-3">
              <Form.Select
                value={changeTask?.assignee.id}
                name="assigneeId"
                onChange={(e) => dispatch(changeUser(Number(e.target.value)))}
              >
                <option value="">Исполнитель</option>
                {people.map((el) => (
                  <option key={el.id} value={el.id}>
                    {el.fullName}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Modal.Footer>
              <Button type="submit" variant="primary">
                {create ? "Создать" : "Обновить"}
              </Button>
            </Modal.Footer>
          </Form>
        )}
      </Modal.Body>
    </Modal>
  );
}
