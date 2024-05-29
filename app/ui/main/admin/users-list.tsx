import { User } from "@prisma/client";
import { UserDeleteButton } from "./buttons";
import { auth } from "@/auth";

export default async function UsersList({ usersList }: { usersList: User[] }) {
  const session = await auth();
  return (
    <table className="my-4 bg-gray-100 rounded-lg p-2 w-full border-separate">
      <thead>
        <tr className="px-4 py-1 bg-white rounded-lg">
          <th className="p-2 w-1/8 font-medium">Sl</th>
          <th className="text-left p-2 font-medium">Email</th>
          <th className="p-2 w-1/8 font-medium">Role</th>
          <th className="p-2 pr-3 w-1/8 font-medium">Delete</th>
        </tr>
      </thead>
      <tbody>
        {usersList.map((user, index) => {
          return (
            <tr className="px-4 py-1 bg-white m-2 rounded-lg" key={user.id}>
              <td className="p-2 text-center">{index + 1}.</td>
              <td className="p-2">{user.email}</td>
              <td className="p-2 text-center">{user.role}</td>
              <td className="p-2 text-center">
                <div>
                  <UserDeleteButton
                    userID={user.id}
                    sessionUserID={session?.user.id!}
                  />
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
