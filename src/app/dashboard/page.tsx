"use client";

import { Loader, Table } from "@mantine/core";
import { useEffect, useState } from "react";

import { fetchUsers } from "@/utils/api_client";
import { UserResponse } from "@/utils/types";

const Dashboard = () => {
  const [users, setUsers] = useState<UserResponse | null>(null);
  const [userLimit] = useState(5);
  const [loadingUsers, setLoadingUsers] = useState(true);

  useEffect(() => {
    const loadUsers = async () => {
      setLoadingUsers(true);
      try {
        const data = await fetchUsers(userLimit, 0 * userLimit);
        setUsers(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingUsers(false);
      }
    };
    loadUsers();
  }, [userLimit]);

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-4">Users</h1>
      <div className="shadow-subtle p-4 mb-8 rounded-lg">
        {loadingUsers ? (
          <div className="flex justify-center items-center h-32">
            <Loader size="lg" />
          </div>
        ) : (
          <Table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-200 w-full">
                <th>ID</th>
                <th>Email</th>
                <th>MFA Enabled</th>
              </tr>
            </thead>
            <tbody>
              {users
                ? users.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-100/10">
                      <td className="p-2">{user.id}</td>
                      <td className="p-2">{user.email}</td>
                      <td className="p-2">
                        {user.mfa_enabled ? (
                          <span className="text-green-500">Yes</span>
                        ) : (
                          <span className="text-red-500">No</span>
                        )}
                      </td>
                    </tr>
                  ))
                : null}
            </tbody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
