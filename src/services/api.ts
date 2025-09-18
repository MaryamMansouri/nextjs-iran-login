import { User } from "@/types/user";

export const fetchRandomUser = async (phone: string): Promise<User> => {
  const res = await fetch("https://randomuser.me/api/?results=1&nat=us");
  const data = await res.json();

  const result = data.results[0];

  const user: User = {
    phone,
    name: {
      first: result.name.first,
      last: result.name.last,
    },
    email: result.email,
    picture: result.picture.large,
  };

  return user;
};
