import { getStudents } from "@/services/students";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

export function Students() {
  const { data, error, isPending } = useQuery({
    queryKey: ["students"],
    queryFn: getStudents,
  });

  if (isPending) return <p>Carregando...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>Professor</th>
          </tr>
        </thead>
        <tbody>
          {data.map((student) => (
            <tr key={student.id}>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.phone_number}</td>
              <td>
                <Link to={`/teacher/${student.teacher_id}`}>
                  {student.teacher.name}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
