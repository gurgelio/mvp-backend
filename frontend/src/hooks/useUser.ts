import { me } from "@/services/auth";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export function useUser() {
  const navigate = useNavigate();
  const { data, error } = useQuery({
    queryKey: ["me"],
    queryFn: me,
  });

  if (error) navigate("/sign-in");

  return data;
}
