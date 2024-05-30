import { FC } from "react";
import SearchUser from "./search-user";
import { UsersTable } from "./users-table";

export const Users: FC = () => {
  return (
    <main className="flex flex-1 flex-col">
      <div className="flex items-center mb-8">
        <h1 className="font-semibold text-lg md:text-2xl">Users</h1>
      </div>
      <div className="w-full mb-4">
        <SearchUser />
      </div>
      <UsersTable users={[]} />
    </main>
  );
};

export default Users;
