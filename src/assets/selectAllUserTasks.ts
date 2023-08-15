import database from "../database/conection";

const selectAllUserTaks = async (
  userId: string,
  page: number,
  limit: number
) => {
  const result = await database
    .query("tasks")
    .filter("userId", "==", userId)
    .skip((page - 1) * limit)
    .take(limit)
    .get();

  const tasks = result.map((task) => ({
    id: task.key,
    ...task.val(),
  }));

  return tasks;
};

export default selectAllUserTaks;
