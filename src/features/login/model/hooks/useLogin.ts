import { useQuery } from "@tanstack/react-query";

import type { User } from "../../../../entities/user/model/types/types";
import { axiosClient } from "../../../../shared/client";

export const useLogin = (email: string, password: string) => {
  return useQuery<User | undefined>({
    queryKey: ["login", email, password],
    queryFn: async () => {
      const response = await axiosClient.get<User[]>("/users");

      const users: User[] = response.data;

      const user = users.find(user => user.email === email);

      return user;
    },
    enabled: !!email && !!password,
  });
};
